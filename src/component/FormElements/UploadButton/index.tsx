import React from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import classes from "./UploadButton.module.scss";

//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface UploadButtonProps {
  title: string;
  name: string;
  inputRef: any;
  error: any;
  disabled: boolean;
  //getValues: (name: string) => any;
  //setValue: (name: string, value: any) => void | undefined;
}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/
//console.log("Classes", classes.root);

const UploadButton = ({
  title,
  name,
  inputRef,
  error,
  disabled,
}: UploadButtonProps) => {
  //const classes = useStyles();

  console.log("[RENDER] UploadButton");

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        ref={inputRef}
        name={name}
        className={classes.input}
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="secondary"
          component="span"
          startIcon={<CloudUploadIcon />}
          disabled={disabled}
        >
          {title}
        </Button>
      </label>
      {error && <p className={classes.error}>{error.message}</p>}
    </div>
  );
};

export default UploadButton;
