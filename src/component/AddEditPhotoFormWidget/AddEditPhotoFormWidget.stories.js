import React from "react";
import { action } from "@storybook/addon-actions";
import AddEditPhotoFormWidget from "./AddEditPhotoFormWidget";
import { mockQueriesData } from "./../FormElements/TagsCheckbox/TagsCheckbox.stories";
import { MockedProvider } from "@apollo/client/testing";
import { useForm } from "react-hook-form";

export default {
  component: AddEditPhotoFormWidget,
  title: "Forms/AddEditPhotoFormWidget",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearError,
    watch,
    errors,
  } = useForm();

  return (
    <MockedProvider mocks={mockQueriesData} addTypename={false}>
      <div style={{ paddingTop: "20px" }}>
        <AddEditPhotoFormWidget
          title={"Супер пупер форма"}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={() => console.log("Submit")}
          photoFileRules={undefined}
          dateRules={undefined}
          tagsRules={undefined}
          setValue={setValue}
          clearError={clearError}
          watch={watch}
          descRules={undefined}
          loading={false}
        />
      </div>
    </MockedProvider>
  );
};
