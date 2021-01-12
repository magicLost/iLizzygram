import React from "react";
import { action } from "@storybook/addon-actions";
import AddPhotoForm, { UPLOAD_PHOTO } from "./AddPhotoForm";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { mockQueriesData } from "./../../../component/FormElements/TagsCheckbox/TagsCheckbox.stories";
import { MockedProvider } from "@apollo/client/testing";

export default {
  component: AddPhotoForm,
  title: "Forms/AddPhotoForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <MockedProvider mocks={mockQueriesData} addTypename={false}>
      <div style={{ padding: "40px" }}>
        <AddPhotoForm />
      </div>
    </MockedProvider>
  );
};
