import { gql } from "apollo-server-express";

const userTypes = gql`
  type UserResponseToClient {
    _id: ID!
    name: String!
    role: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    role: String!
    password: String
    passwordConfirm: String
    passwordChangedAt: String
    passwordResetToken: String
    passwordResetExpires: String
    active: Boolean
  }
`;

export const schema = gql`
  ${userTypes}
  type Query {
    users: [User!]!
    user(id: ID!): User!
  }
`;
