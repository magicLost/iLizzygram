import React from "react";
import TextField from "@material-ui/core/TextField";
//import isEmail from "validator/lib/isEmail";

/* export type TError = {
  message: string;
  ref: any;
  type: string;
}; */

interface EmailInputProps {
  inputRef: any;
  label: string;
  name: string;
  error: any;
  disabled: boolean;
}

const EmailInput = ({
  label,
  name,
  inputRef,
  error,
  disabled,
}: EmailInputProps) => {
  console.log("[RENDER EMAIL INPUT]");

  return (
    <TextField
      name={name}
      //type="email"
      //onChange={onChange}
      inputRef={inputRef}
      fullWidth
      error={error ? true : false}
      id="email-id"
      label={label}
      placeholder="example@mail.ru"
      helperText={error && error.message}
      disabled={disabled}
      variant={"outlined"}
    />
  );
};

export default React.memo(EmailInput);
