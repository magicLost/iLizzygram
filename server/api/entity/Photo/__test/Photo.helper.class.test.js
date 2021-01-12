import PhotoHelper from "../Photo.helper.class";

import PhotoModel from "../Photo.model";
import {
  makeImageSrcSetString,
  makeDifferentSizesOfPhoto,
} from "./../Photo.helper";

import { ncp } from "ncp";

import fs from "fs";
import { ApolloError } from "apollo-server-express";
import { getBase64AndAspectRatio } from "../../../../utils/sharp";
import { resolve } from "path";
import { promisify } from "util";
import { googleDriveController } from "./../../../../utils/googleDrive";

const gFilename = "eva-upload.jpeg";
const gPathToUploadPhotoFileDir = resolve(__dirname, "uploadedFiles");
const gPathToUploadPhotoFile = resolve(
  __dirname,
  "uploadedFiles",
  "eva-upload.jpeg"
);
const gPathToFsResultDir = resolve(__dirname, "result");
const gPathToWebResultDir = "/image";

jest.mock("./../../../../utils/googleDrive", () => {
  return {
    __esModule: true,
    googleDriveController: {
      savePhoto: jest.fn(async () => {
        return Promise.resolve();
      }),
    },
  };
});

jest.mock("./../Photo.helper", () => {
  return {
    __esModule: true,

    makeImageSrcSetString: jest.fn((mapWeb) => {
      expect(mapWeb.get(800)).toEqual("/pathToWebResultDir/filename-800.jpg");
      return "makeImageSrcSetString";
    }),
    makeDifferentSizesOfPhoto: jest.fn(() => {
      const mapFs = new Map();
      mapFs.set(400, "/pathToFsResultDir/filename-400.jpg");
      mapFs.set(800, "/pathToFsResultDir/filename-800.jpg");
      mapFs.set(1200, "/pathToFsResultDir/filename-1200.jpg");

      const mapWeb = new Map();
      mapWeb.set(400, "/pathToWebResultDir/filename-400.jpg");
      mapWeb.set(800, "/pathToWebResultDir/filename-800.jpg");
      mapWeb.set(1200, "/pathToWebResultDir/filename-1200.jpg");

      return Promise.resolve([mapFs, mapWeb]);
    }),
  };
});

jest.mock("../Photo.model", () => {
  return {
    __esModule: true,
    default: {
      create: jest.fn((photo) => {
        return Promise.resolve(photo);
      }),
      findByIdAndUpdate: jest.fn((id, photo) => {
        //expect(id).toEqual("someId1234");
        setTimeout(() => {
          return Promise.resolve(photo);
        }, 1500);
      }),
      findByIdAndRemove: jest.fn((id) => {
        //expect(id).toEqual("someId1234");
        setTimeout(() => {
          return Promise.resolve("photo");
        }, 1500);
      }),
    },
  };
});

jest.mock("../../../../utils/sharp", () => {
  return {
    __esModule: true,
    getBase64AndAspectRatio: jest.fn(() => {
      return Promise.resolve({
        base64String: "base64String",
        aspectRatio: 1.5,
      });
    }),
  };
});

jest.mock("apollo-server-express", () => {
  return {
    __esModule: true,
    ApolloError: jest.fn(),
  };
});

let helper = undefined;

