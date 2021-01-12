import {
  getDrive,
  showAllFiles,
  downloadImageFromDrive,
  uploadImageToDrive,
  parentId,
  deleteFile,
  updateImageFile,
  deleteAllFiles,
} from "./googleDrive.helper";
import { join } from "path";

const pathToUploadFile = join(
  __dirname,
  "..",
  "..",
  "public",
  "images",
  "vodianova.jpeg-1600.jpg"
);

// SHOW ALL FILES
/* (async () => {
  try {
    const drive = await getDrive();

    await getAllFiles(drive);
  } catch (err) {
    console.log(err.message);
  }
})(); */

// UPLOAD FILE FROM DISK

(async () => {
  try {
    const drive = await getDrive();

    //await showAllFiles(drive);

    //const res = await deleteFile(drive, "14HPc4gjwu7_cFxAprFkNuftC6E1kGywy");

    //await downloadImageFromDrive(drive, "1wXIF0ALoSaxLrpJbM-XaQTY8_f4oDNyL");

    /* const res = await uploadImageToDrive(
      drive,
      "vodianova.jpg",
      pathToUploadFile,
      "image/jpeg",
      [parentId]
    ); */

    /*  const res = await updateImageFile(
      drive,
      "1VwUG9nx2KOusi1xhE5E25XZdcp3bH492",
      pathToUploadFile
    ); */

    await deleteAllFiles(drive, parentId);

    await showAllFiles(drive);

    //console.log(`RESULT - ${res.status} | ${res.statusText}`);
  } catch (err) {
    console.log("ERROR - ", err.message);
  }
})();
