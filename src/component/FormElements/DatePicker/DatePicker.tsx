import React, { useEffect, useState } from "react";
//import "date-fns";
import {
  //MuiPickersUtilsProvider,
  //KeyboardTimePicker,
  KeyboardDatePicker,
  //DatePicker as DatePickerUI,
} from "@material-ui/pickers";
///import DateFnsUtils from "@date-io/date-fns";
//import classes from './DatePicker.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface DatePickerProps {
  register: any;
  rules: any;
  error: any;
  disabled: boolean;
  clearError: (name: string) => void;
  watch: (name: string) => any;
  setValue: (name: string, value: any) => void | undefined;
  //value: Date | null;
}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const DatePicker = ({
  register,
  rules,
  setValue,
  //getValues,
  watch,
  clearError,
  error,
  disabled,
}: DatePickerProps) => {
  //const classes = useStyles();

  useEffect(() => {
    register({ name: "date", type: "custom" }, rules);
    //register({ name: "date" }, {});
  }, [register]);

  const value = watch("date");
  //const date = new Date(value);
  //const [date, setDate] = useState(undefined);

  const handleDateChange = (date: Date | null) => {
    console.log("handleDateChange", date);
    clearError("date");
    setValue("date", date);
    //setDate(date);
  };

  //const value = getValues("date");

  console.log("[RENDER] DatePicker ", value);

  return (
    <KeyboardDatePicker
      name="date"
      value={value}
      onChange={handleDateChange}
      fullWidth
      margin="normal"
      inputVariant="outlined"
      id="date-picker-dialog"
      label="Когда сделан снимок(примерно)."
      error={error ? true : false}
      format="MM/dd/yyyy"
      /* inputRef={register(rules)} */
      helperText={error && error.message}
      disabled={disabled}
      minDate={new Date("2018-07-08")}
      maxDate={new Date()}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
};

export default DatePicker;

/* 
 return (
    <DatePickerUI
      name="date"
      value={date}
      onChange={handleDateChange}
      fullWidth
      margin="normal"
      inputVariant="outlined"
      id="date-picker-dialog"
      label="Когда сделан снимок(примерно)."
      error={error ? true : false}
      format="MM/dd/yyyy"
      /* inputRef={register(rules)} 
      helperText={error && error.message}
      disabled={disabled}
      minDate={new Date("2018-07-08")}
      maxDate={new Date()}
    />
  );
*/

/* 
return (
    <KeyboardDatePicker
      name="date"
      value={date}
      onChange={handleDateChange}
      fullWidth
      margin="normal"
      inputVariant="outlined"
      id="date-picker-dialog"
      label="Когда сделан снимок(примерно)."
      error={error ? true : false}
      format="MM/dd/yyyy"
      /* inputRef={register(rules)} 
      helperText={error && error.message}
      disabled={disabled}
      minDate={new Date("2018-07-08")}
      maxDate={new Date()}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
*/
