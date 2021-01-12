import * as faker from "faker";
import { TTagsFirestoreResponse } from "./../../../store/types";
/* import { writeFile } from "fs";
import { promisify } from "util";
import { resolve } from "path";
import { path as rootPath } from "app-root-path"; */

/* const tags = [
  { id: "Hrj1grEKx6oM9Z1ZGP0G", title: "зюганов", name: "zuganov" },
  { id: "L45RiBaK18AEoyVekFQT", name: "pets", title: "с животными" },
  { id: "Pa8GvtwrT1tMDgNLwy4S", title: "на улице", name: "street" },
  { id: "Ql2r2DFzzjZnzP2adh9Z", name: "smile", title: "улыбка" },
  {
    id: "YBa0wyeWwEB6takyExmF",
    title: "задумчиво",
    name: "thoughtfully",
  },
  { id: "YxX09wTx6kWOfZQ0ORFs", title: "дома", name: "home" },
  { id: "cdbI7sOCFVFv337chtBE", title: "на природе", name: "nature" },
]; */

/* export const saveTags = (tags: ITagFirestore[]) => {
  return promisify(writeFile)(
    resolve(
      rootPath,
      "src",
      "photos",
      "helper",
      "dataGenerator",
      "tags.data.ts"
    ),
    JSON.stringify(tags),
    { encoding: "utf-8" }
  );
}; */

export const getTagsIds = (tags: Map<string, any>) => {
  const res = [];
  tags.forEach((data, id) => {
    res.push(id);
  });
  return res;
};

export const generateUniqueTagsIds = (
  tagsIds: string[],
  length: number
): Set<string> => {
  const idsSet = new Set<string>();

  while (idsSet.size < length) {
    let id = tagsIds[faker.random.number({ min: 0, max: 6 })];
    idsSet.add(id);
  }

  return idsSet;
};

export const setTagsFirestoreObj = (
  uniqueTagsIds: Set<string>
): { [tagId: string]: boolean } => {
  const result = {};
  //@ts-ignore
  for (let item of uniqueTagsIds) {
    result[item] = true;
  }

  return result;
};
