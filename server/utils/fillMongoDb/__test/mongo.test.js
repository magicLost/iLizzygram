import {
  fillDb,
  getAllPhotos,
  insertTags,
  insertPhotos,
  getTagsIds,
  connect,
  disconnect,
  deleteData,
} from "./../mongo";

import fs from "fs";
import { path as rootPath } from "app-root-path";
import { resolve } from "path";
import { promisify } from "util";
import { tags } from "./../dataGenerators/tags";
import { createPhotos } from "./../dataGenerators/photos";
import { photos } from "./../dataGenerators/photos.data";
//import { run } from "./../";

const pathToPhotoData = resolve(
  __dirname,
  "..",
  "dataGenerators",
  "photos.data.js"
);

/* COMMENT RUN() IN INDEX.TS FILE IF TEST RUN */
describe("mongo", () => {
  beforeAll(async () => {
    //"test-fake-data" | "lizzygram"
    await connect("lizzygram");
    //await deleteData();
  });

  afterAll(async () => {
    //await deleteData();
    await disconnect();
  });

  /* test("run", async () => {
    global.process.argv = ["", "", "--fake-photo"];
    await run();
    //await deleteData();
    //const tagsIds = await getTagsIds();

    //expect(tagsIds).toEqual("hello");
  }); */

  /*DISABLE DELETE DATA */
  describe("Insert data to db", () => {
    /* test("Get photos from db", async () => {
      const photos = await getAllPhotos();

      //await promisify(fs.writeFile)(pathToPhotoData, JSON.stringify(photos));

      expect(photos).toHaveLength(15);
    }); */

    test("Insert photos to db", async () => {
      await insertPhotos(photos);

      const photosFromDb = await getAllPhotos();

      expect(photosFromDb).toHaveLength(14);
    });

    /* test("insertTags", async () => {
      await insertTags(tags);

      const tagsIds = await getTagsIds();

      //const photos = createPhotos(10, tagsIds);

      //await insertPhotos(photos);

      //const photosFromDb = await getAllPhotos();

      expect(tagsIds).toHaveLength(7);
      //expect(photos).toHaveLength(10);
      //expect(photosFromDb).toHaveLength(10);
    }); */
  });
});
