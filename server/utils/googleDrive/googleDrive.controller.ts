import { drive_v3 } from "googleapis";
//import PhotoModel from "../../api/entity/Photo/Photo.model";
import {
  getDrive,
  uploadImageToDrive,
  updateImageFile,
  parentId,
} from "./googleDrive.helper";

class GoogleDriveController {
  parents: string[] = [parentId];
  drive: drive_v3.Drive = undefined;

  constructor() {
    getDrive()
      .then((drive) => (this.drive = drive))
      .catch(
        (err) =>
          new Error(`We can't create google drive ${JSON.stringify(err)}`)
      );
  }

  /* init = async () => {
    this.drive = await getDrive();
  }; */

  savePhoto = (
    photoMongoId: string,
    photoFileName: string,
    photoFilePath: string,
    photoMimeType: string = "image/jpeg"
  ) => {
    if (this.drive === undefined)
      throw new Error("No drive. Are you forget call init?");

    return uploadImageToDrive(
      this.drive,
      photoFileName,
      photoFilePath,
      photoMimeType,
      this.parents
    );
  };

  updatePhoto = async (
    photoId: string,
    photoFilePath: string,
    photoMimeType: string = "image/jpeg"
  ) => {
    if (this.drive === undefined)
      throw new Error("No drive. Are you forget call init?");

    await updateImageFile(this.drive, photoId, photoFilePath, photoMimeType);
  };
}

export default GoogleDriveController;
