import mongoose, { Mongoose } from "mongoose";
import TagModel from "../Tag.model";

const tags = [
  {
    name: "nature",
    title: "на природе",
  },
  {
    name: "smile",
    title: "смайл",
  },
  {
    name: "other",
    title: "разное",
  },
  {
    name: "home",
    title: "дома",
  },
];

describe("Tag.model", () => {
  //let mongooseCon = undefined;
  let fillDb = undefined;

  beforeAll(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: "api-test",
      });
    } catch (error) {
      console.log(`MONGOOSE CONNECTION ERROR ${error.message}`);
    }

    console = { log: jest.fn() };

    process.exit = jest.fn();
  });

  afterAll(async () => {
    //await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  test("Connection", () => {
    expect(mongoose.version).toEqual("5.9.19");
  });

  test("", async () => {
    //await TagModel.create(tags);
    /* await TagModel.create([
      {
        name: "other",
        title: "разное",
      },
      {
        name: "home",
        title: "дома",
      },
    ]); */

    const allTags = await TagModel.find();

    expect(JSON.stringify(allTags)).toEqual("hello");

    expect(allTags).toHaveLength(4);
  });
});
