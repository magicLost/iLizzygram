import express, {
  Request,
  Response,
  urlencoded,
  json,
  NextFunction,
  static as expressStatic,
} from "express";
//import path from "path";
import next from "next";
import dotenv from "dotenv";
import path from "path";
import { path as rootPath } from "app-root-path";
import { connect } from "mongoose";
import cookieParser from "cookie-parser";
import { schema, resolvers } from "./config";
import { ApolloServer } from "apollo-server-express";
import { v2 as cloudinary } from "cloudinary";

const dev = process.env.NODE_ENV !== "production";

export const nextApp = next({ dev });
export const handle = nextApp.getRequestHandler();

export const init = async (nextApp: any, handle: any) => {
  await nextApp.prepare();

  dotenv.config({ path: path.resolve(rootPath, ".env") });

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  await connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  });

  const app = express();

  app.use(json({ limit: "10kb" })); // for parsing application/json

  app.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use(cookieParser());

  app.all("*", (req, res, next) => {
    console.log("Request START", req.path);
    next();
  });

  app.get("/images/*", expressStatic(path.join(rootPath, "public")));

  app.all("*", (req, res, next) => {
    console.log("Request CONTINUE", req.path, res.headersSent);
    next();
  });

  app.get("/", (req, res) => {
    //console.log("index");
    //const html = await app.renderToHTML(req, res, req.path, req.query);
    //console.log(html);
    return nextApp.render(req, res, req.path, req.query);
  });

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: ({ req, res }) => {
      return { req, res };
    },
    cacheControl: false,
    uploads: {
      maxFileSize: 20000000, // 20 MB
      maxFiles: 2,
    },
    formatError: (err) => {
      //err.originalError instanceof AuthenticationError
      console.error("FORMAT ERROR", JSON.stringify(err));
      return err;
    },
  });

  server.applyMiddleware({ app });

  app.all("*", (req, res, next) => {
    console.log("Next Handle BEFORE", req.path, res.headersSent);
    next();
  });

  /* static files */
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.all("*", (req, res, next) => {
    console.log("Next Handle AFTER", req.path, res.headersSent);
    next();
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`[GLOBAL_ERROR_HANDLER] ${err.message}`);

    res
      .status(200)
      .json({
        errors: [{ message: err.message }],
        data: null,
      })
      .end();
  });

  return app;
};

/* app.prepare().then(() => {
  const server = express();

  server.get("/", async (req, res) => {
    console.log("index");
    //const html = await app.renderToHTML(req, res, req.path, req.query);
    //console.log(html);
    return app.render(req, res, req.path, req.query);
  });

  /* static files 
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}); */

/* 

import request from "supertest";
import app from "../app";
import Sequelize from "sequelize";
import { init } from "./../api/entity/Photo/Photo.sequelize.model";

describe("GET /articles", () => {
  test("SHOULD return 200 Ok", async () => {
    const response = await request(app).get("/articles");

    expect(response.statusCode).toEqual(200);

    //expect(response.text.includes("Hello World!")).toEqual(true);
  });
});
*/
