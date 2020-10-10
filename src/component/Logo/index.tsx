import React from "react";
//import IconButton from "@material-ui/core/IconButton";
//import classes from './Logo.module.scss';
//import { makeStyles } from "@material-ui/core/styles";
import PureLogo from "./PureLogo";
import { Link } from "gatsby";

//interface LogoProps {}

/* const useStyles = makeStyles({
  iconButton: {
    padding: "20px",
  },
}); */

const Logo = () => {
  return <PureLogo ILink={Link} />;
};

export default Logo;
