import React, { useRef, useState } from "react";
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

abstract class ABaseController {
  static useBasic<T, U>(classType: new (args: U) => T, args: U) {
    const isInitRef = useRef(false);
    const ctrlRef: React.MutableRefObject<T | undefined> = useRef();

    if (isInitRef.current === false) {
      ctrlRef.current = new classType(args);
      isInitRef.current = true;
    }

    return ctrlRef.current;
  }

  /* static useBasic = () => {
    const isInitRef = useRef(false);
    const ctrlRef: React.MutableRefObject<Controller | undefined> = useRef();

    if (isInitRef.current === false) {
      ctrlRef.current = new Controller();
      isInitRef.current = true;
    }

    return ctrlRef.current;
  }; */
}

class Controller extends ABaseController {
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

  static useInit = (count: number) => {
    const countRef = useRef(count);

    const controller = Controller.useBasic<Controller, undefined>(
      Controller,
      undefined
    );

    controller.useHello();

    return { controller, count: countRef.current };
    /* const isInitRef = useRef(false);
    const ctrlRef: React.MutableRefObject<Controller | undefined> = useRef();

    if (isInitRef.current === false) {
      ctrlRef.current = new Controller();
      isInitRef.current = true;
    }

    ctrlRef.current.useHello();

    return ctrlRef.current; */
  };
}

//const controller = new Controller();
let count = 0;

const Test = ({}: TestProps) => {
  const classes = useStyles();

  count++;

  const { controller, count: cnt } = Controller.useInit(count);

  //controller.useHello();

  return (
    <div className={classes.root}>
      <h1>
        Hello - {cnt} - {controller.hello}
      </h1>

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
