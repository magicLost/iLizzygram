import React from "react";
import AlertWidget from "./Alert";
import { useAlert } from "./hook";

const Alert = () => {
  //const classes = useStyles();

  const {
    alertState: { type, message, isShow },
    hideAlert,
  } = useAlert();

  console.log("[ALERT] RENDER");

  return (
    <AlertWidget
      type={type}
      message={message}
      isShow={isShow}
      hideAlert={hideAlert}
    />
  );
};

export default Alert;
