import Button from "@material-ui/core/Button";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    position: "fixed",
    height: "50px",
    width: "100%",
    color: "white",
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <header className={classes.header}>
        <p
          style={{
            display: "block",
            maxWidth: "1000px",
            height: "100%",
            margin: "auto",
            paddingTop: "12px",
            backgroundColor: "black",
            textAlign: "center",
          }}
        >
          Layout
        </p>
      </header>

      <div style={{ maxWidth: "1000px", paddingTop: "65px", margin: "auto" }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
