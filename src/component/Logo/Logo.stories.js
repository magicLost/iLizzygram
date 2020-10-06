import React from "react";
import { action } from "@storybook/addon-actions";
import PureLogo from "./PureLogo";

export default {
  component: PureLogo,
  title: "Logo",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Link = React.forwardRef((props, ref) => {
  return (
    <a href={props.to} ref={ref}>
      {props.children}
    </a>
  );
});

export const Default = () => {
  return (
    <div style={{ margin: "auto", backgroundColor: "white" }}>
      <PureLogo ILink={Link} />
    </div>
  );
};
