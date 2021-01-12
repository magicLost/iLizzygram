import { ApolloError, AuthenticationError } from "apollo-server-express";

export const emailDuplicateKeyMessage =
  "Аккаунт с таким электронным адресом уже существует";
export const wrongPasswordOrEmailMessage =
  "Неверный пароль или электронный адрес...";
export const serverErrorMessage = "Упс, ошибка сервера.";

export const onSignupError = (error: any) => {
  //duplicate mongodb key error for unique email
  if (error.code === 11000) {
    throw new ApolloError(emailDuplicateKeyMessage);
  }

  if (error.name === "ValidationError") {
    throw new ApolloError(handleValidationErrorDB(error));
  }
  //const message = parseMongooseErrorGraphQL(error);

  throwApolloError(`Sign up error ${error.message}`);
};

export const onLoginError = (error: any) => {
  if (error instanceof AuthenticationError) {
    throw new ApolloError(wrongPasswordOrEmailMessage);
  }

  if (error.name === "ValidationError") {
    throw new ApolloError(wrongPasswordOrEmailMessage);
  }
  //const message = parseMongooseErrorGraphQL(error);

  throwApolloError(`Login error ${error.message}`);
};

export const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  //const message = `Некорректные данные. ${errors.join(". ")}`;
  const message = errors[0];
  return message;
};

export const throwApolloError = (msg: string) => {
  if (process.env.NODE_ENV === "production") {
    throw new ApolloError(serverErrorMessage);
  }

  throw new ApolloError(msg);
};
