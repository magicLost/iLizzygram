import React from "react";
import { action } from "@storybook/addon-actions";
import SearchFilterForm from "./SearchFilterForm";
import { mockQueriesData } from "./../../../component/FormElements/TagsCheckbox/TagsCheckbox.stories";
import { MockedProvider } from "@apollo/client/testing";
import { TAGS } from "./../../../component/FormElements/TagsCheckbox/TagsCheckbox";

export default {
  component: SearchFilterForm,
  title: "Forms/SearchFilterForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <MockedProvider mocks={mockQueriesData} addTypename={false}>
      <SearchFilterForm
        setSearchState={(data) => {
          console.log("SET Search State", data.descByDate, data.tagsIds);
        }}
      />
    </MockedProvider>
  );
};
