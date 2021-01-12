import { ApolloError, AuthenticationError } from "apollo-server-express";
import UserModel from "./../User/User.model";
import { signToken, setCookieWithToken, hideUserPassword } from "./Auth.helper";
import { usersSession } from "../../../session";
import {
  throwApolloError,
  onSignupError,
  onLoginError,
} from "./../../../utils/errorManager";
//import { parseMongooseErrorGraphQL } from "./../../../error/errorManager";
//import { csrfProtection } from "./../../../site/middleware/Csrf.middleware";

interface LoginInput {
  email: string;
  password: string;
}

interface SignupInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

//TODO: Make parse Mongoose errors
export const resolvers = {
  Mutation: {
    /* signup: async (_: any, { input }: { input: SignupInput }, ctx: any) => {
      try {
        /* const next = (err: Error) => {
          throw err;
        };
        csrfProtection(ctx.req, ctx.res, next); 

        const { name, email, password, passwordConfirm } = input;

        const user = await UserModel.create({
          name: name,
          email: email,
          role: "user",
          password: password,
          passwordConfirm: passwordConfirm,
        });

        //createAndSendToken(user, 201, req, res);
        const token = signToken(user._id);

        setCookieWithToken(ctx.req, ctx.res, token);

        hideUserPassword(user);

        return user;
      } catch (error) {
        onSignupError(error);
      }
    }, */
    login: async (_: any, { input }: { input: LoginInput }, ctx: any) => {
      try {
        /* TODO VALIDATE FORM DATA */
        /* if (!email || !password) {
              return next(
                new AppError("Please tell us your email and password...", 401)
              );
            } */

        const { email, password } = input;

        //console.log(ctx, `${email} ||| ${password}`);
        await (UserModel as any).validate({ email, password }, [
          "email",
          "password",
        ]);

        const user = {
          name: "Sia",
          role: "princess",
        };

        /*   const user = await UserModel.findOne({ email: email }).select(
          "+password"
        );

        if (!user || !(await user.correctPassword(password, user.password))) {
          throw new AuthenticationError("");
        }

        const token = signToken(user._id);

        setCookieWithToken(ctx.req, ctx.res, token);

        hideUserPassword(user);
 */
        //SAVE USER SESSION

        return user;
      } catch (error) {
        onLoginError(error);
      }
    },
    logout: (_: any, __: any, ctx: any) => {
      try {
        ctx.res.cookie("jwt", "loggedout", {
          expires: new Date(Date.now() + 10 * 1000),
          httpOnly: true,
        });

        return true;
      } catch (error) {
        throwApolloError(`Log out error ${error.message}`);
      }
    },

    authUser: async (_: any, attrs: any, ctx: any) => {
      try {
        //CHECK IF USER SESSION EXISTS

        /* if (ctx.req.cookies.jwt) {
          // VERIFY TOKEN
          const decoded = await verify(
            ctx.req.cookies.jwt,
            process.env.JWT_SECRET
          );

          // CHECK IF USER EXISTS
          const user = await UserModel.findById(decoded.id);

          if (!user) throw new Error("");

          // CHECK IF USER CHANGED PASSWORD AFTER THE TOKEN WAS ISSUED
          if (user.changedPasswordAfter(decoded.iat)) throw new Error("");

          // THERE IS A LOGGED IN USER
          //(req as IUserRequest).user = user;
          return user;
        } */
        return {
          name: "КирНат",
          role: "user",
        };
      } catch (error) {
        if (error.name === "JsonWebTokenError") {
          console.log(
            "[DEV_INFO] JsonWebTokenError",
            ctx.req.cookies.jwt,
            process.env.JWT_SECRET
          );
        } else if (error.name === "TokenExpiredError") {
          console.log(
            "[DEV_INFO] TokenExpiredError",
            ctx.req.cookies.jwt,
            process.env.JWT_SECRET
          );
        }
        throw new AuthenticationError("You are not authorized...");
      }
    },
  },
};
