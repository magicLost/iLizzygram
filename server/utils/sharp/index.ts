import sharp, { Sharp } from "sharp";
import { resolve } from "path";
import { promisify } from "util";
import fs from "fs";

//type SHARP_WIDTH = 400 | 800 | 1600 | 2000;

export const makeJpgsByWidths = async (
  pathToOriginalFile: string,
  pathsFS: Map<number, string>
) => {
  //const pathToResult = resolve(__dirname);
  let quality = 50;

  //const paths = new Map<number, string>();

  const promises = [];

  //for await (let width of widths) {
  for (let width of pathsFS.keys()) {
    switch (width) {
      case 400:
        quality = 50;
        break;
      case 800:
        quality = 50;
        break;
      case 1200:
        quality = 35;
        break;
      case 1600:
        quality = 35;
        break;
      case 1900:
        quality = 35;
        break;
    }

    //paths.set(width, `${pathToResultDir}/${name}-${width}.jpg`);

    promises.push(
      sharp(pathToOriginalFile)
        .resize({ width: width })
        .jpeg({ quality: quality })
        .toFile(pathsFS.get(width))
    );
  }

  return Promise.all(promises);
};

/* export const makeJpgsByWidths = async (
  pathToOriginalFile,
  pathToResultDir,
  name,
  widths
) => {
  //const pathToResult = resolve(__dirname);
  let quality = 50;

  const paths = new Map<number, string>();

  const promises = [];

  //for await (let width of widths) {
  for (let width of widths) {
    switch (width) {
      case 400:
        quality = 50;
        break;
      case 800:
        quality = 50;
        break;
      case 1200:
        quality = 35;
        break;
      case 1600:
        quality = 35;
        break;
      case 1900:
        quality = 35;
        break;
    }

    paths.set(width, `${pathToResultDir}/${name}-${width}.jpg`);

    promises.push(
      sharp(pathToOriginalFile)
        .resize({ width: width })
        .jpeg({ quality: quality })
        .toFile(`${pathToResultDir}/${name}-${width}.jpg`)
    );
  }

  await Promise.all(promises);

  return paths;
}; */

export const makeProgressiveJpeg = async (pathh: string, name: string) => {
  const pathToResult = resolve(__dirname);
  sharp(pathh)
    .jpeg({ quality: 50, progressive: true })
    .toFile(`${pathToResult}/${name}-progressive.jpg`);
};

export const base64 = async (image: Sharp) => {
  try {
    //const image = sharp(path);
    //const pathToResult = resolve(__dirname, "base64.jpg");
    const encode = await image
      .jpeg({ quality: 25 })
      .resize({ width: 50 })
      .blur()
      .toBuffer();
    //.toFile(pathToResult);
    //const file = await promisify(fs.readFile)(path);
    //const encode = Buffer.from(file).toString("base64");
    return encode.toString("base64");
    //return encode;
  } catch (err) {
    console.log("[ERROR]", err.message);
  }
};

export const getBase64AndAspectRatio = async (path: string) => {
  const image = sharp(path);
  const base64String = await base64(image);

  const metadata = await image.metadata();

  return {
    base64String,
    aspectRatio: Math.round((metadata.width / metadata.height) * 100) / 100,
  };
};

/* const imagePath1 = resolve(
  __dirname,
  "./../../utils/sharp/images/freestocks-9U.jpg"
);
const imagePath2 = resolve(
  __dirname,
  "./../../utils/sharp/images/girl_600.jpeg"
); */

//base64(imagePath1);
//base64(imagePath2);

//makeProgressiveJpeg(imagePath1, "freestocks-9U");

//makeJpgs(imagePath, "sad-girl", [400, 800, 1200, 1600, 1900]);
