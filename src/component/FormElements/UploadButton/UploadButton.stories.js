import React from "react";
import { action } from "@storybook/addon-actions";
import { useForm } from "react-hook-form";
import UploadButton from ".";
import { photoFileRules } from "../../../photos/form/Photo.rules";

export default {
  component: UploadButton,
  title: "FormElements/UploadButton",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = handleSubmit(({ photoFile }) => {
    console.log("SUBMIT", photoFile);
  });

  return (
    <div style={{ padding: "40px" }}>
      <form onSubmit={onSubmit}>
        <UploadButton
          name="photoFile"
          title="Add photoe"
          inputRef={register(photoFileRules)}
          error={errors.photoFile}
          disabled={false}
        />
        <br />
        <input type="submit" value="GO" />
      </form>
    </div>
  );
};
