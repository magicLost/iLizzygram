import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { Alert } from ".";
import Button from "@material-ui/core/Button";

export default {
  component: Alert,
  title: "Components/Alert",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const [state, setState] = useState({
    isShow: false,
    type: "info",
    message: "Hello",
  });

  return (
    <>
      <Button
        onClick={() => {
          setState({
            isShow: true,
            type: "success",
            message: "This is a success alert.",
          });
        }}
      >
        Show success alert
      </Button>
      <Button
        onClick={() => {
          setState({
            isShow: true,
            type: "info",
            message: "This is an info alert.",
          });
        }}
      >
        Show info alert
      </Button>
      <Button
        onClick={() => {
          setState({
            isShow: true,
            type: "warning",
            message: "This is a warning alert.",
          });
        }}
      >
        Show warning alert
      </Button>
      <Button
        onClick={() => {
          setState({
            isShow: true,
            type: "error",
            message: "This is an error alert.",
          });
        }}
      >
        Show error alert
      </Button>
      <Alert
        type={state.type}
        isShow={state.isShow}
        message={state.message}
        hideAlert={() => {
          setState({ ...state, isShow: false });
        }}
      />
    </>
  );
};
