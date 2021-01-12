import path from "path";

import { connect, disconnect, deleteData } from "./mongo";
import {
  fillWithFakeData,
  fillRealTagsAndFakePhoto,
  fillRealTagsNoPhoto,
} from "./fillMongoDb.model";

//if we have args to equals --fake-all
//we insert fake tags and take photos

//if we have args to equals --fake
//we insert into db our real tags
//then we get all tags ids
//and make some fake photos for example

//if we have args to equals --real
//we insert into db our real tags

export const run = async (dbName: string = "lizzygram") => {
  await connect(dbName);

  await deleteData();

  //console.log("AAAAAAAAAAAA", process.argv);

  const arg = process.argv[2];

  //if (arg === "--real") await fillRealTagsNoPhoto();

  switch (arg) {
    case "--fake-all":
      await fillWithFakeData(30, 30);
      break;
    case "--fake-photo":
      await fillRealTagsAndFakePhoto(30);
      break;
    case "--real":
      await fillRealTagsNoPhoto();
      break;

    default:
      new Error(`What the fuck ${arg}`);
  }

  await disconnect();
};

run();
