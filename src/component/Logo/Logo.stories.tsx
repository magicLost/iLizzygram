import React from "react";
//import { action } from "@storybook/addon-actions";
import Logo from ".";
import { withNextRouter } from "storybook-addon-next-router";

export default {
  component: Logo,
  title: "Components/Logo",
  decorators: [
    withNextRouter,
    story => (
      <div
        style={{
          width: "100px",
          margin: "auto",
          paddingTop: "30px",
          backgroundColor: "white",
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

/* const Link = React.forwardRef((props, ref) => {
  return (
    <a href={props.to} ref={ref}>
      {props.children}
    </a>
  );
}); */

const Template = args => <Logo {...args} />;

export const Default = Template.bind({});
