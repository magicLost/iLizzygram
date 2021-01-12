import fs from "fs";
import {
  makeJpgsByWidths,
  getBase64AndAspectRatio,
} from "../../../../utils/sharp";
import { resolve } from "path";

import PhotoModel from "../Photo.model";
import {
  makeDifferentSizesOfPhoto,
  makeImageSrcSetString,
  makeImageSizesString,
  getMapsOfPathsToPhotos,
} from "./../Photo.utils";

jest.mock("../Photo.model", () => {
  return {
    __esModule: true,
    default: {
      create: jest.fn((photo) => {
        return Promise.resolve(photo);
      }),
      findByIdAndUpdate: jest.fn((id, photo) => {
        expect(id).toEqual("someId1234");
        return Promise.resolve(photo);
      }),
    },
  };
});

jest.mock("../../../../utils/sharp", () => {
  return {
    __esModule: true,
    makeJpgsByWidths: jest.fn(async (pathToUploadPhotoFile, pathsFS) => {
      /* expect(pathToUploadPhotoFile).toEqual(
        "/home/nikki/Documents/Project/lizzygram/fullstack_next_apollo_mongo/server/api/entity/Photo/__test/uploadedFiles/eva-upload.jpeg"
      ); */
      if (pathsFS) expect(pathsFS.size).toEqual(4);
      return Promise.resolve("ReturnFromMakeJpgs");
    }),
    getBase64AndAspectRatio: jest.fn(() => {
      return Promise.resolve({
        base64String: "base64String",
        aspectRatio: 1.5,
      });
    }),
  };
});

/* jest.mock("fs", () => {
  return {
    __esModule: true,
    default: {
      createWriteStream: jest.fn(() => "createWriteStream"),
    },
  };
}); */

jest.mock("apollo-server-express", () => {
  return {
    __esModule: true,
    ApolloError: jest.fn(),
  };
});

jest.mock("./../config", () => {
  const realPathToUploadPhotoFileDir =
    "/home/nikki/Documents/Project/lizzygram/fullstack_next_apollo_mongo/server/api/entity/Photo/__test/uploadedFiles";

  return {
    __esModule: true,

    pathToUploadPhotoFileDir: realPathToUploadPhotoFileDir,
    pathToFsResultPhotoDir: "/pathToFsResultPhotoDir",
    pathToWebResultPhotoDir: "/pathToWebResultPhotoDir",
  };
});

describe("Photo.helper", () => {
  beforeEach(() => {
    //setIsException(false);
  });

  afterEach(() => {
    makeJpgsByWidths.mockClear();
    getBase64AndAspectRatio.mockClear();
    PhotoModel.create.mockClear();
    PhotoModel.findByIdAndUpdate.mockClear();
  });

  /* test("onWritableStreamEditPhoto - we call uploadPhotoFile and add listener to writable stream", async () => {
    const file = weCreateReadStream();

    const {
      writableStream,
      pathToUploadPhotoFile,
      filename,
    } = await uploadPhotoFile(file, pathToUploadPhotoFileDir);

    const photo = await onWritableStreamEditPhoto(
      writableStream,
      filename,
      pathToUploadPhotoFile,
      "someId1234",
      {
        _timestamp: "Date.now()",
        date: "new DAte()",
        description: "some desc",
        tags: ["12ere", "23wer"],
      }
    );

    expect(PhotoModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);

    expect(photo).toEqual({
      _timestamp: "Date.now()",
      aspectRatio: 1.5,
      base64: "base64String",
      date: "new DAte()",
      description: "some desc",
      files: [
        "/pathToFsResultPhotoDir/eva-upload-400.jpg",
        "/pathToFsResultPhotoDir/eva-upload-800.jpg",
        "/pathToFsResultPhotoDir/eva-upload-1200.jpg",
        "/pathToFsResultPhotoDir/eva-upload-1600.jpg",
      ],
      iconSrc: "/pathToWebResultPhotoDir/eva-upload-400.jpg",
      src: "/pathToWebResultPhotoDir/eva-upload-800.jpg",
      srcSet:
        "/pathToWebResultPhotoDir/eva-upload-400.jpg 400w, /pathToWebResultPhotoDir/eva-upload-800.jpg 800w, /pathToWebResultPhotoDir/eva-upload-1200.jpg 1200w, /pathToWebResultPhotoDir/eva-upload-1600.jpg 1600w",
      tags: ["12ere", "23wer"],
    });
  });

  */

  describe("makeDifferentSizesOfPhoto", () => {
    test("makeDifferentSizesOfPhoto - it must call to makeJpgsByWidths", async () => {
      const result = await makeDifferentSizesOfPhoto(
        "filename",
        "/pathToUploadPhotoFile",
        "/pathToFsResultDir",
        "/pathToWebResultDir"
      );

      expect(makeJpgsByWidths).toHaveBeenCalledTimes(1);

      /* expect(makeJpgsByWidths).toHaveBeenCalledWith(
              "/pathToUploadPhotoFile",
              "pathToResultDir",
              "filename",
              [400, 800, 1200, 1600]
            ); */

      //expect(result).toEqual("Hello");
    });

    test("makeDifferentSizesOfPhoto - exception", async () => {
      makeJpgsByWidths.mockRejectedValueOnce("makeJpgsByWidths ERROR");

      /* makeJpgsByWidths.mockReturnValueOnce(
        Promise.reject("makeJpgsByWidths ERROR")
      );
 */
      try {
        const result = await makeDifferentSizesOfPhoto(
          "filename",
          "/pathToUploadPhotoFile",
          "/pathToFsResultDir",
          "/pathToWebResultDir"
        );
        expect(false).toEqual(true);
      } catch (err) {
        expect(err).toEqual("makeJpgsByWidths ERROR");
        expect(makeJpgsByWidths).toHaveBeenCalledTimes(1);
      }
    });
  });

  test("getMapsOfPathsToPhotos", () => {
    const [pathsFS, pathsWeb] = getMapsOfPathsToPhotos(
      [200, 400, 500],
      "hello",
      "/fs",
      "/web"
    );

    expect(pathsFS.size).toEqual(3);
    expect(pathsWeb.size).toEqual(3);
    expect(pathsFS.get(400)).toEqual("/fs/hello-400.jpg");
    expect(pathsWeb.get(500)).toEqual("/web/hello-500.jpg");
  });

  test("makeImageSrcSetString", () => {
    const map = new Map();
    map.set(200, "/image200.jpg");
    map.set(400, "/image400.jpg");
    map.set(800, "/image800.jpg");

    const result = makeImageSrcSetString(map);

    expect(result).toEqual(
      "/image200.jpg 200w, /image400.jpg 400w, /image800.jpg 800w"
    );
  });

  test("makeImageSizesString", () => {
    const result = makeImageSizesString(2.2);

    expect(result).toEqual("(max-aspect-ratio: 220/100) 99vw, 220vh");
  });
});

/* const weCreateReadStream = () => {
  const pathToFile = resolve(__dirname, "file", "eva.jpg");

  const createReadStream = () => {
    return fs.createReadStream(pathToFile);
  };

  const file = {
    filename: "eva-upload.jpeg",
    createReadStream,
  };

  return file;
}; */
