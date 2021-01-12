import React from "react";
import ButtonLink from "../UI/ButtonLink/ButtonLink";
import IconButton from "@material-ui/core/IconButton";
//import classes from './Logo.module.scss';
import { makeStyles } from "@material-ui/core/styles";

interface LogoProps {}

const useStyles = makeStyles({
  iconButton: {
    padding: 0,
  },
});

const Logo = ({}: LogoProps) => {
  const classes = useStyles();
  return (
    <IconButton
      aria-label="Home page"
      component={ButtonLink}
      className={classes.iconButton}
      href="/"
      hrefAs="/"
      /*       className={classes.menuButton}
       */
    >
      <img src="logo.svg" width={"80px"} alt="Lizzygram logo" />
    </IconButton>
  );
};

export default Logo;
