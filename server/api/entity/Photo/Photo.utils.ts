import { ApolloError } from "apollo-server-express";
import PhotoModel from "./Photo.model";
import fs from "fs";
import { path as rootPath } from "app-root-path";
import { resolve as pathResolve } from "path";
import {
  makeJpgsByWidths,
  getBase64AndAspectRatio,
} from "../../../utils/sharp";
import {
  pathToUploadPhotoFileDir,
  pathToFsResultPhotoDir,
  pathToWebResultPhotoDir,
} from "./config";

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
  date?: Date;
  tags?: string[];
}

export const makePhotoName = (width: number, name: string) => {
  return `${name}-${width}.jpg`;
};

export const getMapsOfPathsToPhotos = (
  widths: number[],
  name: string,
  pathToFsResultDir: string,
  pathToWebResultDir?: string
) => {
  //we make pathsFileSystem: Map<width, path>
  const pathsFS: Map<number, string> = new Map();
  //we make pathsSite: Map<width, path>
  const pathsWeb: Map<number, string> = new Map();

  for (let width of widths) {
    pathsFS.set(width, `${pathToFsResultDir}/${makePhotoName(width, name)}`);
    if (pathToWebResultDir)
      pathsWeb.set(
        width,
        `${pathToWebResultDir}/${makePhotoName(width, name)}`
      );
  }

  return [pathsFS, pathsWeb];
};

/* export const makeDifferentSizesOfPhotoCloudinary = async (
  filename: string,
  pathToUploadPhotoFile: string,
  pathToFsResultDir: string,
  pathToWebResultDir?: string
) => {
  try {
    const widths = [400, 800, 1200, 1600];

    const name = filename.substring(0, filename.indexOf("."));

    const [pathsFS, pathsWeb] = getMapsOfPathsToPhotos(
      widths,
      name,
      pathToFsResultDir,
      pathToWebResultDir
    );

    //console.log("BEFORE MAKE JPGS BY WIDTHS");
    await makeJpgsByWidths(pathToUploadPhotoFile, pathsFS);
    //console.log("AFTER MAKE JPGS BY WIDTHS");

    return [pathsFS, pathsWeb];
  } catch (err) {
    //console.log("[MAKE DIFFERENT SIZES OF PHOTO] ERR");
    throw err;
  }
};
 */
export const makeDifferentSizesOfPhoto = async (
  filename: string,
  pathToUploadPhotoFile: string,
  pathToFsResultDir: string,
  pathToWebResultDir?: string
) => {
  try {
    const widths = [400, 800, 1200, 1600];

    const name = filename.substring(0, filename.indexOf("."));

    const [pathsFS, pathsWeb] = getMapsOfPathsToPhotos(
      widths,
      name,
      pathToFsResultDir,
      pathToWebResultDir
    );

    //console.log("BEFORE MAKE JPGS BY WIDTHS");
    await makeJpgsByWidths(pathToUploadPhotoFile, pathsFS);
    //console.log("AFTER MAKE JPGS BY WIDTHS");

    return [pathsFS, pathsWeb];
  } catch (err) {
    //console.log("[MAKE DIFFERENT SIZES OF PHOTO] ERR");
    throw err;
  }
};

//make image srcset string
export const makeImageSrcSetString = (
  pathToPhotosByWidths: Map<number, string>
) => {
  let result = "";

  //"/images/girl_300.jpeg 300w, /images/girl_600.jpeg 600w"

  //@ts-ignore
  for (let entry of pathToPhotosByWidths) {
    result += `${entry[1]} ${entry[0]}w, `;
  }

  result = result.slice(0, -2);

  return result;
};

//make image sizes string
export const makeImageSizesString = (aspectRatio: number) => {
  //""

  let ratio = Math.round(aspectRatio * 100);

  return `(max-aspect-ratio: ${ratio}/100) 99vw, ${ratio}vh`;
};

export const setPropertiesToUpdate = (photoInput: IEditPhotoInput) => {
  const propertiesToUpdate: any = {};

  if (photoInput.file) propertiesToUpdate._timestamp = Date.now();
  if (photoInput.date) propertiesToUpdate.date = photoInput.date;
  if (photoInput.desc) propertiesToUpdate.desc = photoInput.desc;
  if (photoInput.tags) propertiesToUpdate.tags = photoInput.tags;

  return propertiesToUpdate;
};
