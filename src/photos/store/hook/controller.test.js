import { photosCollection } from "../../../container/ReduxWrapper";
import axios from "axios";
import {
  makeNewPhotoStateItems,
  makePhotoFormData,
  makeAddPhotoData,
  makeEditPhotoData,
  isInSearchTerms,
} from "./helper/DataHelper";

import {
  addPhotoStartRequestAC,
  addPhotoRequestSuccessAC,
  addPhotoRequestErrorAC,
  editPhotoStartRequestAC,
  editPhotoRequestSuccessAC,
  editPhotoRequestErrorAC,
} from "../action/photos";

import { saveNewPhoto, saveEditedPhoto } from "./controller";

jest.mock("axios", () => {
  return {
    __esModule: true,
    default: {
      post: jest.fn(() =>
        Promise.resolve({
          data: {
            status: "success",
          },
        })
      ),
    },
  };
});

jest.mock("../action/photos", () => {
  //const originalModule = jest.requireActual("../store/action/photos");

  return {
    __esModule: true,

    //...originalModule,

    addPhotoStartRequestAC: jest.fn(),
    addPhotoRequestSuccessAC: jest.fn(),
    addPhotoRequestErrorAC: jest.fn(),

    editPhotoStartRequestAC: jest.fn(),
    editPhotoRequestSuccessAC: jest.fn(),
    editPhotoRequestErrorAC: jest.fn(),
  };
});

jest.mock("../../../container/ReduxWrapper", () => {
  const collection = {
    doc: () => collection,
    set: jest.fn(),
    update: jest.fn(),
  };

  return {
    __esModule: true,
    photosCollection: collection,
  };
});

jest.mock("./helper/DataHelper", () => {
  return {
    __esModule: true,
    makePhotoFormData: jest.fn(),
    makeAddPhotoData: jest.fn(() => ({})),
    makeEditPhotoData: jest.fn(),
    isInSearchTerms: jest.fn(),
  };
});

const dispatch = action => {
  //console.log("ACTION", JSON.stringify(action));
  return;
};

const onSuccess = jest.fn();

describe("PhotosController", () => {
  afterEach(() => {
    addPhotoStartRequestAC.mockClear();
    addPhotoRequestSuccessAC.mockClear();
    addPhotoRequestErrorAC.mockClear();

    editPhotoStartRequestAC.mockClear();
    editPhotoRequestSuccessAC.mockClear();
    editPhotoRequestErrorAC.mockClear();

    makeAddPhotoData.mockClear();
    makeEditPhotoData.mockClear();

    isInSearchTerms.mockClear();

    makePhotoFormData.mockClear();

    onSuccess.mockClear();

    photosCollection.set.mockClear();
    photosCollection.update.mockClear();

    axios.post.mockClear();
  });

  describe("saveNewPhoto", () => {
    test("If we can not set to firestore - set error state", async () => {
      /*  const res = await axios.post();
  
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(res.data.status).toEqual("error"); */

      photosCollection.set.mockReturnValue(Promise.reject());

      await saveNewPhoto(dispatch, {
        date: new Date(),
        photoFile: ["file"],
      });

      expect(addPhotoStartRequestAC).toHaveBeenCalledTimes(1);

      expect(makeAddPhotoData).toHaveBeenCalledTimes(1);

      expect(photosCollection.set).toHaveBeenCalledTimes(1);

      expect(makePhotoFormData).toHaveBeenCalledTimes(0);

      expect(addPhotoRequestErrorAC).toHaveBeenCalledTimes(1);
    });

    test("Success", async () => {
      /*  const res = await axios.post();
  
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(res.data.status).toEqual("error"); */

      photosCollection.set.mockReturnValue(Promise.resolve(true));

      await saveNewPhoto(
        dispatch,
        {
          date: new Date(),
          photoFile: ["file"],
        },
        "userUId",
        onSuccess
      );

      expect(addPhotoStartRequestAC).toHaveBeenCalledTimes(1);

      expect(makeAddPhotoData).toHaveBeenCalledTimes(1);

      expect(photosCollection.set).toHaveBeenCalledTimes(1);

      expect(makePhotoFormData).toHaveBeenCalledTimes(1);

      expect(axios.post).toHaveBeenCalledTimes(1);

      expect(addPhotoRequestSuccessAC).toHaveBeenCalledTimes(1);

      expect(onSuccess).toHaveBeenCalledTimes(1);

      expect(addPhotoRequestErrorAC).toHaveBeenCalledTimes(0);
    });
  });

  describe("saveEditedPhoto", () => {
    test("If we can not update to firestore - set error state", async () => {
      /*  const res = await axios.post();
  
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(res.data.status).toEqual("error"); */

      makeEditPhotoData.mockReturnValue({ hello: "hello" });
      photosCollection.update.mockReturnValue(Promise.reject());

      await saveEditedPhoto(
        dispatch,
        "someId",
        {
          date: new Date(),
          photoFile: ["file"],
        },
        "userUId",
        onSuccess
      );

      expect(editPhotoStartRequestAC).toHaveBeenCalledTimes(1);

      expect(makeEditPhotoData).toHaveBeenCalledTimes(1);

      expect(photosCollection.update).toHaveBeenCalledTimes(1);

      expect(makePhotoFormData).toHaveBeenCalledTimes(0);

      expect(isInSearchTerms).toHaveBeenCalledTimes(0);

      expect(editPhotoRequestErrorAC).toHaveBeenCalledTimes(1);
    });

    test("If we don't change file, we only update firestore record", async () => {
      /*  const res = await axios.post();
  
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(res.data.status).toEqual("error"); */

      makeEditPhotoData.mockReturnValue({ hello: "hello" });
      photosCollection.update.mockReturnValue(Promise.resolve());
      isInSearchTerms.mockReturnValue(true);

      await saveEditedPhoto(
        dispatch,
        "someId",
        {
          date: new Date(),
          //photoFile: ["file"],
        },
        {},
        "userUId",
        onSuccess
      );

      expect(editPhotoStartRequestAC).toHaveBeenCalledTimes(1);

      expect(makeEditPhotoData).toHaveBeenCalledTimes(1);

      expect(photosCollection.update).toHaveBeenCalledTimes(1);

      expect(makePhotoFormData).toHaveBeenCalledTimes(0);

      expect(axios.post).toHaveBeenCalledTimes(0);

      expect(isInSearchTerms).toHaveBeenCalledTimes(1);

      expect(editPhotoRequestSuccessAC).toHaveBeenCalledTimes(1);

      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    test("If we change only file, we do not send update to firestore and send file to express", async () => {
      /*  const res = await axios.post();
  
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(res.data.status).toEqual("error"); */

      makeEditPhotoData.mockReturnValue({});
      photosCollection.update.mockReturnValue(Promise.resolve());
      isInSearchTerms.mockReturnValue(true);

      await saveEditedPhoto(
        dispatch,
        "someId",
        {
          //date: new Date(),
          photoFile: ["file"],
        },
        {},
        "userUId",
        onSuccess
      );

      expect(editPhotoStartRequestAC).toHaveBeenCalledTimes(1);

      expect(makeEditPhotoData).toHaveBeenCalledTimes(1);

      expect(photosCollection.update).toHaveBeenCalledTimes(0);

      expect(makePhotoFormData).toHaveBeenCalledTimes(1);

      expect(axios.post).toHaveBeenCalledTimes(1);

      expect(isInSearchTerms).toHaveBeenCalledTimes(1);

      expect(editPhotoRequestSuccessAC).toHaveBeenCalledTimes(1);

      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
