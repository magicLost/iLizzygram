import { resolvers } from "./../Auth.resolvers";
import {
  signToken,
  setCookieWithToken,
  hideUserPassword,
} from "./../Auth.helper";
import UserModel from "../../User/User.model";

jest.mock("../../User/User.model", () => {
  return {
    __esModule: true,
    default: {
      create: jest.fn(),
      findOne: jest.fn(),
      validate: jest.fn(),
    },
  };
});

jest.mock("./../Auth.helper", () => {
  return {
    __esModule: true,
    signToken: jest.fn(() => "token"),
    setCookieWithToken: jest.fn(),
    hideUserPassword: jest.fn(),
  };
});

describe("Auth.resolvers", () => {
  afterEach(() => {
    signToken.mockClear();
    setCookieWithToken.mockClear();
    hideUserPassword.mockClear();

    UserModel.create.mockClear();
    UserModel.findOne.mockClear();
  });

  describe(`signup - save user to db, 
            create token, 
            set token to cookie, 
            hide user password in res.user`, () => {
    test("If validation fails we get ApolloError", () => {});
    test("", async () => {
      const signInput = {
        name: "Sia",
        email: "sia@mail.ru",
        password: "1234qwer",
        passwordConfirm: "1234qwer",
      };

      const userToSave = {
        ...signInput,
        role: "user",
      };

      const user = {
        ...userToSave,
        _id: "id",
      };

      const ctx = { req: {}, res: {} };

      UserModel.create.mockReturnValue(user);

      const result = await resolvers.Mutation.signup(
        "",
        { input: signInput },
        ctx
      );

      expect(UserModel.create).toHaveBeenCalledTimes(1);
      expect(UserModel.create).toHaveBeenCalledWith(userToSave);

      expect(signToken).toHaveBeenCalledTimes(1);
      expect(signToken).toHaveBeenCalledWith("id");

      expect(setCookieWithToken).toHaveBeenCalledTimes(1);
      expect(setCookieWithToken).toHaveBeenCalledWith({}, {}, "token");

      expect(hideUserPassword).toHaveBeenCalledTimes(1);
      expect(hideUserPassword).toHaveBeenCalledWith(user);

      expect(result).toEqual(user);
    });
  });

  describe(`login - find user at db,
            create token, 
            set token to cookie, 
            hide user password in res.user`, () => {
    test("If validation fails we get ApolloError", async () => {
      UserModel.validate.mockImplementationOnce(() => {
        throw new Error("hello error");
      });

      try {
        const result = await resolvers.Mutation.login(
          "",
          { input: { email: "hello.ru", password: "12" } },
          {}
        );
        expect("This will not trigger").toEqual("Never");
      } catch (err) {
        //we got undefined message cause we do not trigger Validation error
        expect(err.message).toEqual("Login error hello error");
      }
    });
    test("If no user found in db get ApolloError", () => {});
    test("", async () => {
      const loginInput = {
        email: "sia@mail.ru",
        password: "1234qwer",
      };

      const user = {
        role: "user",
        name: "Sia",
        email: "sia@mail.ru",
        password: "1234qwer",
        passwordConfirm: "1234qwer",
        _id: "id",
        correctPassword: jest.fn(() => Promise.resolve(true)),
      };

      const ctx = { req: {}, res: {} };

      UserModel.findOne.mockReturnValue({
        select: jest.fn(() => Promise.resolve(user)),
      });

      const result = await resolvers.Mutation.login(
        "",
        { input: loginInput },
        ctx
      );

      expect(UserModel.findOne).toHaveBeenCalledTimes(1);
      expect(UserModel.findOne).toHaveBeenCalledWith({
        email: loginInput.email,
      });

      expect(signToken).toHaveBeenCalledTimes(1);
      expect(signToken).toHaveBeenCalledWith("id");

      expect(setCookieWithToken).toHaveBeenCalledTimes(1);
      expect(setCookieWithToken).toHaveBeenCalledWith({}, {}, "token");

      expect(hideUserPassword).toHaveBeenCalledTimes(1);
      expect(hideUserPassword).toHaveBeenCalledWith(user);

      expect(result).toEqual(user);
    });
  });

  describe(`logout - we re-write jwt cookie`, () => {
    test("If some error we get ApolloError", () => {});
    test("", async () => {
      const ctx = {
        req: {},
        res: {
          cookie: jest.fn((name, value, options) => {
            expect(name).toEqual("jwt");
            expect(value).toEqual("loggedout");
            expect(options.httpOnly).toEqual(true);
          }),
        },
      };

      const result = await resolvers.Mutation.logout("", {}, ctx);

      expect(result).toEqual(true);
    });
  });
});
