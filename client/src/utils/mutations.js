import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      password
      bookCount: savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

export const QUERY_BOOK = gql`
query 
`
