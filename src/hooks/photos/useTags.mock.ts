import { TAGS } from "./useTags";

export const tagsData = [
  { _id: "123wsdf347423", title: "на улице", name: "street" },
  { _id: "123wsdf343423", title: "улыбка", name: "smile" },
  { _id: "123wsdd343423", title: "дача", name: "dacha" },
  { _id: "123wsdfj43423", title: "на природе", name: "nature" },
  { _id: "123wsdf34df23", title: "дома", name: "home" },
  { _id: "12wwsdf343423", title: "с петами", name: "pets" },
];

export const mockQueriesData = [
  {
    request: {
      query: TAGS,
    },
    result: {
      data: {
        tags: tagsData,
      },
    },
  },
];

export const tagsState = {
  "123wsdf347423": false,
  "123wsdf343423": false,
  "123wsdd343423": false,
  "123wsdfj43423": false,
  "123wsdf34df23": false,
  "12wwsdf343423": false,
};

export const defaultTagsIds = ["123wsdfj43423", "12wwsdf343423"];
