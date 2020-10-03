import React from "react";
import { Link } from "gatsby";
//import classes from './ButtonLink.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AdbIcon from "@material-ui/icons/Adb";
import Button from "@material-ui/core/Button";
import MaterialLink from "@material-ui/core/Link";

/* const useStyles = makeStyles({
  anchor: {
    textDecoration: "none",
  },
}); */

const Links = () => {
  //const classes = useStyles();
  return (
    <>
      <IconButton aria-label="Home page" component={Link} to="/test">
        <AdbIcon />
      </IconButton>

      <Button aria-label="Home page" component={Link} to="/test">
        Go to test page
      </Button>

      <MaterialLink to="/test" component={Link} variant="body2">
        Material link to test
      </MaterialLink>
    </>
  );
};

export default Links;
