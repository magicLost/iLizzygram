import React from "react";
import { Link } from "gatsby";
//import classes from './ButtonLink.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const ButtonLink = React.forwardRef((props: any, ref: any) => (
  <Link to={props.href}>{props.children}</Link>
));

export default ButtonLink;
