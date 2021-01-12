import { google, drive_v3 } from "googleapis";
import { join } from "path";
import { path as rootPath } from "app-root-path";
import { readFile, createWriteStream, createReadStream } from "fs";
import { promisify } from "util";

export const parentId = "1wTRcXEhl_gZ2Ppb6c2RO19M0qeG9xI6P";
export const credentialsFileName = "lizzigram-1600291187801-3964f05f8a31.json";

export const getCredentials = async () => {
  return JSON.parse(
    await promisify(readFile)(
      join(rootPath, "credentials", credentialsFileName),
      { encoding: "utf-8" }
    )
  );
};

export const getDrive = async () => {
  const credentials = await getCredentials();

  const client = await google.auth.getClient({
    credentials,
    scopes: "https://www.googleapis.com/auth/drive",
  });

  return google.drive({
    version: "v3",
    auth: client,
  });
};

export const getAllFiles = async (
  drive: drive_v3.Drive,
  limit: number = 10
) => {
  const res = await drive.files.list({
    pageSize: limit,
    //files: "nextPageToken, files(id, name)",
  });

  return res.data.files;
};

export const showAllFiles = async (
  drive: drive_v3.Drive,
  limit: number = 10
) => {
  const files = await getAllFiles(drive, limit);

  if (files.length === 0) {
    console.log("No files found.");
  } else {
    console.log("Files:");
    for (const file of files) {
      //console.log(`${file.name} (${file.id})`);
      console.log(` - File - ${file.name} | ${file.id} | ${file.mimeType}`);
    }
  }
};

export const downloadImageFromDrive = async (
  drive: drive_v3.Drive,
  fileId: string
) => {
  let progress = 0;

  const destPath = join(__dirname, "stewart.jpg");

  const dest = createWriteStream(destPath);

  const res: any = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  return new Promise((resolve, reject) => {
    res.data
      .on("end", () => {
        console.log("Done downloading file.");
        resolve(destPath);
      })
      .on("error", (err) => {
        console.error("Error downloading file.");
        reject(err);
      })
      .on("data", (d) => {
        progress += d.length;
        if (process.stdout.isTTY) {
          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
          process.stdout.write(`Downloaded ${progress} bytes`);
        }
      })
      .pipe(dest);
  });

  /*  drive.files.export(
    {
      fileId,
      mimeType: "image/jpeg",
    },
    (err, response) => {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }
      //console.log('Received %d bytes', response.length);
      //writeFileSync(dest, response);
      (response.data as any).pipe(dest);
    }
  ); */
};

export const createTextFile = async (
  drive: drive_v3.Drive,
  fileName: string,
  text: string,
  parents?: string[]
) => {
  return drive.files.create({
    requestBody: {
      name: fileName,
      parents,
      mimeType: "text/plain",
    },

    media: {
      mimeType: "text/plain",
      body: text,
    },
  });

  /* console.log(
    `Response - ${JSON.stringify(res.data.name)} | ${JSON.stringify(
      res.data.id
    )}`
  ); */
};

export const uploadImageToDrive = async (
  drive: drive_v3.Drive,
  fileName: string,
  pathToPhoto: string,
  mimeType: string = "image/jpeg",
  parents?: string[]
) => {
  return drive.files.create({
    requestBody: {
      parents,
      name: fileName,
      mimeType,
    },
    media: {
      mimeType,
      body: createReadStream(pathToPhoto),
    },
  });
};

export const updateImageFile = async (
  drive: drive_v3.Drive,
  fileId: string,
  pathToPhotoFile: string,
  mimeType: string = "image/jpeg"
) => {
  return drive.files.update({
    fileId,
    media: {
      mimeType,
      body: createReadStream(pathToPhotoFile),
    },
  });

  //console.log(`Response - ${JSON.stringify(res)}`);
};

export const deleteFile = async (drive: drive_v3.Drive, fileId: string) => {
  return drive.files.delete({
    fileId,
  });

  //console.log(`Response - ${JSON.stringify(res)}`);
};

export const deleteAllFiles = async (
  drive: drive_v3.Drive,
  parentId: string
) => {
  const files = await getAllFiles(drive, 100);

  const promises = [];

  if (files.length === 0) {
    console.log("No files found.");
  } else {
    //console.log("Files:");
    for (const file of files) {
      //console.log(`${file.name} (${file.id})`);
      //console.log(` - File - ${file.name} | ${file.id} | ${file.mimeType}`);
      if (file.id === parentId) continue;

      promises.push(drive.files.delete({ fileId: file.id }));
      //console.log(` - Deleted - ${file.name} | ${file.id} | ${file.mimeType}`);
    }

    await Promise.all(promises);

    console.log(`Deleted ${files.length - 1} files`);
  }
};

/* 
export const uploadImageToDrive = async (
  drive: drive_v3.Drive,
  fileName: string,
  pathToPhoto: string,
  mimeType: string = "image/jpeg",
  parents?: string[]
) => {
  const fileSize = statSync(pathToPhoto).size;

  return new Promise((resolve, reject) => {
    drive.files
      .create(
        {
          requestBody: {
            parents,
            name: fileName,
            mimeType,
          },
          media: {
            mimeType,
            body: createReadStream(pathToPhoto),
          },
        },
        {
          onUploadProgress: (evt) => {
            console.log("onUploadProgress", evt.bytesRead, fileSize);
            if (evt.bytesRead >= fileSize) {
              resolve("SUCCESS");
            }
          },
        }
      )
      .then((res) => console.log(`Response`))
      .catch((err) => {
        //console.log(`ERROR RESPONSE - ${JSON.stringify(err)}`);
        reject(err);
      });
  });
};

*/
