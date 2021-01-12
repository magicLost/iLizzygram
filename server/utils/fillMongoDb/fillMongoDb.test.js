import { connect, disconnect, deleteData } from "./mongo";
import { run } from ".";
import {
  fillWithFakeData,
  fillRealTagsAndFakePhoto,
  fillRealTagsNoPhoto,
} from "./fillMongoDb.model";

jest.mock("./fillMongoDb.model", () => {
  return {
    __esModule: true,
    fillWithFakeData: jest.fn(),
    fillRealTagsAndFakePhoto: jest.fn(),
    fillRealTagsNoPhoto: jest.fn(),
  };
});

jest.mock("./mongo", () => {
  return {
    __esModule: true,
    connect: jest.fn(),
    disconnect: jest.fn(),
    deleteData: jest.fn(),
  };
});

describe("Fill db", () => {
  beforeAll(async () => {
    //await connect("test-fake-data");
  });

  afterEach(async () => {
    //await mongoose.connection.dropDatabase();
    //await disconnect();
    fillWithFakeData.mockClear();
    fillRealTagsAndFakePhoto.mockClear();
    fillRealTagsNoPhoto.mockClear();

    deleteData.mockClear();
    connect.mockClear();
    disconnect.mockClear();
  });

  /* test("Connection", () => {
    expect(mongoose.version).toEqual("5.9.19");
  }); */

  test("Run with --real", async () => {
    global.process.argv = ["", "", "--real"];

    await run();

    expect(connect).toHaveBeenCalledTimes(1);
    expect(deleteData).toHaveBeenCalledTimes(1);

    expect(fillWithFakeData).toHaveBeenCalledTimes(0);
    expect(fillRealTagsAndFakePhoto).toHaveBeenCalledTimes(0);
    expect(fillRealTagsNoPhoto).toHaveBeenCalledTimes(1);

    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  test("Run with --fake-all", async () => {
    global.process.argv = ["", "", "--fake-all"];

    await run();

    expect(connect).toHaveBeenCalledTimes(1);
    expect(deleteData).toHaveBeenCalledTimes(1);

    expect(fillWithFakeData).toHaveBeenCalledTimes(1);
    expect(fillRealTagsAndFakePhoto).toHaveBeenCalledTimes(0);
    expect(fillRealTagsNoPhoto).toHaveBeenCalledTimes(0);

    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  test("Run with --fake-photo", async () => {
    global.process.argv = ["", "", "--fake-photo"];

    await run();

    expect(connect).toHaveBeenCalledTimes(1);
    expect(deleteData).toHaveBeenCalledTimes(1);

    expect(fillWithFakeData).toHaveBeenCalledTimes(0);
    expect(fillRealTagsAndFakePhoto).toHaveBeenCalledTimes(1);
    expect(fillRealTagsNoPhoto).toHaveBeenCalledTimes(0);

    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
