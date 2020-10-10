import React from "react";
import { action } from "@storybook/addon-actions";
import SearchPhotoForm from ".";
import { MockedProvider } from "@apollo/client/testing";

import { mockQueriesData as tagsMockQueriesData } from "../../../hooks/photos/useTags.mock";

export default {
  component: SearchPhotoForm,
  title: "Forms/SearchPhotoForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <MockedProvider mocks={tagsMockQueriesData} addTypename={false}>
      <div style={{ width: "650px", margin: "auto", padding: "30px" }}>
        <SearchPhotoForm
          title={"Поиск фотографий по тэгам:"}
          onSetSearchState={() => console.log("onSetSearchState")}
        />
      </div>
    </MockedProvider>
  );
};
