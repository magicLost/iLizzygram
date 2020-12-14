import React from "react";
import { action } from "@storybook/addon-actions";
import Logo from ".";

export default {
  component: Logo,
  title: "Components/Logo",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

/* const Link = React.forwardRef((props, ref) => {
  return (
    <a href={props.to} ref={ref}>
      {props.children}
    </a>
  );
}); */

export const Default = () => {
  return (
    <div
      style={{
        width: "100px",
        margin: "auto",
        paddingTop: "30px",
        backgroundColor: "white",
      }}
    >
      <Logo />
    </div>
  );
};
