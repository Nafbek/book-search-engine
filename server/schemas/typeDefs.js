const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    password: String
   bookCount: Int
    savedBooks: [Book]

}
type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String

}

type Query {
    users: [User]
    user(username: String): User
    book(bookId: ID!): Book
    books: [Book]
    me: User
}

//or I can use input type to handle parameters
type Mutation {
    login (email: String!, password: String!): Auth
    addUser (username: String, email: String!, password: String!): Auth
    saveBooks([authors]: String, description: String, title: String, bookId: String, image: String, link: String ): User
    removeBook(bookId: String): User
}

type Auth {
    token: ID!
    user: User
}
`;

module.exports = typeDefs;
