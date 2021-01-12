import mongoose from "mongoose";
import UserModel from "../User.model";
import {
  nameMaxLengthMessage,
  nameMinLengthMessage,
  nameRegexMessage,
  emailValidateMessage,
  passwordMinLengthMessage,
  passwordConfirmValidateMessage,
  roleValidationMessage,
} from "../User.validators";

describe("UserModel", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: "user-api-test",
      });
    } catch (error) {
      console.log(`MONGOOSE CONNECTION ERROR ${error.message}`);
    }

    console = { log: jest.fn() };

    process.exit = jest.fn();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  test("Connection", () => {
    expect(mongoose.version).toEqual("5.10.2");
  });

  test("Create user", async () => {
    const res = await UserModel.create({
      name: "John",
      email: "john@mail.ru",
      password: "12345rtyg",
      passwordConfirm: "12345rtyg",
    });

    expect(res.name).toEqual("John");
    expect(res.email).toEqual("john@mail.ru");
  });

  test("Does validation works on find request", async () => {
    const res = await UserModel.find({ name: "j" });
    expect(res).toEqual([]);
  });

  test("Fail validation - handle validation errors", async () => {
    /* expect(
      "hel4lo: name: Привет".substring(
        "hel4lo: name: Привет".search(/[а-яА-Я]/)
      )
    ).toEqual(14); */

    try {
      /*  await UserModel.validate(
        {
          name: "J!>>",
          email: "johnmail.ru",
        },
        ["name", "email"]
      ); */
      const res = await UserModel.create({
        name: "J!>>",
        email: "johnru",
        password: "12345",
        passwordConfirm: "12",
        role: "bad_guy",
      });

      expect("This will not trigger").toEqual("Never");
    } catch (err) {
      const errors = Object.values(err.errors).map((el) => el.message);
      const message = errors.join(", ");
      //const message = errors[0];

      expect(message).toEqual(
        `${nameRegexMessage}, ${emailValidateMessage}, ${passwordMinLengthMessage}, ${passwordConfirmValidateMessage}, ${roleValidationMessage}`
      );
    }
  });
});
