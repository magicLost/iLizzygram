import { PhotoHelper, PhotoHelperCloudinary } from "../Photo.helper";

import PhotoModel from "../Photo.model";
import {
  makeImageSrcSetString,
  makeDifferentSizesOfPhoto,
} from "./../Photo.utils";

import { ncp } from "ncp";

import fs from "fs";
import { ApolloError } from "apollo-server-express";
import { getBase64AndAspectRatio } from "../../../../utils/sharp";
import { resolve } from "path";
import { promisify } from "util";
import { googleDriveController } from "./../../../../utils/googleDrive";
import {
  uploadImagesByDifferentWidths,
  deleteImage,
} from "../../../../utils/cloudinary";
import wait from "waait";
import { date } from "faker";

const gFilename = "eva-upload.jpeg";
const gPathToUploadPhotoFileDir = resolve(__dirname, "uploadedFiles");
const gPathToUploadPhotoFile = resolve(
  __dirname,
  "uploadedFiles",
  "eva-upload.jpeg"
);
const gPathToFsResultDir = resolve(__dirname, "result");
const gPathToWebResultDir = "/image";

jest.mock("../../../../utils/cloudinary", () => {
  return {
    __esModule: true,
    uploadImagesByDifferentWidths: jest.fn(() =>
      Promise.resolve(
        new Map([
          [400, { public_id: "id1234", secure_url: "/path400" }],
          [800, { public_id: "id9990", secure_url: "/path800" }],
        ])
      )
    ),
    deleteImage: jest.fn(() => Promise.resolve()),
  };
});

jest.mock("./../../../../utils/googleDrive", () => {
  return {
    __esModule: true,
    googleDriveController: {
      savePhoto: jest.fn(async () => {
        return Promise.resolve();
      }),
      updatePhoto: jest.fn(async () => {
        return Promise.resolve();
      }),
    },
  };
});

