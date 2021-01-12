import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
//import { makeStyles } from "@material-ui/core/styles";
import classes from "./AddButton.module.scss";

/* const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
}); */

const AddButton = ({ onClick, title }) => {
  //const classes = useStyles();

  console.log("[RENDER ADD BUTTON]", classes, classes.ibutton);

  return (
    <Button
      color="secondary"
      variant="contained"
      className={classes.ibutton}
      startIcon={<AddCircleOutlineIcon />}
      size="small"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default AddButton;
