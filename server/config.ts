import { gql } from "apollo-server-express";
import merge from "lodash.merge";
import { photoSchema, photoResolvers } from "./api/entity/Photo";
import { tagSchema, tagResolvers } from "./api/entity/Tag";
import { userSchema, userResolvers } from "./api/entity/User";
import { authSchema, authResolvers } from "./api/entity/Auth";

/* FIRST SCHEMA HAVE TYPE QUERY AND OTHERS MUST EXTEND TYPE QUERY */

export const schema = gql`
  type PageInfo {
    endCursor: Float!
    hasNextPage: Boolean!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  ${userSchema}

  ${authSchema}

  ${photoSchema}

  ${tagSchema}
`;

export const resolvers = merge(
  {},
  userResolvers,
  authResolvers,
  photoResolvers,
  tagResolvers
);
