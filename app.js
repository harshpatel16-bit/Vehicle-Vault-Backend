const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app); // HTTP + Socket.IO server

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://vehicle-vault-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "https://vehicle-vault-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("Socket.IO server is running...");
});

app.use(require("./src/routes/RoleRoutes"));
app.use(require("./src/routes/UserRoutes"));
app.use("/state", require("./src/routes/StateRoutes"));
app.use("/city", require("./src/routes/CityRoutes"));
app.use("/area", require("./src/routes/AreaRoutes"));
app.use("/car", require("./src/routes/CarRoutes"));
app.use("/message", require("./src/routes/MessageRoutes"));
app.use("/query", require("./src/routes/QueryRoutes"));

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message", (message) => {
    io.emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected..."))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server with Socket.IO
server.listen(process.env.PORT, () => {
  console.log(`Server Started On Port: ${process.env.PORT}`);
});
