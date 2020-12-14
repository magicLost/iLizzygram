import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Alert from "./Alert";
import Button from "@material-ui/core/Button";

export default {
  component: Alert,
  title: "Components/Alert",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  argTypes: {
    message: {
      control: "text",
    },
    /* isShow: {
      control: "bool",
      //name: "isShow",
      /*    type: { name: 'string', required: false },
      defaultValue: 'Hello',
      description: 'demo description',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Hello' },
      }, */
    /* control: {
        type: "bool",
      }, /
    }, */
  },
  excludeStories: /.*Data$/,
};

const Template = args => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "success",
  isShow: true,
  message: "Hello, from alert!",
  hideAlert: () => console.log("Hide alert"),
};
