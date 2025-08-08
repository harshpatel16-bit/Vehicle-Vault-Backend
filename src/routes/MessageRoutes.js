const routes = require('express').Router();
const { default: mongoose } = require('mongoose');
const MessageController = require("../controllers/MessageController");
const MessageModel = require('../models/MessageModel');

routes.post("/send", MessageController.sendMessage)  //to send a message
routes.get("/chats/:userId", MessageController.getChatUsers);// Get all messages where user is sender or receiver


// routes.get("/:userId/:receivedId",MessageController.getMessages)
// GET MESSAGES BETWEEN TWO USERS
routes.get("/message/:senderId/:receiverId", async (req, res) => {
    const { senderId, receiverId } = req.params;
  
    try {
      const messages = await MessageModel.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId }
        ]
      }).sort({ createdAt: 1 });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  routes.post("/read", MessageController.markMessagesAsRead);

  routes.get("/unread/:receiverId", async (req, res) => {
    const { receiverId } = req.params;
    try {
      const messages = await MessageModel.aggregate([
        {
          $match: {
            receiver: new mongoose.Types.ObjectId(receiverId),
            isRead: false,
          },
        },
        {
          $group: {
            _id: "$sender",
            count: { $sum: 1 },
          },
        },
      ]);
  
      // Convert to { senderId: count }
      const result = {};
      messages.forEach((m) => {
        result[m._id.toString()] = m.count;
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching unread counts:", error);
      res.status(500).json({ message: "Error fetching unread counts" });
    }
  });
  
  
module.exports = routes;