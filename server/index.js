// This file is for the backend portion of the socket.io chat app

//Links to needed libraries

const express = require("express");
const app = express();
const http = require("http");

//This really helps with brower issues
const cors = require("cors");

//Here is where we get socket.io
const { Server } = require("socket.io");
app.use(cors());


const server = http.createServer(app);

//Creating a server to use socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

//Logic for joining a chat room
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

//Logic for sending a message
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

//Hopefully the backend socket.io chat is working now on the server :)