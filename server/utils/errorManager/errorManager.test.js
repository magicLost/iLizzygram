import {
  onLoginError,
  serverErrorMessage,
  wrongPasswordOrEmailMessage,
} from ".";
import { ApolloError } from "apollo-server-express";

describe("errorManager", () => {
  describe("onLoginError", () => {
    describe("production", () => {
      beforeAll(() => {
        process.env.NODE_ENV = "production";
      });
      test("ValidationError", () => {
        try {
          onLoginError({ name: "ValidationError", message: "hello" });
          expect("This must be not call").toEqual("Never");
        } catch (err) {
          expect(err instanceof ApolloError).toEqual(true);
          expect(err.message).toEqual(wrongPasswordOrEmailMessage);
        }
      });
      test("Unknown error", () => {
        try {
          onLoginError({ message: "Unknown error" });
          expect("This must be not call").toEqual("Never");
        } catch (err) {
          expect(err instanceof ApolloError).toEqual(true);
          expect(err.message).toEqual(serverErrorMessage);
        }
      });
    });
    describe("development", () => {
      beforeAll(() => {
        process.env.NODE_ENV = "development";
      });
      test("ValidationError", () => {
        try {
          onLoginError({ name: "ValidationError", message: "hello" });
          expect("This must be not call").toEqual("Never");
        } catch (err) {
          expect(err instanceof ApolloError).toEqual(true);
          expect(err.message).toEqual(wrongPasswordOrEmailMessage);
        }
      });
      test("Unknown error", () => {
        try {
          onLoginError({ message: "Unknown error" });
          expect("This must be not call").toEqual("Never");
        } catch (err) {
          expect(err instanceof ApolloError).toEqual(true);
          expect(err.message).toEqual("Login error Unknown error");
        }
      });
    });
  });
});
