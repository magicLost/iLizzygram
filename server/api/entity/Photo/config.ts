import { resolve } from "path";
import { path as rootPath } from "app-root-path";

export const pathToUploadPhotoFileDir = resolve(rootPath, "uploadedFiles");

export const pathToFsResultPhotoDir = resolve(rootPath, "public", "images");

export const pathToWebResultPhotoDir = "/images";
