import request from "supertest";
import PhotoModel from "../api/entity/Photo/Photo.model";
import { init, nextApp, handle } from "../app";
import { createTestClient } from "apollo-server-testing";
import { gql, ApolloServer } from "apollo-server-express";
import { schema, resolvers } from "./../config";

jest.mock("../app", () => {
  const originalModule = jest.requireActual("../app");

  return {
    __esModule: true,
    ...originalModule,
    nextApp: {
      prepare: jest.fn(() => {
        return new Promise((resolve, reject) => resolve());
      }),
      render: jest.fn().mockImplementation((req, res, path, query) => {
        res.status(200).json({ path: req.path });
        res.end();
        return;
      }),
    },
    handle: jest.fn(),
  };
});

jest.mock("../api/entity/Photo/Photo.model", () => {
  return {
    __esModule: true,
    default: {
      find: jest.fn(),
    },
  };
});

let app = undefined;

describe("App", () => {
  beforeAll(async () => {
    app = await init(nextApp, handle);
  });

  afterEach(() => {
    nextApp.prepare.mockClear();
    nextApp.render.mockClear();
    handle.mockClear();
  });

  describe("GET /", () => {
    test("SHOULD return 200 Ok", async () => {
      //const server = await init(nextApp, handle);

      const response = await request(app).get("/");

      expect(nextApp.prepare).toHaveBeenCalledTimes(1);
      expect(nextApp.render).toHaveBeenCalledTimes(1);

      expect(handle).toHaveBeenCalledTimes(0);
      expect(response.statusCode).toEqual(200);

      //includes("Hello World!")
      expect(response.text).toEqual('{"path":"/"}');
    });
  });

  describe("POST /graphql", () => {
    test("SHOULD return photos", async () => {
      //mock Photo.model
      PhotoModel.find.mockReturnValue(PhotoModel);
      PhotoModel.limit = jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve([
            {
              name: "hello.jpg",
              description: "hello",
              tags: [1, 2, 3],
              _timestamp: 12,
            },
            {
              name: "bye.jpg",
              description: "bye",
              tags: [1, 2, 3],
              _timestamp: 3,
            },
          ]);
        });
      });

      //create querygi
      const PHOTOS = gql`
        {
          photos(limit: 2) {
            name
          }
        }
      `;

      //create apollo server
      const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        //dataSources: () => ({ userAPI, launchAPI }),
        //context: () => ({ user: { id: 1, email: "a@a.a" } }),
      });

      const { query, mutate } = createTestClient(apolloServer);

      //const response = await request(app).get("/graphql");
      let response = await query({ query: PHOTOS });

      expect(PhotoModel.find).toHaveBeenCalledTimes(1);
      expect(PhotoModel.limit).toHaveBeenCalledTimes(1);
      //expect(JSON.stringify(response)).toEqual([]);

      expect(response.data.photos).toEqual([
        { name: "hello.jpg" },
        { name: "bye.jpg" },
      ]);

      //expect(handle).toHaveBeenCalledTimes(0);
      //expect(response.statusCode).toEqual(200);
    });
  });
});
