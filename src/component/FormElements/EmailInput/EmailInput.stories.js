import React, { useState, useEffect, useRef } from "react";
import { action } from "@storybook/addon-actions";
import { useForm } from "react-hook-form";
import EmailInput from ".";
import { emailUseFormValidation } from "../../../photos/form/User.rules";

export default {
  component: EmailInput,
  title: "FormElements/EmailInput",
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

  const onSubmit = handleSubmit(({ email }) => {
    console.log("SUBMIT", email);
  });

  return (
    <div style={{ padding: "40px" }}>
      <form onSubmit={onSubmit}>
        <EmailInput
          label="Email address:"
          name="email"
          inputRef={register(emailUseFormValidation)}
          error={errors.email}
          disabled={false}
        />
        <br />
        <input type="submit" value="GO" />
      </form>
    </div>
  );
};
