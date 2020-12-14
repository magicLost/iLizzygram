import { IPhoto } from "./../../types";
import image1 from "./../../../static/images/image2.jpeg";
import image2 from "./../../../static/images/image7.jpeg";
import image3 from "./../../../static/images/ladki.jpg";
import { TPhotosData } from "../types";

const pathToStaticImagesDir = `file:///home/nikki/Documents/Project/lizzygram/gatsby/static/images`;
const base64 =
  "/9j/4AAQSkZJRgABAQAAAQABAAD/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAAAdwEA6AMAAAB3AQDoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAADIAAAADoAQAAQAAAB8AAAAAAAAA/9sAQwAQCwwODAoQDg0OEhEQExgoGhgWFhgxIyUdKDozPTw5Mzg3QEhcTkBEV0U3OFBtUVdfYmdoZz5NcXlwZHhcZWdj/9sAQwEREhIYFRgvGhovY0I4QmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Nj/8AAEQgAHwAyAwEiAAIRAQMRAf/EABoAAAIDAQEAAAAAAAAAAAAAAAUGAAMHAgT/xAAtEAABAwIEAwcFAQAAAAAAAAABAAIDBBEFEiExBhSRFSIyQUJTYRNSVIGSgv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwB4bNEdpWH/AEF3nZ9zeqxsVdSDcTyf0rBiFZa3MydUGvmWMbyNH7XBq6cHWaP+lk089W0tzVL3ZhfRytpqaqqY3y/VcGM3u46oG3i9zarlRG9skebvAG6I4LV0NHh7YjUMbY7E7JED53xZIjkb8nVUyYfL4jI3X5Qaf2tQflR9VFlfJP8Adb1UQOEXBFN65nFelvBVABq5xR+N4srQ5AvycG0LwLOcCNkJxjDBg9M5lMTJfvPv5BO5Jtpul6UcxJXU9SLyhhNxtZAiSv0uNL7L24ayknDmVMpY/wBKF1DznyeTSQFW5xJHwgO9lwe8FEIEz7eIqIP/2Q==";

const photos: IPhoto[] = [
  {
    _timestamp: new Date(2018, 11, 23),
    files: ["hello.jpb"],
    base64,
    aspectRatio: 1.6,
    src: image3,
    iconSrc: image3,
    srcSet: image3,
    date: new Date(2018, 11, 17),
    description: "street1.jpg",
    tags: { id1: true },
    yearsOld: 0,
    googleDriveId: "",
    addedByUserUID: "user13",
    isActive: true,
  },
  {
    _timestamp: new Date(2018, 10, 28),
    files: ["hell.jpj"],
    base64,
    aspectRatio: 0.75,
    /* src: `${pathToStaticImagesDir}/image7.jpeg`,
    iconSrc: `${pathToStaticImagesDir}/image7.jpeg`,
    srcSet: `${pathToStaticImagesDir}/image7.jpeg`, */
    src: image1,
    iconSrc: image1,
    srcSet: image1,
    date: new Date(2018, 10, 23),
    description: "street2.jpg",
    tags: { id1: true },
    yearsOld: 0,
    googleDriveId: "",
    addedByUserUID: "user12",
    isActive: true,
  },

  {
    _timestamp: new Date(2019, 9, 25),
    files: ["h.png"],
    base64,
    aspectRatio: 0.75,
    src: image2,
    iconSrc: image2,
    srcSet: image2,
    date: new Date(2019, 9, 23),
    description: "street3.jpg",
    tags: { id1: true },
    yearsOld: 1,
    googleDriveId: "",
    addedByUserUID: "user13",
    isActive: true,
  },
];

export const photosData: TPhotosData = new Map([
  ["1234567890", photos[0]],
  ["5674567890", photos[1]],
  ["0004567890", photos[2]],
]);
