import { makeJpgsByWidths, base64, getBase64AndAspectRatio } from ".";
import { resolve } from "path";
import { promisify } from "util";
import fs from "fs";
import sharp from "sharp";

//"ladki.jpg"
const pathToPhoto = resolve(__dirname, "images", "ladki.jpg");

describe("sharp", () => {
  describe("metadata", () => {
    test("", async () => {
      const image = sharp(pathToPhoto);
      const metadata = await image.metadata();

      expect(metadata.width).toEqual(1920);
      expect(metadata.width / metadata.height).toEqual(1.6);
    });
  });

  describe("makeJpgsByWidths", () => {
    beforeAll(async () => {
      if (fs.existsSync(resolve(__dirname, "result"))) {
        await promisify(fs.rmdir)(resolve(__dirname, "result"), {
          recursive: true,
        });
      }
    });
    test("Must create resized photo for each entity in Map object", async () => {
      const pathToResultDir = weCreateResultDir();

      const pathsFS = new Map();

      pathsFS.set(400, `${pathToResultDir}/girl-on-water-400.jpg`);
      pathsFS.set(800, `${pathToResultDir}/girl-on-water-800.jpg`);

      await makeJpgsByWidths(pathToPhoto, pathsFS);

      const photosNames = await weGetPhotosNamesFromResultDir(pathToResultDir);

      //const image = sharp(resolve(pathToResultDir, photosNames[0]));

      const imageMetadata = await weGetCreatedPhotoMetaData(
        pathToResultDir,
        photosNames
      );

      /* expect(srcSet.get(1600)).toEqual(
        "/home/nikki/Documents/Project/lizzygram/fullstack_next_apollo_mongo/server/utils/sharp/result/smile-girl-1600.jpg"
      ); */
      expect(imageMetadata.format).toEqual("jpeg");
      expect(imageMetadata.width).toEqual(400);

      expect(photosNames).toHaveLength(2);
      //expect(photosNames.length).toEqual(widths.length);
      expect(photosNames[0]).toEqual("girl-on-water-400.jpg");
    });
  });

  describe("base64", () => {
    test("", async () => {
      const image = sharp(pathToPhoto);
      const result = await base64(image);
      expect(result).toEqual(
        "/9j/2wBDACAWGBwYFCAcGhwkIiAmMFA0MCwsMGJGSjpQdGZ6eHJmcG6AkLicgIiuim5woNqirr7EztDOfJri8uDI8LjKzsb/2wBDASIkJDAqMF40NF7GhHCExsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsb/wAARCAAfADIDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAABQABAgQGA//EACgQAAEDAQYGAwEAAAAAAAAAAAEAAgMRBAUSIVKRExQxQVNhIzNRof/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA4Ht1DdPUfoWOE0oP2O3UuZm8jt0GvxN1DdNxY9bd1knyTClZHGvtSijlla52M0b1zQGL4IlEQa4ObXMBWLDLBDZw0yNHqqAh0jm0ZkPZUHWd/XEN0Go5qDyt3SWV4DtQ3SQF2XHH3eV0FyQaiiDSpgoBzrmgNKOIoqtrsoscREZLq5lHK5ZIc/wCR88cmbsP8QAnHv0XazNikBEj6Hsqshzw9hkokoL/KM8iSp8R36kg//9k="
      );
    });
  });

  describe("getBase64AndAspectRation", () => {
    test("", async () => {
      //const image = sharp(pathToPhoto);
      const { base64String, aspectRatio } = await getBase64AndAspectRatio(
        pathToPhoto
      );
      expect(base64String).toEqual(
        "/9j/2wBDACAWGBwYFCAcGhwkIiAmMFA0MCwsMGJGSjpQdGZ6eHJmcG6AkLicgIiuim5woNqirr7EztDOfJri8uDI8LjKzsb/2wBDASIkJDAqMF40NF7GhHCExsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsb/wAARCAAfADIDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAABQABAgQGA//EACgQAAEDAQYGAwEAAAAAAAAAAAEAAgMRBAUSIVKRExQxQVNhIzNRof/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA4Ht1DdPUfoWOE0oP2O3UuZm8jt0GvxN1DdNxY9bd1knyTClZHGvtSijlla52M0b1zQGL4IlEQa4ObXMBWLDLBDZw0yNHqqAh0jm0ZkPZUHWd/XEN0Go5qDyt3SWV4DtQ3SQF2XHH3eV0FyQaiiDSpgoBzrmgNKOIoqtrsoscREZLq5lHK5ZIc/wCR88cmbsP8QAnHv0XazNikBEj6Hsqshzw9hkokoL/KM8iSp8R36kg//9k="
      );

      expect(aspectRatio).toEqual(1.6);
    });
  });
});

const weCreateResultDir = () => {
  const pathToResultDir = resolve(__dirname, "result");
  if (!fs.existsSync(pathToResultDir)) {
    fs.mkdirSync(pathToResultDir);
  }
  return pathToResultDir;
};

const weGetPhotosNamesFromResultDir = async (pathToResultDir) => {
  const dir = await fs.promises.opendir(pathToResultDir);
  const photosNames = [];
  for await (const dirent of dir) {
    //console.log("SEFEWSFSFSE", dirent.name);
    photosNames.push(dirent.name);
  }

  return photosNames;
};

const weGetCreatedPhotoMetaData = async (pathToResultDir, photosNames) => {
  const image = sharp(resolve(pathToResultDir, photosNames[0]));
  return await image.metadata();
};
