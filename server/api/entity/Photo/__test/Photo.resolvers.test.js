import fs from "fs";
import { resolve } from "path";
import {
  photoUpload,
  dateValidate,
  tagsValidate,
  validate,
} from "./../Photo.resolvers";
import { pathToUploadPhotoFileDir } from "./../config";

describe("Photo.resolvers", () => {
  describe("Validation", () => {
    test("validate", () => {
      expect(validate(undefined, undefined, undefined)).toEqual("");

      expect(() => {
        expect(validate("hello", undefined, undefined)).toEqual("");
      }).toThrowError("Некорректная дата.");

      expect(validate(new Date(), "hello", ["one2DFG", "two123"])).toEqual(
        "hello"
      );
    });

    test("isData", () => {
      const today = new Date();
      expect(dateValidate(today)).toEqual(true);

      const t = new Date("hello");
      expect(dateValidate(t)).toEqual(false);

      const birth = new Date(2018, 6, 8);
      expect(dateValidate(birth)).toEqual(true);

      const m = new Date("Do NOT Convert Me as a date 1");
      expect(dateValidate(m)).toEqual(false);

      // expect(birth.toString()).toEqual("h");
      // expect(m.getTime()).toEqual("h");
      // expect(isDate(today)).toEqual(true);
      // expect(today.getTime()).toEqual("hello");
    });

    test("tagsValidate", () => {
      let tags = [];
      expect(tagsValidate(tags)).toEqual(false);

      tags = "hello";
      expect(tagsValidate(tags)).toEqual(false);

      tags = 13;
      expect(tagsValidate(tags)).toEqual(false);

      tags = [12, "hello", {}];
      expect(tagsValidate(tags)).toEqual(false);

      tags = ["bye", "hello", true];
      expect(tagsValidate(tags)).toEqual(false);

      tags = ["bye", "hello", "fuck1!!"];
      expect(tagsValidate(tags)).toEqual(false);

      tags = ["bye", "<p>hello</p>", "fuck"];
      expect(tagsValidate(tags)).toEqual(false);

      tags = ["bye", "123NM6575hello", "fuck"];
      expect(tagsValidate(tags)).toEqual(true);
    });
  });
});
