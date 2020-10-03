import React from "react";
import { action } from "@storybook/addon-actions";
import LoadableBackDrop from "./LoadableBackDrop";
        
export default {
    component: LoadableBackDrop,
    title: "LoadableBackDrop",
    decorators: [],
    //decorators: [withKnobs],
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

export const Default = () => {
    return (
      <>
        <LoadableBackDrop />
      </>
    );
  };
        