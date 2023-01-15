
const express = require("express");
const path = require("path");
const { io } = require("socket.io-client");

//Apollo Server Import 
const { ApolloServer } = require("apollo-server-express");


//Resolver and typeDefs
const { typeDefs, resolvers } = require("./server/schemas");
const { authMiddleware } = require("./utils/auth");


//Database
const db = require("./server/config/connection");



//Express
const app = express();
const PORT = process.env.PORT || 3003;


//Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


//Use Express with Apollo 
server.applyMiddleware({ app });


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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