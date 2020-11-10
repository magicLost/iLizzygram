import React, { useState, useEffect, useRef } from "react";
import { action } from "@storybook/addon-actions";
import { useForm } from "react-hook-form";

import { passwordUseFormValidation } from "../../../photos/form/User.rules";

import PasswordInput from ".";

export default {
  component: PasswordInput,
  title: "FormElements/PasswordInput",
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
  } = useForm();

  const onSubmit = handleSubmit(({ password }) => {
    console.log("SUBMIT", password);
  });

  return (
    <div style={{ padding: "40px" }}>
      <form onSubmit={onSubmit}>
        <PasswordInput
          label="Enter password:"
          name="password"
          inputRef={register(passwordUseFormValidation)}
          error={errors.password}
          disabled={false}
        />
        <br />
        <input type="submit" value="GO" />
      </form>
    </div>
  );
};
