import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import PhotoSkeletons from ".";

export default {
  component: PhotoSkeletons,
  title: "Components/PhotoSkeletons",
  decorators: [
    (story) => (
      <div
        style={{
          width: "90%",
          margin: "auto",
          paddingTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {story()}
      </div>
    ),
  ],
  excludeStories: /.*Data$/,
};

const Template = (args) => <PhotoSkeletons {...args} />;

export const Default = Template.bind({});
Default.args = {
  numberOfSkeletons: 4,
};