describe("PhotoHelper", () => {
  beforeAll(() => {
    console = { error: jest.fn() };
  });

  beforeEach(() => {
    helper = new PhotoHelper(
      gPathToUploadPhotoFileDir,
      gPathToFsResultDir,
      gPathToWebResultDir,
      new Date(2019, 11, 17),
      "some description",
      ["id123", "id234"]
    );
  });

  afterEach(() => {
    console.error.mockClear();
    makeDifferentSizesOfPhoto.mockClear();
    makeImageSrcSetString.mockClear();
    getBase64AndAspectRatio.mockClear();
    PhotoModel.create.mockClear();
    PhotoModel.findByIdAndUpdate.mockClear();
    PhotoModel.findByIdAndRemove.mockClear();
  });

  describe("upload", () => {
    //we call uploadPhotoFile and create writableStream
    //we call onWritableStreamUploadPhoto and set listeners on writable stream
    //we call PhotoModel.create to save our photo to db
    //we call googleDriveController.savePhoto to save uploaded photo to google drive
    //if success we call removeUploadPhoto
    //we return photo data

    test("If all ok we return photo data of new photo", async () => {
      helper.uploadPhotoFile = jest.fn(async () => {
        return Promise.resolve("writableStream");
      });
      helper.onWritableStreamUploadPhoto = jest.fn(async () => {
        return Promise.resolve();
      });
      helper.removeUploadPhoto = jest.fn(async () => Promise());

      helper.photo = {
        _id: "supeMongoId",
      };

      const photo = await helper.upload("file");

      expect(photo).toEqual({ _id: "supeMongoId" });
    });
  });

  describe("onWritableStreamUploadPhoto", () => {
    test("What if inside onWritableStreamUploadPhoto trigger exception", async () => {
      makeDifferentSizesOfPhoto.mockRejectedValueOnce(
        "makeDifferentSizesOfPhoto ERROR"
      );
      /* makeDifferentSizesOfPhoto.mockReturnValueOnce(
        Promise.reject("makeDifferentSizesOfPhoto ERROR")
      ); */

      try {
        const file = weCreateReadStream();

        const writableStream = await helper.uploadPhotoFile(file);

        //await onWritableStream(writableStream);
        await helper.onWritableStreamUploadPhoto(writableStream);

        expect(true).toEqual(false);
      } catch (err) {
        expect(err).toEqual("makeDifferentSizesOfPhoto ERROR");
      }
    });
    test("onWritableStreamUploadPhoto", async () => {
      const file = weCreateReadStream();

      const writableStream = await helper.uploadPhotoFile(file);

      await helper.onWritableStreamUploadPhoto(writableStream);

      //expect(PhotoModel.create).toHaveBeenCalledTimes(1);

      helper.photo._timestamp = 123456;

      expect(helper.photo).toEqual({
        _id: undefined,
        _timestamp: 123456,
        aspectRatio: 1.5,
        base64: "base64String",
        date: new Date(2019, 11, 17),
        description: "some description",
        files: [
          "/pathToFsResultDir/filename-400.jpg",
          "/pathToFsResultDir/filename-800.jpg",
          "/pathToFsResultDir/filename-1200.jpg",
        ],
        googleDriveId: "",
        iconSrc: "/pathToWebResultDir/filename-400.jpg",
        src: "/pathToWebResultDir/filename-800.jpg",
        srcSet: "makeImageSrcSetString",
        tags: ["id123", "id234"],
      });
    });
  });

  describe("uploadPhotoFile", () => {
    test("uploadPhotoFile - test with real streams", async () => {
      const file = weCreateReadStream();

      const writableStream = await helper.uploadPhotoFile(file);

      expect(helper.pathToUploadPhotoFileDir).toEqual(
        resolve(__dirname, "uploadedFiles")
      );
      expect(helper.filename).toEqual("eva-upload.jpeg");
      expect(helper.pathToUploadPhotoFile).toEqual(
        `${resolve(__dirname, "uploadedFiles")}/eva-upload.jpeg`
      );

      expect(fs.existsSync(helper.pathToUploadPhotoFile)).toEqual(true);
    });
  });

  describe("preparePhoto", () => {
    test("preparePhoto - exception", async () => {
      //makeJpgsByWidths.mockRejectedValueOnce("makeJpgsByWidths ERROR");

      makeDifferentSizesOfPhoto.mockReturnValueOnce(
        Promise.reject("makeDifferentSizesOfPhoto ERROR")
      );

      try {
        await helper.preparePhoto();

        expect(false).toEqual(true);
      } catch (err) {
        expect(err).toEqual("makeDifferentSizesOfPhoto ERROR");
        expect(makeDifferentSizesOfPhoto).toHaveBeenCalledTimes(1);
      }
    });

    test("preparePhoto", async () => {
      helper.filename = gFilename;
      helper.pathToUploadPhotoFile = gPathToUploadPhotoFile;

      await helper.preparePhoto();

      expect(helper.photo.src).toEqual("/pathToWebResultDir/filename-800.jpg");
      expect(helper.photo.iconSrc).toEqual(
        "/pathToWebResultDir/filename-400.jpg"
      );
      expect(helper.photo.base64).toEqual("base64String");
      expect(helper.photo.aspectRatio).toEqual(1.5);

      expect(getBase64AndAspectRatio).toHaveBeenCalledTimes(1);
      expect(makeDifferentSizesOfPhoto).toHaveBeenCalledTimes(1);
      expect(makeDifferentSizesOfPhoto).toHaveBeenCalledWith(
        gFilename,
        gPathToUploadPhotoFile,
        gPathToFsResultDir,
        gPathToWebResultDir
      );

      expect(helper.photo.files).toEqual([
        "/pathToFsResultDir/filename-400.jpg",
        "/pathToFsResultDir/filename-800.jpg",
        "/pathToFsResultDir/filename-1200.jpg",
        //"/pathToFsResultDir/filename-1600.jpg",
      ]);
      expect(helper.photo.srcSet).toEqual("makeImageSrcSetString");
    });
  });

  test("getPropertiesToUpdate", () => {
    //PREPARE

    helper.photo.base64 = "base64";
    helper.photo.files = "files";
    helper.photo.aspectRatio = "aspectRatio";
    helper.photo.srcSet = "srcSet";
    helper.photo.iconSrc = "iconSrc";
    helper.photo.src = "src";

    //EVAL
    let propertiesToUpdate = helper.getPropertiesToUpdate();

    //EXPECTS
    expect(propertiesToUpdate).toEqual({
      date: new Date("2019-12-16T21:00:00.000Z"),
      description: "some description",
      tags: ["id123", "id234"],
    });

    //EVAL
    propertiesToUpdate = helper.getPropertiesToUpdate(true);

    //EXPECTS
    expect(propertiesToUpdate).toEqual({
      aspectRatio: "aspectRatio",
      base64: "base64",
      date: new Date("2019-12-16T21:00:00.000Z"),
      description: "some description",
      tags: ["id123", "id234"],
      files: "files",
      iconSrc: "iconSrc",
      src: "src",
      srcSet: "srcSet",
    });
  });

  test("cleanUpAfterBadUpload", async () => {
    //PREPARE
    //copy photo file from /file to /uploadedFiles
    await weCopyPhotoFileToUploadDir(gPathToUploadPhotoFile);

    //weSetPathsToDirWithFilesAndPrepareThem
    const pathToFilesToRemoveDirCopy = await weSetPathsToDirWithFilesAndPrepareThem();

    //weSetPathToFilesArray
    const pathToFiles = weSetPathToFilesArray(pathToFilesToRemoveDirCopy);

    //wePrepareHelper
    wePrepareHelper(helper, gPathToUploadPhotoFile, pathToFiles);

    //EVAL
    await helper.cleanUpAfterBadUpload();

    //EXPECT
    expect(fs.existsSync(gPathToUploadPhotoFile)).toEqual(false);

    const files = await promisify(fs.readdir)(pathToFilesToRemoveDirCopy);

    expect(files).toHaveLength(0);

    expect(PhotoModel.findByIdAndRemove).toHaveBeenCalledTimes(1);
    expect(PhotoModel.findByIdAndRemove).toHaveBeenCalledWith("someId1234");
  });

  test("cleanUpAfterBadEdit", async () => {
    //PREPARE
    //copy photo file from /file to /uploadedFiles
    await weCopyPhotoFileToUploadDir(gPathToUploadPhotoFile);

    //weSetPathsToDirWithFilesAndPrepareThem
    const pathToFilesToRemoveDirCopy = await weSetPathsToDirWithFilesAndPrepareThem();

    //weSetPathToFilesArray
    const pathToFiles = weSetPathToFilesArray(pathToFilesToRemoveDirCopy);

    //wePrepareHelper
    wePrepareHelper(helper, gPathToUploadPhotoFile, pathToFiles);

    const prevPhoto = {
      _id: "someId123456",
      files: "files",
    };

    helper.prevPhoto = prevPhoto;

    //EVAL
    await helper.cleanUpAfterBadEdit("file");

    //EXPECT
    expect(fs.existsSync(gPathToUploadPhotoFile)).toEqual(false);

    const files = await promisify(fs.readdir)(pathToFilesToRemoveDirCopy);

    expect(files).toHaveLength(0);

    expect(PhotoModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(PhotoModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "someId123456",
      prevPhoto
    );
  });
});

const weCopyPhotoFileToUploadDir = async (destinationPath) => {
  if (!fs.existsSync(destinationPath)) {
    const pathToFile = resolve(__dirname, "file", "eva.jpg");

    return promisify(fs.copyFile)(pathToFile, destinationPath);
  }

  return Promise.resolve();
};

const weCreateReadStream = () => {
  const pathToFile = resolve(__dirname, "file", "eva.jpg");

  const createReadStream = () => {
    return fs.createReadStream(pathToFile);
  };

  const file = {
    filename: "eva-upload.jpeg",
    createReadStream,
  };

  return file;
};

const weSetPathsToDirWithFilesAndPrepareThem = async () => {
  const pathToFilesToRemoveDir = resolve(__dirname, "file", "files");
  const pathToFilesToRemoveDirCopy = resolve(__dirname, "file", "files-copy");

  await promisify(ncp)(pathToFilesToRemoveDir, pathToFilesToRemoveDirCopy);

  const files = await promisify(fs.readdir)(pathToFilesToRemoveDirCopy);

  expect(files).toHaveLength(3);

  expect(fs.existsSync(gPathToUploadPhotoFile)).toEqual(true);

  return pathToFilesToRemoveDirCopy;
};

const weSetPathToFilesArray = (pathToFilesToRemoveDirCopy) => {
  return [
    `${pathToFilesToRemoveDirCopy}/eva.jpg`,
    `${pathToFilesToRemoveDirCopy}/eva-copy.jpg`,
    `${pathToFilesToRemoveDirCopy}/eva-copy-2.jpg`,
  ];
};

const wePrepareHelper = (helper, gPathToUploadPhotoFile, pathToFiles) => {
  helper.photo._id = "someId1234";
  helper.pathToUploadPhotoFile = gPathToUploadPhotoFile;
  helper.photo.files = pathToFiles;
};
