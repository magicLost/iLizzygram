import { gql } from "apollo-server-express";

const tagTypes = gql`
  type Tag {
    _id: ID!
    name: String!
    title: String!
  }
`;

export const schema = gql`
  ${tagTypes}

  extend type Query {
    tags: [Tag!]!
    tag(id: ID!): Tag!
  }
`;
