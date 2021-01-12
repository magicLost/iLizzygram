import { getCredentials, getDrive } from "..";
import { readFile, writeFile, existsSync } from "fs";
import { promisify } from "util";
import { join } from "path";
import { GoogleDriveController } from "..";
import { Test } from "../googleDrive.controller";

describe("Google drive", () => {
  test("GoogleDriveController export", () => {
    const ctrl = new GoogleDriveController([""], "/path");
    expect(ctrl).toBeInstanceOf(GoogleDriveController);
  });

  /* test("getCredentials - it must load file with credentials", async () => {
    const credentials = await getCredentials();

    expect(credentials.project_id).toEqual("lizzigram-1600291187801");
  });

  test("getDrive - it must return drive object with auth", async () => {
    const drive = await getDrive();

    const res = await drive.files.list({
      pageSize: 2,
      //files: "nextPageToken, files(id, name)",
    });

    //const res = await fetch("https://google.com/");
    //const body = await res.text();

    //expect(body).toEqual("hello");

    const files = res.data.files;

    expect(files.length).toEqual(2);
  });
 */
  /*  test("fs", async () => {
    //const map = new Map();
    //map.set("mongoIds", "photoIds");

    let info = await promisify(readFile)(
      join(__dirname, "data", "photoInfo.json"),
      { encoding: "utf-8" }
    );

    info = JSON.parse(info);

    const infoMap = new Map(info);

    expect(infoMap.get("mongoIds")).toEqual("photoIds");

    infoMap.set("someMongoId12343", "somePhotoDriveId123424");
    infoMap.set("someMongoId66778", "somePhotoDriveId009900");

    const data = JSON.stringify([...infoMap]);

    //expect(data).toEqual("hello");

    promisify(writeFile)(join(__dirname, "data", "photoInfo.json"), data, {
      encoding: "utf-8",
    });

    expect(existsSync(join(__dirname, "data", "photoInfo.json"))).toEqual(true);
  }); */
});
