import React, { useState, useEffect, useRef } from "react";
import { action } from "@storybook/addon-actions";
import { useForm } from "react-hook-form";
import AgeSlider from ".";
//import { emailUseFormValidation } from "../../../photos/form/User.rules";
import { lizzyYearsOld } from "./../../../config";

export default {
  component: AgeSlider,
  title: "FormElements/AgeSlider",
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
      ages: [1, 2],
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
        <AgeSlider
          value={watch("ages")}
          handleChange={(event, newValue) => {
            setValue("ages", newValue);
          }}
          max={lizzyYearsOld}
        />
        <br />
        <input type="submit" value="GO" />
      </form>
    </div>
  );
};
