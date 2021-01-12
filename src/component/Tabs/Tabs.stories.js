import React from "react";
import { action } from "@storybook/addon-actions";
import Tabs from ".";

export default {
  component: Tabs,
  title: "Components/Tabs",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <div style={{ margin: "auto", backgroundColor: "white" }}>
      <Tabs titles={["One", "444", "Go"]}>
        <p>Super one</p>
        <p>Super 444</p>
        <p>Goodbye.</p>
      </Tabs>
    </div>
  );
};
