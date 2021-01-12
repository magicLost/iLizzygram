import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface DatePickerProps {
  label: string;
  name: string;
  error: any;
  disabled: boolean;
  onChange: (date: Date) => void | undefined;
  value: Date | null;
}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const DatePicker = ({
  label,
  name,
  value,
  onChange,
  error,
  disabled,
}: DatePickerProps) => {
  //const classes = useStyles();

  console.log("[RENDER] DatePicker ");

  return (
    <KeyboardDatePicker
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      inputVariant="outlined"
      id="date-picker-dialog"
      label={label}
      error={error ? true : false}
      format="dd/MM/yyyy"
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
