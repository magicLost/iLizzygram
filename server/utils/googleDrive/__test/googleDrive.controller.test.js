import wait from "waait";
import PhotoModel from "../../../api/entity/Photo/Photo.model";
import GoogleDriveController from "../googleDrive.controller";
import { uploadImageToDrive, getDrive } from "../googleDrive.helper";

jest.mock("../../../api/entity/Photo/Photo.model", () => {
  return {
    __esModule: true,
    default: {
      findByIdAndUpdate: jest.fn(),
    },
  };
});

jest.mock("../googleDrive.helper", () => {
  return {
    __esModule: true,
    uploadImageToDrive: jest.fn(async () => {
      return Promise.resolve({
        data: {
          id: "1234DriveId",
        },
      });
    }),
    getDrive: jest.fn(async () => {
      return Promise.resolve("drive");
    }),
  };
});

describe("GoogleDriveController", () => {
  //let mongooseCon = undefined;
  let fillDb = undefined;
  let googleDriveController = undefined;

  beforeAll(async () => {
    googleDriveController = new GoogleDriveController();

    await wait(1000);

    console = { log: jest.fn() };
  });

  test("savePhoto", async () => {
    expect(googleDriveController.drive).toEqual("drive");

    await googleDriveController.savePhoto(
      "1234mongoId",
      "hello.jpg",
      "/path/hello.jpg"
    );

    expect(uploadImageToDrive).toHaveBeenCalledTimes(1);

    expect(PhotoModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
  });
});
