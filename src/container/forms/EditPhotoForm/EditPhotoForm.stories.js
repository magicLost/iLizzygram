import React, { useEffect, useState } from "react";
import { action } from "@storybook/addon-actions";
import EditPhotoForm, { EDIT_PHOTO } from "./EditPhotoForm";
import { cache, modalVar } from "./../../../apolloClient/cache";
import { MockedProvider } from "@apollo/client/testing";
import { mockQueriesData } from "./../../../component/FormElements/TagsCheckbox/TagsCheckbox.stories";

export default {
  component: EditPhotoForm,
  title: "Forms/EditPhotoForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const date = Date.now();

export const variablesData = {
  id: "id123",
  //file: undefined,
  //desc: "What a wonderful photo, is not it?...",
  //date,
  tags: ["123wsdd343423", "123wsdfj43423"],
};

/* { _id: "123wsdf347423", title: "на улице", name: "street" },
  { _id: "123wsdf343423", title: "улыбка", name: "smile" },
  { _id: "123wsdd343423", title: "дача", name: "dacha" },
  { _id: "123wsdfj43423", title: "на природе", name: "nature" },
  { _id: "123wsdf34df23", title: "дома", name: "home" },
  { _id: "12wwsdf343423", title: "с петами", name: "pets" }, */

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

export const mockQueriesEditData = [
  {
    request: {
      query: EDIT_PHOTO,
      variables: {
        ...variablesData,
      },
    },
    result: async () => {
      console.log("QUERY!!!!!!!!!!");
      return new Promise((resolve) => {
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

export const Default = () => {
  useEffect(() => {
    const state = modalVar();
    modalVar({
      ...state,
      photo: photoToEditData,
    });

    setIsPhoto(true);
  }, []);

  const [isPhoto, setIsPhoto] = useState(false);

  return (
    <MockedProvider
      mocks={[...mockQueriesEditData, ...mockQueriesData]}
      cache={cache}
      addTypename={true}
    >
      <>
        <div style={{ paddingLeft: "50px" }}>
          <h4>For correct response use:</h4>
          <h4 style={{ paddingLeft: "20px" }}>- tags: на природе, дача</h4>
        </div>
        {isPhoto && (
          <div style={{ padding: "40px" }}>
            <EditPhotoForm hide={() => console.log("Hide EditPhotoForm")} />
          </div>
        )}
      </>
    </MockedProvider>
  );
};
