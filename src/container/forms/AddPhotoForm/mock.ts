// WE CAN NOT MOCK QUERIES WITH FILE
// BECAUSE WE CAN NOT MANUALY CREATE BROWSER FILE INSTANCE AND SET IT TO OUR MOCK QUERIE DATA
// FOR TEST WE MUST USE SERVER TO UPLOAD OUR FILE AND RESPONSE

/*import { UPLOAD_PHOTO } from "./hook";

const date = "2020-10-01T16:36:00.000Z";

export const variablesData = {
  //id: "id123",
  file: {},
  desc: "",
  date,
  tags: ["123wsdf347423", "12wwsdf343423"],
};

export const photoToEditData = {
  _id: "id123",
  base64: "base64",
  aspectRatio: 1.4,
  iconSrc: "/images/vodianova.jpeg",
  srcSet: "/srcSet",
  src: "/src",
  date,
  description: "What a wonderfull photo...",
  tags: [{ _id: "123wsdf347423", title: "на улице", name: "street" }],
};

export const photoResponseData = {
  _id: "id123",
  base64: "base64",
  aspectRatio: 1.4,
  iconSrc: "/images/vodianova.jpeg",
  srcSet: "/srcSet",
  src: "/src",
  date,
  description: "New desc",
  tags: [{ _id: "123wsdf34df23", title: "дома", name: "home" }],
};

export const mockQueriesData = [
  {
    request: {
      query: UPLOAD_PHOTO,
      variables: {
        ...variablesData,
      },
    },
    result: async () => {
      console.log("QUERY!!!!!!!!!!");
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: {
              photoEdit: {
                ...photoResponseData,
              },
            },
          });
        }, 1000);
      });
    },
  },
];
*/
