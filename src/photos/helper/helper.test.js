import { make } from ".";
import { generatePhotos } from "./dataGenerator/photos";

/* 
describe("make", () => {
  const res = make(["id1", "id2", "id3", "id4", "id5", "id6"]);

  expect(res).toEqual("ello");
}); */

const tagsIds = [
  "Hrj1grEKx6oM9Z1ZGP0G",
  "L45RiBaK18AEoyVekFQT",
  "Pa8GvtwrT1tMDgNLwy4S",
  "Ql2r2DFzzjZnzP2adh9Z",
  "YBa0wyeWwEB6takyExmF",
  "YxX09wTx6kWOfZQ0ORFs",
  "cdbI7sOCFVFv337chtBE",
];

describe("generatePhotos", () => {
  const photos = generatePhotos(2, tagsIds);

  const res = [];

  let cnt = 0;

  photos.forEach((photo, id) => {
    res[cnt] = [id, photo];
    cnt++;
  });

  expect(res).toEqual("ello");
});
