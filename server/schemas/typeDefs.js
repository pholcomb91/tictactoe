const { gql } = require('apollo-server-express');

// typeDefs
const typeDefs = gql`
    type  {
        _id: 
       
    }
    type User {
        _id: ID
        username: String
        email: String
             
    }
    type Query {
        me: User
    }
 
    type Mutation {
       
}
`;

// export the typeDefs
module.exports = typeDefs;