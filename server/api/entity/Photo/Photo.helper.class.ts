import fs from "fs";
import PhotoModel, { IPhoto } from "./Photo.model";
import {
  makeImageSrcSetString,
  makeDifferentSizesOfPhoto,
} from "./Photo.utils";
import { getBase64AndAspectRatio } from "../../../utils/sharp";
import { promisify } from "util";
import { ApolloError } from "apollo-server-express";
import { googleDriveController } from "../../../utils/googleDrive";
import { uploadImagesByDifferentWidths } from "../../../utils/cloudinary";

export interface IPhotoInfo {
  base64: string;
  files: string[];
  aspectRatio: number;
  src: string;
  iconSrc: string;
  srcSet: string;
}

export interface IEditPhotoInput {
  id: string;
  file?: any;
  desc?: string;
  date?: string;
  tags?: string[];
}

export interface IPhotoHelper {
  filename: string;

  prevPhoto: IPhoto | undefined;

  photo: IPhoto;

  pathToUploadPhotoFileDir: string;
  pathToFsResultDir: string;
  pathToWebResultDir: string;

  pathToUploadPhotoFile: string;

  edit: (id: any, file: any) => Promise<IPhoto>;
  upload: (file: any) => Promise<IPhoto>;

  onWritableStreamUploadPhoto: (writableStream: any) => Promise<void>;
}

class PhotoHelper {
  filename: string = "";

  prevPhoto: IPhoto = undefined;

  photo: IPhoto = {
    _id: undefined,
    date: null,
    tags: [],
    description: "",
    base64: "",
    files: [],
    aspectRatio: 0, //1.6
    srcSet: "",
    iconSrc: "",
    src: "",
    googleDriveId: "",
    _timestamp: 0,
  };

  pathToUploadPhotoFileDir: string;
  pathToFsResultDir: string;
  pathToWebResultDir: string;

  pathToUploadPhotoFile: string = "";

  constructor(
    pathToUploadPhotoFileDir: string,
    pathToFsResultDir: string,
    pathToWebResultDir: string,
    date?: Date,
    desc?: string,
    tags?: string[]
  ) {
    this.photo.date = date;
    this.photo.description = desc;
    this.photo.tags = tags;

    this.pathToUploadPhotoFileDir = pathToUploadPhotoFileDir;
    this.pathToFsResultDir = pathToFsResultDir;
    this.pathToWebResultDir = pathToWebResultDir;
  }

  edit = async (id: any, file: any) => {
    try {
      //if we get new file
      //create new files, base64, aspectRatio and save it to public or cloudinary
      //make new srcSet, iconSrc, src, files,

      this.photo._id = id;

      this.prevPhoto = await PhotoModel.findById(this.photo._id);

      if (!this.prevPhoto) {
        throw new Error(`No photo with id ${this.photo._id}`);
      }

      //const propertiesToUpdate: any = {};

      if (file) {
        const writableStream = await this.uploadPhotoFile(file);

        await this.onWritableStreamUploadPhoto(writableStream);
      } else {
        if (!this.photo.tags && !this.photo.description && !this.photo.date) {
          throw new Error("Нечего менять");
        }
      }

      console.log("[PROPERTIES TO UPDATE", this.getPropertiesToUpdate(file));

      const photo = await PhotoModel.findByIdAndUpdate(
        this.photo._id,
        this.getPropertiesToUpdate(file),
        { new: true }
      );

      if (file) {
        //remove upload file
        this.removeUploadPhoto();
        //remove old files from public or cloudinary
        this.removePhotoFiles(this.prevPhoto.files).catch((err) => {
          console.error(`Can't delete photo file - ${err.message}`);
        });
      }

      return photo;
    } catch (err) {
      this.cleanUpAfterBadEdit(file);
      console.error(err.message || err.toString());
      throw new ApolloError("Какая-то ошибка на сервере...");
    }
  };

