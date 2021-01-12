import React, { useState, useEffect, useRef } from "react";
import { action } from "@storybook/addon-actions";
import DatePicker from ".";
//import "date-fns";
import {
  MuiPickersUtilsProvider,
  //KeyboardTimePicker,
  //KeyboardDatePicker,
  //DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";
import { dateRules } from "../../../photos/form/Photo.rules";

export default {
  component: DatePicker,
  title: "FormElements/DatePicker",
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
    getValues,
    clearError,
    watch,
    errors,
  } = useForm();

  useEffect(() => {
    register({ name: "date", type: "custom" }, dateRules);
    //register({ name: "date" }, {});
  }, [register]);

  const onSubmit = handleSubmit(({ date }) => {
    console.log("SUBMIT", date);
  });

  const onDateChange = date => {
    console.log("onDateChange", date);
    setValue("date", date);
    clearError("date");
  };

  const dateValue = watch("date");

  console.log("RENDER DATE PICKER WRAPPER", dateValue);

  return (
    <div style={{ padding: "40px" }}>
      <form onSubmit={onSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="Когда сделан снимок(примерно)."
            name="date"
            value={dateValue}
            onChange={onDateChange}
            error={errors.date}
            disabled={false}
          />
        </MuiPickersUtilsProvider>
        <br />
        <input type="submit" value="GO" />
      </form>
    </div>
  );
};
