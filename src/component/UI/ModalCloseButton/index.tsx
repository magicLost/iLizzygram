import React from "react";
//import classes from './ModalCloseButton.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface ModalCloseButtonProps {
  onClick: (event: any) => void | undefined;
  closeIconSize?: "large" | "small" | "default" | "inherit";
  ariaLabel: string;
}

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "0",
    right: "0",
    zIndex: 1315,
  },
});

const ModalCloseButton = ({
  onClick,
  ariaLabel,
  closeIconSize = "default",
}: ModalCloseButtonProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton onClick={onClick} color="secondary" aria-label={ariaLabel}>
        <CloseIcon fontSize={closeIconSize} />
      </IconButton>
    </div>
  );
};

export default ModalCloseButton;
