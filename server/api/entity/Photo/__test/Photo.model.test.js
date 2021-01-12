import mongoose, { Mongoose } from "mongoose";
import PhotoModel from "../Photo.model";
import TagModel from "../../Tag/Tag.model";

let dateNow = Date.now();

const ids = [
  "5eed109342b28606e20619dd",
  "5eed10c9613a17073d93a5f4",
  "5eed10eda0e95a07801c55e5",
  "5eed10eda0e95a07801c55e6",
];

const photoItems = [
  {
    name: "photo-1.jpg",
    description: "Super puper photo",
    _timestamp: dateNow++,
    tags: [ids[0], ids[3]],
  },
  {
    name: "photo-2.jpg",
    description: "Super puper photo",
    _timestamp: dateNow++,
    tags: [ids[0], ids[2]],
  },
  {
    name: "photo-3.jpg",
    description: "Super puper photo",
    _timestamp: dateNow++,
    tags: [ids[2], ids[3]],
  },
  {
    name: "photo-4.jpg",
    description: "Super puper photo",
    _timestamp: dateNow++,
    tags: [ids[1]],
  },
];

describe("Photo.model", () => {
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
    //await PhotoModel.create(photoItems);
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

    //const allPhotos = await PhotoModel.find();
    const allPhotos = await PhotoModel.find({
      tags: ["5eed109342b28606e20619dd", "5eed10eda0e95a07801c55e6"],
    });

    //expect(JSON.stringify(allPhotos[0])).toEqual("hello");

    expect(allPhotos).toHaveLength(2);
  });

  /* describe("Test pre/post find middleware", () => {
    test("When find tour it must in guides section instead of id fill with guides info", async () => {
      const tour = await TourModel.findById("5c88fa8cf4afda39709c2955");

      const tour1 = await TourModel.findById("5c88fa8cf4afda39709c2951");

      expect(tour).toBeInstanceOf(TourModel);
      expect(tour.name).toEqual("The Sea Explorer");
      expect(tour.durationWeeks).toEqual(1);
      expect(tour.guides[0].name).toEqual("Miyah Myles");
      expect(tour.guides[1].role).toEqual("guide");

      expect(tour1.durationWeeks).toEqual(1);
    });
  });

  test("If no connection", async () => {
    await fillDb.disconnect();

    try {
      const tour = await TourModel.findById("5c88fa8cf4afda39709c2955");
    } catch (error) {
      expect(error.message).toEqual("Heloo");
    }
  }); */
});
