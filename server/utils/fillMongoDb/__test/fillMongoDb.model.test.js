import { createTags, tags } from "../dataGenerators/tags";
import { createPhotos } from "../dataGenerators/photos";
import { fillDb, insertTags, insertPhotos, getTagsIds } from "../mongo";
import {
  fillWithFakeData,
  fillRealTagsAndFakePhoto,
  fillRealTagsNoPhoto,
} from "../fillMongoDb.model";

jest.mock("./../mongo", () => {
  return {
    __esModule: true,
    fillDb: jest.fn(),
    insertPhotos: jest.fn(),
    insertTags: jest.fn(),
    getTagsIds: jest.fn(),
  };
});

jest.mock("./../dataGenerators/tags", () => {
  const originalModule = jest.requireActual("./../dataGenerators/tags");

  return {
    __esModule: true,
    ...originalModule,
    createTags: jest.fn().mockReturnValue({ tags: "tags", tagsId: [23, 45] }),
  };
});

jest.mock("./../dataGenerators/photos", () => {
  return {
    __esModule: true,
    createPhotos: jest.fn().mockReturnValue("photos"),
  };
});

describe("model", () => {
  describe("fillWithFakeData", () => {
    test("It must call createTags and createPhotos and then fillDb", () => {
      fillWithFakeData(10, 23);

      expect(createTags).toHaveBeenCalledTimes(1);
      expect(createTags).toHaveBeenCalledWith(10);

      expect(createPhotos).toHaveBeenCalledTimes(1);
      expect(createPhotos).toHaveBeenCalledWith(23, [23, 45]);

      expect(fillDb).toHaveBeenCalledTimes(1);
      expect(fillDb).toHaveBeenCalledWith("tags", "photos");
    });
  });
});
