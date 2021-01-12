import React, { useState } from "react";
//import { action } from "@storybook/addon-actions";
import PreloadBase64Image from ".";
//import Button from "@material-ui/core/Button";
import image3 from "./../../../../../static/images/ladki.jpg";
import { makeStyles } from "@material-ui/core/styles";

export default {
  component: PreloadBase64Image,
  title: "Image/PreloadBase64Image",
  decorators: [
    story => (
      <div
        style={{
          paddingTop: "30px",
          width: "640px",
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

const useStyles = makeStyles({
  // style rule

  image: {
    display: "block",
    width: "640px",
    height: "400px",
  },
});

const photo = {
  base64:
    "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAfADIDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAABQYAAwcCBP/EAC0QAAEDAgQDBwUBAAAAAAAAAAEAAgMEEQUSITEGFJEVIjJBQlNhE1JUgZKC/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AHhs0R2lYf8AQXedn3N6rGxV1INxPJ/SsGIVlrczJ1Qa+ZYxvI0ftcGrpwdZo/6WTTz1bS3NUvdmF9HK2mpqqpjfL9VwYze7jqgbeL3NquVEb2yR5u8AbojgtXQ0eHtiNQxtjsTskQPnfFkiORvydVTJh8viMjdflBp/a1B+VH1UWV8k/wB1vVRA4RcEU3rmcV6W8FUAGrnFH43iytDkC/JwbQvAs5wI2QnGMMGD0zmUxMl+8+/kE7km2m6XpRzEldT1IvKGE3G1kCJK/S40vsvbhrKScOZUylj/AEoXUPOfJ5NJAVbnEkfCA72XB7wUQgTPt4iog//Z",
  src: image3,
  srcSet: image3,
  //sizes="(max-aspect-ratio: 16/10) 100vw, 160vh"
  isActive: true,
  aspectRatio: 1.6,
};

const Template = args => {
  const classes = useStyles();

  return <PreloadBase64Image imageClasses={classes.image} {...args} />;
};

const baseArgs = {
  isActive: true,
  alt: "alt",
};

export const Default = Template.bind({});
Default.args = {
  ...baseArgs,
  photo: photo as any,
};

export const OnlyBase64 = Template.bind({});
OnlyBase64.args = {
  ...baseArgs,
  photo: { ...photo, src: "", srcSet: "" } as any,
};
