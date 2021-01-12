import { getPhoto, createPhotos } from "./photos";

const tagsIds = [
  "hello",
  "bye",
  "end",
  "start",
  "freak",
  "black",
  "seven",
  "ten",
  "hello2",
  "bye2",
  "end2",
  "start2",
  "freak2",
  "black2",
  "seven2",
  "ten2",
];

describe("getPhoto", () => {
  test("It must create photo object", () => {
    const photo = getPhoto(1234456677, [1, 3, 5, 7], tagsIds);

    expect(photo.tags).toEqual(["bye", "start", "black", "ten"]);
    expect(photo._timestamp).toEqual(1234456677);
    //expect(photo._id).toEqual("id-1234");
  });
});

describe("createPhotos", () => {
  test("It must create photos objects", () => {
    const photos = createPhotos(10, tagsIds);

    expect(photos).toHaveLength(10);
    //expect(JSON.stringify(photos[3])).toEqual("hello");
    //expect(photo._timestamp).toEqual(1234456677);
    //expect(photo._id).toEqual("id-1234");
  });
});
