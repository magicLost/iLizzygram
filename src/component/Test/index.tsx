import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import { useStaticQuery, graphql } from "gatsby";

interface TestProps {}

const useStyles = makeStyles({
  root: {
    minWidth: "300px",
    maxWidth: "600px",
    minHeight: "200px",
    backgroundColor: "white",
    padding: "20px",
    textAlign: "center",
  },
});

class Controller {
  hello: string;
  setState: any;

  useHello = () => {
    const [state, setState] = useState({ hello: "hello" });

    this.hello = state.hello;
    this.setState = setState;
  };

  sayBye = () => {
    this.setState({ hello: "bye" });
  };
}

const controller = new Controller();

const Test = ({}: TestProps) => {
  const classes = useStyles();

  controller.useHello();

  return (
    <div className={classes.root}>
      <h1>Hello - {controller.hello}</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic est
        laboriosam nihil incidunt ratione iusto commodi omnis sit quae totam
        beatae recusandae, tempore at harum sed ipsum doloremque repudiandae
        necessitatibus.
      </p>
      <button onClick={controller.sayBye}>Say Bye</button>
    </div>
  );
};

export default Test;
