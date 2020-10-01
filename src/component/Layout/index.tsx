import Button from "@material-ui/core/Button";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    width: "1000px",
    margin: "auto",
    backgroundColor: "black",
    color: "white",
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.header}>
        <p style={{ display: "block", textAlign: "center" }}>Layout</p>
        <Button variant="contained">Click me</Button>
      </div>

      <div style={{ width: "1000px", padding: "20px", margin: "auto" }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