jest.mock("./../Photo.utils", () => {
  return {
    __esModule: true,

    makeImageSrcSetString: jest.fn((mapWeb) => {
      //expect(mapWeb.get(800)).toEqual("/pathToWebResultDir/filename-800.jpg");
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
      findById: jest.fn((id) =>
        Promise.resolve({
          _id: id,
          date: new Date(2015, 10, 7),
          description: "old description",
          tages: ["id1", "id2"],
        })
      ),
      findByIdAndUpdate: jest.fn((id) =>
        Promise.resolve({
          _id: id,
        })
      ),
      findByIdAndRemove: jest.fn((id) => Promise.resolve("photo")),
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

describe("AbstractPhotoHelper", () => {
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

  afterEach(async () => {
    console.error.mockClear();
    makeDifferentSizesOfPhoto.mockClear();
    makeImageSrcSetString.mockClear();
    getBase64AndAspectRatio.mockClear();
    PhotoModel.create.mockClear();
    PhotoModel.findByIdAndUpdate.mockClear();
    PhotoModel.findByIdAndRemove.mockClear();

    if (fs.existsSync(gPathToUploadPhotoFile))
      await promisify(fs.unlink)(gPathToUploadPhotoFile);
  });

  /* describe("upload", () => {
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

      //we wait cause of helper.removeUploadPhoto
      await wait(100);

      expect(helper.uploadPhotoFile).toHaveBeenCalledTimes(1);
      expect(helper.onWritableStreamUploadPhoto).toHaveBeenCalledTimes(1);

      expect(googleDriveController.savePhoto).toHaveBeenCalledTimes(1);
      expect(helper.removeUploadPhoto).toHaveBeenCalledTimes(1);
      expect(photo).toEqual({ _id: "supeMongoId" });
    });
  });
*/
  describe("edit", () => {
    //we call uploadPhotoFile and create writableStream
    //we call onWritableStreamUploadPhoto and set listeners on writable stream
    //we call PhotoModel.create to save our photo to db
    //we call googleDriveController.savePhoto to save uploaded photo to google drive
    //if success we call removeUploadPhoto
    //we return photo data

    //If findById do not return photo - error
    //If no file we do not call uploadPhotoFile, onWritableStreamUploadPhoto, googleDriveController.updatePhoto, removeUploadPhoto, removePhotoDiffWidthsFiles
    //If no file, no desc, no date, no tags - error
    //If googleDriveController.updatePhoto throw error we do not call removeUploadPhoto

    test("If all ok we return photo data of new photo", async () => {
      helper.uploadPhotoFile = jest.fn(async () => {
        return Promise.resolve("writableStream");
      });
      helper.onWritableStreamUploadPhoto = jest.fn(async () => {
        return Promise.resolve();
      });
      helper.removeUploadPhoto = jest.fn(async () => Promise.resolve());

      helper.getPropertiesToUpdate = jest.fn(() => ({}));

      helper.removePhotoDiffWidthsFiles = jest.fn(async () =>
        Promise.resolve()
      );

      helper.photo = {
        _id: "supeMongoId",
      };

      const photo = await helper.edit("photo_id", "file");

      //we wait cause of helper.removeUploadPhoto
      await wait(100);

      expect(PhotoModel.findById).toHaveBeenCalledTimes(1);

      //PhotoModel.findById
      expect(helper.uploadPhotoFile).toHaveBeenCalledTimes(1);
      expect(helper.onWritableStreamUploadPhoto).toHaveBeenCalledTimes(1);

      expect(helper.getPropertiesToUpdate).toHaveBeenCalledTimes(1);

      expect(PhotoModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);

      expect(googleDriveController.updatePhoto).toHaveBeenCalledTimes(1);
      expect(helper.removeUploadPhoto).toHaveBeenCalledTimes(1);
      expect(helper.removePhotoDiffWidthsFiles).toHaveBeenCalledTimes(1);
      expect(photo).toEqual({ _id: "photo_id" });

      //expect(true).toEqual(true);
    });
  });

  /* describe("onWritableStreamUploadPhoto", () => {
    test("What if inside onWritableStreamUploadPhoto trigger exception", async () => {
      makeDifferentSizesOfPhoto.mockRejectedValueOnce(
        "makeDifferentSizesOfPhoto ERROR"
      );
      /// makeDifferentSizesOfPhoto.mockReturnValueOnce(
      //  Promise.reject("makeDifferentSizesOfPhoto ERROR")
      //);

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
    //  const pathToFilesToRemoveDirCopy = resolve(__dirname, "file", "files-copy");

  //  let files = await promisify(fs.readdir)(pathToFilesToRemoveDirCopy);

  //  expect(files).toHaveLength(3);

   // await copyAndGetDiffWidthsPhotoFiles(); 

    //PREPARE
    //copy photo file from /file to /uploadedFiles
    await weCopyPhotoFileToUploadDir(gPathToUploadPhotoFile);

    //copyAndGetDiffWidthsPhotoFiles
    const pathToFilesToRemoveDirCopy = await copyAndGetDiffWidthsPhotoFiles();

    //weSetPathToFilesArray
    const pathToFiles = weSetPathToFilesArray(pathToFilesToRemoveDirCopy);

    //wePrepareHelper
    //wePrepareHelper(helper, gPathToUploadPhotoFile, pathToFiles);
    helper.photo._id = "someId1234";
    helper.pathToUploadPhotoFile = gPathToUploadPhotoFile;
    helper.photo.files = pathToFiles;

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

    //copyAndGetDiffWidthsPhotoFiles
    const pathToFilesToRemoveDirCopy = await copyAndGetDiffWidthsPhotoFiles();

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

  describe("PhotoHelper", () => {
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

        expect(helper.photo.src).toEqual(
          "/pathToWebResultDir/filename-800.jpg"
        );
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
  });

  describe("PhotoHelperCloudinary", () => {
    describe("preparePhoto", () => {
      beforeEach(() => {
        helper = new PhotoHelperCloudinary(
          gPathToUploadPhotoFileDir,
          gPathToFsResultDir,
          new Date(2019, 11, 17),
          "some description",
          ["id123", "id234"]
        );
      });

      test("preparePhoto - exception", async () => {
        //makeJpgsByWidths.mockRejectedValueOnce("makeJpgsByWidths ERROR");

        expect(helper).toBeInstanceOf(PhotoHelperCloudinary);

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

        expect(helper.photo.src).toEqual("/path800");
        expect(helper.photo.iconSrc).toEqual("/path400");
        expect(helper.photo.base64).toEqual("base64String");
        expect(helper.photo.aspectRatio).toEqual(1.5);

        expect(getBase64AndAspectRatio).toHaveBeenCalledTimes(1);
        expect(makeDifferentSizesOfPhoto).toHaveBeenCalledTimes(1);
        expect(makeDifferentSizesOfPhoto).toHaveBeenCalledWith(
          gFilename,
          gPathToUploadPhotoFile,
          gPathToFsResultDir
        );

        expect(uploadImagesByDifferentWidths).toHaveBeenCalledTimes(1);

        expect(helper.photo.files).toEqual(["id1234", "id9990"]);
        expect(helper.photo.srcSet).toEqual("makeImageSrcSetString");
      });
    });
  }); */
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

const copyAndGetDiffWidthsPhotoFiles = async () => {
  const pathToFilesToRemoveDir = resolve(__dirname, "file", "files");
  const pathToFilesToRemoveDirCopy = resolve(__dirname, "file", "files-copy");

  let files = await promisify(fs.readdir)(pathToFilesToRemoveDirCopy);

  if (files.length === 0) {
    await promisify(ncp)(pathToFilesToRemoveDir, pathToFilesToRemoveDirCopy);
  }

  files = await promisify(fs.readdir)(pathToFilesToRemoveDir);

  expect(files).toHaveLength(3);

  files = await promisify(fs.readdir)(pathToFilesToRemoveDirCopy);

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
