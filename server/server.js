const express = require("express");
const path = require("path");
//const cors = require('cors');
const { io } = require("socket.io-client");




//Apollo Server Import 
const { ApolloServer } = require("apollo-server-express");


//Resolver and typeDefs
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");


//Database
const db = require("./config/connection");



//Express
const app = express();
const PORT = process.env.PORT || 3001;


//Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


//Function to start up Apollo Server through Express and apply Middleware
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
}

//Call async function to start the server
startApolloServer();


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");
app.use(express.static(buildPath));



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}



//Get All
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


db.once("open", () => {
  app.listen(PORT, () => {
    console.log(` The server for the API is at port ${PORT}!`);
    console.log(`Please use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});


//Imports for chat socket.io
const http = require("http");
var cors = require("cors");

//Here is where we get socket.io
const { Server } = require("socket.io");
app.use(cors());



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