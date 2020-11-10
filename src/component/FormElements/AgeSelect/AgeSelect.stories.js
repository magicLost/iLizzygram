import React, { useState, useEffect, useRef } from "react";
import { action } from "@storybook/addon-actions";
import { useForm } from "react-hook-form";
import AgeSelect from ".";
//import { emailUseFormValidation } from "../../../photos/form/User.rules";

export default {
  component: AgeSelect,
  title: "FormElements/AgeSelect",
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
    //getValues,
    clearError,
    watch,
    errors,
  } = useForm({
    defaultValues: {
      ages: -1,
    },
  });

  useEffect(() => {
    register({ name: "ages", type: "custom" });
  }, [register]);

  const onSubmit = handleSubmit(({ ages }) => {
    console.log("SUBMIT", ages);
  });

  return (
    <div style={{ padding: "40px" }}>
      <form onSubmit={onSubmit}>
        <AgeSelect
          value={watch("ages")}
          onChange={event => {
            const value = event.target.value;
            setValue("ages", value);
          }}
        />
        <br />
        <input type="submit" value="GO" />
      </form>
    </div>
  );
};
