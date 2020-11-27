import { photosCollection } from "../../../container/ReduxWrapper";
import axios from "axios";
import { makeNewPhotoStateItems, makePhotoFormData } from "./helper";
import { makeAddPhotoData, makeEditPhotoData, isInSearchTerms } from "../utils";
import {
  addPhotoToFirestoreAC,
  editPhotoToFirestoreAC,
  addPhotoStartRequestAC,
  addPhotoRequestSuccessAC,
  addPhotoRequestErrorAC,
  editPhotoStartRequestAC,
  editPhotoRequestSuccessAC,
  editPhotoRequestErrorAC,
} from "./photos";

jest.mock("axios", () => {
  return {
    __esModule: true,
    default: {
      post: jest.fn(() =>
        Promise.resolve({
          data: {
            status: "error",
          },
        })
      ),
    },
  };
});

jest.mock("./photos", () => {
  const originalModule = jest.requireActual("./photos");

  return {
    __esModule: true,

    ...originalModule,

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
    set: jest.fn(() => Promise.resolve()),
    update: jest.fn(() => Promise.resolve()),
  };

  return {
    __esModule: true,
    photosCollection: collection,
  };
});

jest.mock("./helper", () => {
  return {
    __esModule: true,
    makePhotoFormData: jest.fn(),
  };
});

jest.mock("../utils", () => {
  return {
    __esModule: true,
    makeAddPhotoData: jest.fn(() => ({})),
    makeEditPhotoData: jest.fn(() => ({})),
    isInSearchTerms: jest.fn(() => true),
  };
});

const dispatch = action => {
  console.log("ACTION", JSON.stringify(action));
  return action;
};

describe("addPhotoToFirestoreAC", () => {
  afterEach(() => {
    addPhotoStartRequestAC.mockClear();
    addPhotoRequestSuccessAC.mockClear();
    addPhotoRequestErrorAC.mockClear();

    editPhotoStartRequestAC.mockClear();
    editPhotoRequestSuccessAC.mockClear();
    editPhotoRequestErrorAC.mockClear();
  });
  /* photoFormData: IAddPhotoFormData,
  userUid: string,
  onSuccess?: any,
  onError?: any
  
  dispatch
  */
  test("", async () => {
    /*  const res = await axios.post();

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(res.data.status).toEqual("error"); */

    photosCollection.set = jest.fn(() => Promise.reject());

    await addPhotoToFirestoreAC({
      date: new Date(),
    })(dispatch);

    //expect(addPhotoStartRequestAC).toHaveBeenCalledTimes(1);

    expect(makeAddPhotoData).toHaveBeenCalledTimes(1);

    expect(photosCollection.set).toHaveBeenCalledTimes(1);

    expect(makePhotoFormData).toHaveBeenCalledTimes(0);

    expect(addPhotoRequestErrorAC).toHaveBeenCalledTimes(1);
  });
});
