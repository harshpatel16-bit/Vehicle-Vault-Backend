const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
})); 

 // Create server for socket.io
const io = new Server (server, {
    cors: {
        origin: "http://localhost:5173", // Adjust as needed for your frontend
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => {
  res.send("Socket.IO server is running...");
});

app.use(cors())

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)       //http://localhost:3011/state/


const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes) //http://localhost:3011/city/


const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes) //http://localhost:3011/area/


const carRoutes = require("./src/routes/CarRoutes")
app.use("/car",carRoutes)  //http://localhost:3011/car/


const messageRoutes = require("./src/routes/MessageRoutes");
app.use("/message", messageRoutes);

const queryRoutes = require('./src/routes/QueryRoutes'); // path might vary
app.use('/query', queryRoutes); 


// Socket.IO Connection Handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message", (message) => {
    // Broadcast message to the receiver
    io.emit("receive_message", message);
  });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// Expose Socket.io to use in other files
// app.set("io", io);





mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("database connected....")
})


server.listen(process.env.PORT,()=>{
    console.log("server started on port number ",process.env.PORT)
    
})
