import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
//import classes from './LoadableBackDrop.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface LoadableBackDropProps {}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const LoadableBackDrop = ({}: LoadableBackDropProps) => {
  //const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button>
      <Backdrop open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LoadableBackDrop;
