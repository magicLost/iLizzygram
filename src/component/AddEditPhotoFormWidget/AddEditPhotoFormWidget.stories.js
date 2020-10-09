import React from "react";
import { action } from "@storybook/addon-actions";
import AddEditPhotoFormWidget from ".";
import {
  mockQueriesData,
  tagsState,
  tagsData,
} from "./../../hooks/photos/useTags.mock";
import { MockedProvider } from "@apollo/client/testing";

export default {
  component: AddEditPhotoFormWidget,
  title: "Forms/AddEditPhotoFormWidget",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <MockedProvider mocks={mockQueriesData} addTypename={false}>
      <AddEditPhotoFormWidget
        title={"Super AddEditPhotoFormWidget"}
        formErrors={{ tags: null, photoFile: null }}
        register={() => console.log("register")}
        onSubmit={() => console.log("onSubmit")}
        photoFileRules={{}}
        descRules={{}}
        uploadLoading={false}
        dateValue={Date.now()}
        onDateChange={() => console.log("onDateChange")}
        onTagsCheckboxChange={() => console.log("onTagsCheckboxChange")}
        tagsState={tagsState}
        tagsData={{ tags: tagsData }}
        tagsLoading={false}
        tagsQueryError={undefined}
      />
    </MockedProvider>
  );
};
