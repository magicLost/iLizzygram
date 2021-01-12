import { v2 as cloudinary } from "cloudinary";
import path from "path";
import dotenv from "dotenv";
import { uploadImagesByDifferentWidths } from ".";

import { path as rootPath } from "app-root-path";

dotenv.config({ path: path.resolve(rootPath, ".env") });

jest.mock("cloudinary", () => {
  return {
    __esModule: true,
    v2: {
      config: jest.fn(),
      uploader: {
        upload: jest.fn((src) => {
          switch (src) {
            case "400":
              return Promise.resolve("return400");
            case "800":
              return Promise.resolve("return800");
            case "1200":
              return Promise.resolve("return1200");
            default:
              throw new Error("What is that - ", src);
          }
        }),
      },
    },
  };
});

describe("cloudinary", () => {
  test("process ENV", () => {
    expect(process.env.PORT).toEqual("3009");
  });
  /* test("Test upload file", async () => {
    const image = await cloudinary.uploader.upload(
      path.resolve(rootPath, "public", "images", "girl_300.jpeg"),
      { tags: "basic_sample" }
    );

    console.log("PUBLIC ID ", image.public_id);
    console.log("URL ", image.url);

    expect(image.url).toEqual("hello");
  }); */

  describe("uploadImagesByDifferentWidths", () => {
    test("", async () => {
      const srcSet = new Map();
      srcSet.set(400, "400");
      srcSet.set(800, "800");
      srcSet.set(1200, "1200");

      const pathsToCloudinaryPhotosByWidths = await uploadImagesByDifferentWidths(
        srcSet
      );

      expect(pathsToCloudinaryPhotosByWidths.size).toEqual(3);
      expect(pathsToCloudinaryPhotosByWidths.get(400)).toEqual("return400");
      expect(pathsToCloudinaryPhotosByWidths.get(800)).toEqual("return800");
      expect(pathsToCloudinaryPhotosByWidths.get(1200)).toEqual("return1200");
    });
  });
});
