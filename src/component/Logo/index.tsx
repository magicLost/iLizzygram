import React from "react";
import IconButton from "@material-ui/core/IconButton";
import classes from "./Logo.module.scss";
//import { makeStyles } from "@material-ui/core/styles";
//import { Link } from "gatsby";
import ButtonLink from "../UI/ButtonLink";
//import logo from "./../../../static/logo.svg";

//interface LogoProps {}

/* const useStyles = makeStyles({
  iconButton: {
    padding: "5px",
  },
}); */

const Logo = () => {
  //const classes = useStyles();

  console.log("[RENDER LOGO]");
  return (
    <IconButton
      aria-label="Home page"
      className={classes.iconButton}
      component={ButtonLink}
      href="/"
      hrefAs="/"
    >
      <img
        width="80px"
        src={"logo.svg"}
        className={classes.image}
        alt="Lizzygram лого"
      />
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
