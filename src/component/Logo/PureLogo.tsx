import React from "react";
import IconButton from "@material-ui/core/IconButton";
//import classes from './Logo.module.scss';
import { makeStyles } from "@material-ui/core/styles";
//import { Link } from "gatsby";

//interface LogoProps {}

const useStyles = makeStyles({
  iconButton: {
    padding: "5px",
  },
});

export const PureLogo = ({ ILink }) => {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="Home page"
      className={classes.iconButton}
      component={ILink}
      to="/"
    >
      <img src="logo.svg" width={"80px"} alt="Lizzygram logo" />
    </IconButton>
  );
};

export default PureLogo;
