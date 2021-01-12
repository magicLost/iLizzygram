import React, { useEffect, useMemo, useState } from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";

import Test from "./index";
import Button from "@material-ui/core/Button";

export default {
  component: Test,
  title: "Tests/Performance",
  decorators: [
    story => (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "5px",
          width: "700px",
          margin: "20px auto",
          padding: "20px",
        }}
      >
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const IButton = ({ variant }) => {
  console.log("IButton RENDER");
  return <Button variant={variant}>Test Button</Button>;
};

const _ref = <IButton variant="contained" />;

const MyButton = () => _ref;

const Wrapper = () => {
  const [state, setState] = useState(0);

  console.log("Wrapper RENDER");

  return (
    <>
      <MyButton />
      <p>{state}</p>
      <button onClick={() => setState(st => st + 1)}>Go</button>
    </>
  );
};

const _ref2 = <Wrapper />;

const IWrapper = () => _ref2;

///////////////////
const ComponentWithProps = ({ variant, onClick, name }) => {
  console.log("ComponentWithProps RENDER");

  return (
    <Button variant={variant} onClick={onClick} name={name}>
      ComponentWithProps - {name}
    </Button>
  );
};

let _ref3 = null;

const ContainerForComponentWithProps = ({ variant, onClick, name }) => {
  if (!_ref3)
    _ref3 = (
      <ComponentWithProps variant={variant} onClick={onClick} name={name} />
    );

  console.log("ContainerForComponentWithProps RENDER");

  return _ref3;
};

const Container = () => {
  const [state, setState] = useState(0);

  console.log("Container RENDER");

  return (
    <>
      <ContainerForComponentWithProps
        variant={"outlined"}
        onClick={() => console.log("on click ContainerForComponentWithProps")}
        name={state}
      />
      <IWrapper />
      <p>{state}</p>
      <button onClick={() => setState(st => st + 1)}>Go Container</button>
    </>
  );
};

export const TestPerformance = () => {
  return <Container />;
};
