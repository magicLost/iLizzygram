import React from "react";
import IconButton from "@material-ui/core/IconButton";
//import classes from './Logo.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby";

//interface LogoProps {}

const useStyles = makeStyles({
  iconButton: {
    padding: "5px",
  },
});

const Logo = () => {
  const classes = useStyles();

  console.log("[RENDER LOGO]");
  return (
    <IconButton
      aria-label="Home page"
      className={classes.iconButton}
      component={Link}
      to="/"
    >
      <img src="logo.svg" width={"80px"} alt="Lizzygram logo" />
    </IconButton>
  );
};

export default Logo;

/* import React from "react";
import PureLogo from "./PureLogo";
import { Link } from "gatsby";



const Logo = () => {
  return <PureLogo ILink={Link} />;
};

export default Logo;
 */
