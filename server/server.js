const express = require("express");
const path = require("path");
const cors = require('cors');
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