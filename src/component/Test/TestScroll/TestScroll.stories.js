import React from "react";
import { action } from "@storybook/addon-actions";
import TestScroll from "./TestScroll";
        
export default {
    component: TestScroll,
    title: "TestScroll",
    decorators: [],
    //decorators: [withKnobs],
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

export const Default = () => {
    return (
      <>
        <TestScroll />
      </>
    );
  };
        