const { gql } = require('apollo-server-express');

// typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        wins: Int
        losses: Int
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        user: User
    }
 
    type Mutation {
       addUser(username: String!, email: String!, password: String!): Auth
       updateUser(username: String! email: String! password: String!): User
       login(email: String!, password: String!): Auth
       updateScore(username: String!, score: String!): User
}
`;

// export the typeDefs
module.exports = typeDefs;