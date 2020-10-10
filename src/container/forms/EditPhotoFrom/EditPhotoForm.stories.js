import React, { useEffect, useState } from "react";
import { action } from "@storybook/addon-actions";
import EditPhotoForm from ".";
import { MockedProvider } from "@apollo/client/testing";
import { cache, modalVar } from "./../../../apolloClient/cache";
import { mockQueriesData as tagsMockQueriesData } from "../../../hooks/photos/useTags.mock";
import { mockQueriesData, photoToEditData } from "./mock";

export default {
  component: EditPhotoForm,
  title: "Forms/EditPhotoForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const mockQueries = tagsMockQueriesData.concat(mockQueriesData);

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
    <MockedProvider mocks={mockQueries} cache={cache} addTypename={true}>
      <>
        <div style={{ paddingLeft: "50px" }}>
          <h4>For correct response use:</h4>
          <h4 style={{ paddingLeft: "20px" }}>- tags: на природе, дача</h4>
        </div>
        {isPhoto && (
          <div style={{ padding: "40px" }}>
            <EditPhotoForm
              title="Fucking edit photo form."
              onSuccessUpload={() => console.log("success upload")}
            />
          </div>
        )}
      </>
    </MockedProvider>
  );
};
