import { ApolloError, AuthenticationError } from "apollo-server-express";
import TagModel from "./Tag.model";

export const resolvers = {
  Query: {
    tags: async (_: any, __: any, ctx: any) => {
      try {
        const tags = await TagModel.find();
        return tags;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
    tag: async (_: any, { id }: { id: string }, ctx: any) => {
      try {
        const tag = await TagModel.findById(id);
        return tag;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
  },
  /* Mutation: {}, */
};
