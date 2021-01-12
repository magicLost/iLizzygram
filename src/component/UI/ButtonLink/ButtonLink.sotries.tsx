import React from "react";
import ButtonLink from ".";
import { withNextRouter } from "storybook-addon-next-router";

export default {
  component: ButtonLink,
  title: "Buttons/ButtonLink",
  decorators: [
    withNextRouter,
    story => (
      <div
        style={{
          paddingTop: "30px",
          width: "200px",
          margin: "auto",
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

const Template = args => <ButtonLink {...args} />;

export const Default = Template.bind({});
/* Default.args = {
  onClick: () => console.log("Click"),
}; */
