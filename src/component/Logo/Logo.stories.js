import React from "react";
import { action } from "@storybook/addon-actions";
import Logo from "./Logo";
//import NextRouter from "next/router";

export default {
  component: Logo,
  title: "Logo",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <div style={{ margin: "auto", backgroundColor: "white" }}>
      <Logo />
    </div>
  );
};
