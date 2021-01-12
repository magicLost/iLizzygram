import { generatePhotos } from "./photos";
import { resolve } from "path";
import { path as rootPath } from "app-root-path";

describe("Data generator photos", () => {
  test("", () => {
    //const res = generatePhotos(5);

    //expect(res).toEqual("hello");

    const path = resolve(
      rootPath,
      "src",
      "photos",
      "helper",
      "dataGenerator",
      "tags.data.ts"
    );

    expect(path).toEqual("path");
  });
});
