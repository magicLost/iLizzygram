//const cloudinary = require("cloudinary").v2;
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { join } from "path";
import dotenv from "dotenv";
import { path as rootPath } from "app-root-path";

dotenv.config({ path: join(rootPath, ".env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImage = (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};

//srcSet  Map<widthOfPhoto, pathToPhoto>
export const uploadImagesByDifferentWidths = async (
  photosDiffWidths: Map<number, string>
) => {
  const cloudinaryPhotosInfoDiffWidths = new Map<number, UploadApiResponse>();
  const imagesPromises = [];

  //@ts-ignore
  for (let width of photosDiffWidths.keys()) {
    let image = cloudinary.uploader.upload(photosDiffWidths.get(width), {
      tags: "lizzygram",
    });

    imagesPromises.push(image);
  }

  const imagesInfo = await Promise.all(imagesPromises);

  let i = 0;
  //@ts-ignore
  for (let width of photosDiffWidths.keys()) {
    cloudinaryPhotosInfoDiffWidths.set(width, imagesInfo[i]);
    i++;
  }

  return cloudinaryPhotosInfoDiffWidths;
};

/* TEST DELETE 
deleteImage("f1ik44v0dzks8reeircz")
  .then((res) => {
    console.log("SUCCESS DELETED - f1ik44v0dzks8reeircz", res);
  })
  .catch((err) => {
    console.log("DELETE ERROR ", err.message);
  });

/* TEST UPLOAD IMAGES

/* const photosDiffWidths = new Map([
  [
    400,
    join(
      rootPath,
      "public",
      "images",
      "386518885a4da11cdc9e3eb8d4109e2f-1200.jpg"
    ),
  ],
  [
    800,
    join(
      rootPath,
      "public",
      "images",
      "556f582ddac2296f8fb83a69cef496dfb7d7807657b2e0bc7dc58b0d817d2061-1600.jpg"
    ),
  ],
]);

uploadImagesByDifferentWidths(photosDiffWidths)
  .then((res) => {
    console.log("PHOTO 400 WIDTH - ", res.get(400).public_id);
    console.log("PHOTO 800 WIDTH - ", res.get(800).public_id);
  })
  .catch((err) => console.log("CLOUDINARY UPLOAD ERROR", err.message));
 */
