import { resolve } from "path";
import { path as appRootPath } from "app-root-path";

export const pathToTempDiffWidthsPhotos = resolve(appRootPath, "temp");
export const pathToUploadFilesDir = resolve(appRootPath, "uploads");

//export const photoWidths = [400, 800, 1200, 1600, 1900];
//export const photoHeights = [300, 600, 700, 900, 1000];

export const photoSizes = [
  { width: 320, height: 180 },
  { width: 800, height: 640 },
  { width: 1280, height: 720 },
  { width: 1920, height: 1080 },
  { width: 3840, height: 2160 },
];

export const PHOTOS_FIRESTORE_COLLECTION_NAME = "photos";
export const TAGS_FIRESTORE_COLLECTION_NAME = "tags";

export const pathToFirestoreCredentials = resolve(
  appRootPath,
  "credentials",
  "lizzigram-1600291187801-firebase-adminsdk-uef40-d840b18e39.json"
);

// GOOGLE DRIVE
export const googleDriveParentId = "1wTRcXEhl_gZ2Ppb6c2RO19M0qeG9xI6P";

export const pathToGoogleDriveCredentials = resolve(
  appRootPath,
  "credentials",
  "lizzigram-google-drive-1600291187801-3964f05f8a31.json"
);
