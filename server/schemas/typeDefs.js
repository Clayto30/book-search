// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}
type Auth {
    token: ID!
    user: User
}
type User {
    _id: ID!
    username: String
    email: String
    password: String!
    bookCount: Int
    savedBooks: [Book]
}
 type Query {
     me: User
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
}
`;

// export the typeDefs
module.exports = typeDefs;