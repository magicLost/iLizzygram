import React from "react";
import { action } from "@storybook/addon-actions";
import AddPhotoForm from ".";
import { MockedProvider } from "@apollo/client/testing";

import { mockQueriesData } from "../../../hooks/photos/useTags.mock";

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
      <AddPhotoForm title="Fucking add photo form." />
    </MockedProvider>
  );
};