  upload = async (file: any) => {
    try {
      const writableStream = await this.uploadPhotoFile(file);

      await this.onWritableStreamUploadPhoto(writableStream);

      const photo = await PhotoModel.create(this.photo);

      this.photo._id = photo._id;

      googleDriveController
        .savePhoto(photo._id, this.filename, this.pathToUploadPhotoFile)
        .then(() =>
          this.removeUploadPhoto().catch((err) => {
            console.error(
              `Can't delete upload photo file - ${this.pathToUploadPhotoFile} | ${err.message}`
            );
          })
        )
        .catch((err: Error) =>
          console.error(`Error on save photo to google drive`, err)
        );

      return photo;
    } catch (err) {
      this.cleanUpAfterBadUpload();
      console.error(err.message || err.toString());
      throw new ApolloError("Какая-то ошибка на сервере...");
    }
  };

  onWritableStreamUploadPhoto = (writableStream: any) => {
    return new Promise((resolve, reject) => {
      writableStream.on("error", (err) => {
        reject(err);
      });
      writableStream.on("finish", async () => {
        try {
          await this.preparePhoto();

          this.photo._timestamp = Date.now();

          resolve();

          //send different sizes to cloudinary and collect names
          /* const pathsToCloudinaryPhotosByWidths = await uploadImagesByDifferentWidths(
              paths
            ); */
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  getPropertiesToUpdate = (file: any) => {
    const propertiesToUpdate: any = {};

    if (this.photo.date) propertiesToUpdate.date = this.photo.date;
    if (this.photo.description)
      propertiesToUpdate.description = this.photo.description;
    if (this.photo.tags) propertiesToUpdate.tags = this.photo.tags;

    if (file) {
      //propertiesToUpdate._timestamp = Date.now();

      if (this.photo.base64) propertiesToUpdate.base64 = this.photo.base64;
      if (this.photo.files) propertiesToUpdate.files = this.photo.files;

      if (this.photo.aspectRatio)
        propertiesToUpdate.aspectRatio = this.photo.aspectRatio;
      if (this.photo.srcSet) propertiesToUpdate.srcSet = this.photo.srcSet;
      if (this.photo.iconSrc) propertiesToUpdate.iconSrc = this.photo.iconSrc;
      if (this.photo.src) propertiesToUpdate.src = this.photo.src;
    }

    return propertiesToUpdate;
  };

  removeUploadPhoto = async () => {
    if (
      this.pathToUploadPhotoFile &&
      fs.existsSync(this.pathToUploadPhotoFile)
    ) {
      return promisify(fs.unlink)(this.pathToUploadPhotoFile);
    }
  };

  removePhotoFiles = async (files: string[]) => {
    const promises: Promise<any>[] = [];
    for (let file of files) {
      if (fs.existsSync(file)) {
        promises.push(promisify(fs.unlink)(file));
        /* fs.unlink(file, (err) => {
            if (err)
              console.log(
                `Can't delete photo file - ${file} | ${err.message}`
              );
          }); */
      }
    }

    return Promise.all(promises);
  };

  cleanUpAfterBadEdit = async (file: any) => {
    try {
      if (file) {
        //remove upload photo file
        this.removeUploadPhoto().catch((err) => {
          console.error(
            `Can't delete upload photo file - ${this.pathToUploadPhotoFile} | ${err.message}`
          );
        });
        //remove maked files on cloudinary
        //remove maked photos
        if (this.photo.files) {
          this.removePhotoFiles(this.photo.files).catch((err) => {
            console.error(`Can't delete photo file - ${err.message}`);
          });
        }
      }

      //restore db record
      const photo = await PhotoModel.findByIdAndUpdate(
        this.prevPhoto._id,
        this.prevPhoto
      );
    } catch (err) {
      console.error(err.message || err.toString());
    }
  };

  cleanUpAfterBadUpload = async () => {
    try {
      //remove upload photo file
      this.removeUploadPhoto().catch((err) => {
        console.error(
          `Can't delete upload photo file - ${this.pathToUploadPhotoFile} | ${err.message}`
        );
      });
      //remove maked files on cloudinary
      //remove maked photos
      if (this.photo.files) {
        this.removePhotoFiles(this.photo.files).catch((err) => {
          console.error(`Can't delete photo file - ${err.message}`);
        });
        /* for (let file of this.photo.files) {
          if (fs.existsSync(file)) {
            fs.unlink(file, (err) => {
              if (err)
                console.log(
                  `Can't delete photo file - ${file} | ${err.message}`
                );
            });
          }
        } */
      }

      //remove db record
      if (this.photo._id) await PhotoModel.findByIdAndRemove(this.photo._id);
    } catch (err) {
      console.error(err.message || err.toString());
    }
  };

  uploadPhotoFile = async (file: any) => {
    const { createReadStream, filename } = await file;
    const fileStream = createReadStream();

    //TODO: make random name
    this.filename = filename;
    this.pathToUploadPhotoFile = `${this.pathToUploadPhotoFileDir}/${filename}`;

    const writableStream = fs.createWriteStream(this.pathToUploadPhotoFile);

    await fileStream.pipe(writableStream);

    return writableStream;
  };

  preparePhoto = async (): Promise<undefined> => {
    try {
      // console.log("BEFORE makeDifferentSizesOfPhoto");
      const [
        [pathsFS, pathsWeb],
        { base64String, aspectRatio },
      ] = await Promise.all([
        makeDifferentSizesOfPhoto(
          this.filename,
          this.pathToUploadPhotoFile,
          this.pathToFsResultDir,
          this.pathToWebResultDir
        ),
        getBase64AndAspectRatio(this.pathToUploadPhotoFile),
      ]);

      /* const pathsToCloudinaryPhotosByWidths = await uploadImagesByDifferentWidths(
        pathsFS
      );
 */
      //console.log("AFTER makeDifferentSizesOfPhoto");

      this.photo.base64 = base64String;
      this.photo.aspectRatio = aspectRatio;
      this.photo.files = [...pathsFS.values()];

      //make image srcset string
      this.photo.srcSet = makeImageSrcSetString(pathsWeb);

      this.photo.src = pathsWeb.get(800);
      this.photo.iconSrc = pathsWeb.get(400);

      return;
    } catch (err) {
      //console.log("[WORK WITH PHOTO] ERR", err.message || err.toString());
      throw err;
    }
  };

  /*  preparePhotoCloudinary = async (): Promise<undefined> => {
    try {
      // console.log("BEFORE makeDifferentSizesOfPhoto");
      const [
        [pathsFS, pathsWeb],
        { base64String, aspectRatio },
      ] = await Promise.all([
        makeDifferentSizesOfPhoto(
          this.filename,
          this.pathToUploadPhotoFile,
          this.pathToFsResultDir,
          this.pathToWebResultDir
        ),
        getBase64AndAspectRatio(this.pathToUploadPhotoFile),
      ]);

      const pathsToCloudinaryPhotosByWidths = await uploadImagesByDifferentWidths(
        pathsFS
      );

      //console.log("AFTER makeDifferentSizesOfPhoto");

      this.photo.base64 = base64String;
      this.photo.aspectRatio = aspectRatio;
      this.photo.files = [...pathsToCloudinaryPhotosByWidths.values()];

      //make image srcset string
      this.photo.srcSet = makeImageSrcSetString(
        pathsToCloudinaryPhotosByWidths
      );

      this.photo.src = pathsToCloudinaryPhotosByWidths.get(800);
      this.photo.iconSrc = pathsToCloudinaryPhotosByWidths.get(400);

      return;
    } catch (err) {
      //console.log("[WORK WITH PHOTO] ERR", err.message || err.toString());
      throw err;
    }
  }; */
}

export default PhotoHelper;
