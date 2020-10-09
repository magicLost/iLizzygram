import React from "react";
import { action } from "@storybook/addon-actions";
import Test from ".";

export default {
  component: Test,
  title: "Tests/Test",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <div style={{ margin: "auto", backgroundColor: "white" }}>
      <Test />
    </div>
  );
};
