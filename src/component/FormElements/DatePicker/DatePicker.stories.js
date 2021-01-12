import React from "react";
import { action } from "@storybook/addon-actions";
import DatePicker from "./DatePicker";
//import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useForm } from "react-hook-form";
import { dateRules } from "../../../container/forms/rules";

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
    //getValues,
    clearError,
    watch,
    errors,
  } = useForm();

  const onSubmit = handleSubmit(({ date }) => {
    console.log("SUBMIT", date);
  });

  return (
    <div style={{ padding: "40px" }}>
      <form onSubmit={onSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            register={register}
            rules={dateRules}
            error={errors.date}
            disabled={false}
            clearError={clearError}
            watch={watch}
            setValue={setValue}
          />
        </MuiPickersUtilsProvider>
        <br />
        <input type="submit" value="GO" />
      </form>
    </div>
  );
};
