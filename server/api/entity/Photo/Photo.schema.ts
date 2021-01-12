import { gql } from "apollo-server-express";

//TODO add addedBy - userId
const photoTypes = gql`
  type Photo {
    _id: ID!
    _timestamp: Float!
    base64: String!
    date: String!
    files: [String!]!
    aspectRatio: Float!
    srcSet: String!
    iconSrc: String!
    src: String!
    description: String!
    tags: [Tag!]!
    googleDriveId: String!
  }

  input PhotoInput {
    file: Upload!
    date: String!
    description: String!
    tags: [ID!]!
  }

  type PhotoConnection {
    edges: [Photo!]!
    pageInfo: PageInfo!
  }
`;

export const schema = gql`
  ${photoTypes}

  extend type Query {
    photoById(_id: ID!): Photo!
    photos(
      limit: Int
      isSortDesc: Boolean!
      tagsIds: [String!]
      cursor: Float
    ): PhotoConnection!
    photoByTagsIds(tagsIds: [ID!]!): [Photo!]!
  }

  extend type Mutation {
    photoUpload(
      file: Upload!
      desc: String!
      date: String!
      tags: [ID!]!
    ): Photo!

    photoEdit(
      id: ID!
      file: Upload
      desc: String
      date: String
      tags: [ID!]
    ): Photo!
  }
`;
