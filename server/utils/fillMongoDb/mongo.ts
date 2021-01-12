import { Mongoose, connect as mongooseConnect } from "mongoose";
import PhotoModel from "./entity/Photo.model";
import TagModel from "./entity/Tag.model";

let mongooseConnection: Mongoose | undefined = undefined;

export const connect = async (dbName: string) => {
  try {
    mongooseConnection = await mongooseConnect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      dbName: dbName,
    });
  } catch (error) {
    console.log(`MONGOOSE CONNECTION ERROR ${error.message}`);
  }
};

export const getAllPhotos = async () => {
  return PhotoModel.find();
};

export const disconnect = async () => {
  if (mongooseConnection !== undefined) await mongooseConnection.disconnect();
};

export const insertTags = async (tags: any[]) => {
  //console.log("-------------");
  //console.log("TagModel", JSON.stringify(TagModel));
  await TagModel.create(tags);
};

export const insertPhotos = async (photos: any[]) => {
  await PhotoModel.create(photos);
};

export const getTagsIds = async (): Promise<string[]> => {
  const tagsWithIds = await TagModel.find().select("_id");

  return tagsWithIds.map((tag) => {
    return tag._id;
  });
};

export const fillDb = async (tags: any[], photos: any[]) => {
  await deleteData();
  await insertData(tags, photos);
};

const insertData = async (tags: any[], photos: any[]) => {
  try {
    /* await Promise.all([
      TourModel.create(tours),
      UserModel.create(users, { validateBeforeSave: false }),
      ReviewModel.create(reviews),
    ]); */

    await TagModel.create(tags);
    await PhotoModel.create(photos);

    console.log("Data successfully loaded");
  } catch (err) {
    console.log("BAD DATA loaded", err);
  }
  //process.exit();
};

export const deleteData = async () => {
  try {
    await Promise.all([TagModel.deleteMany({}), PhotoModel.deleteMany({})]);
    /*    await Tour.deleteMany();
      await User.deleteMany();
      await Review.deleteMany(); */

    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  //process.exit();
};
