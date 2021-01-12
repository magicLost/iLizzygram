import React from "react";
import { action } from "@storybook/addon-actions";
import PhotoDesc from "./PhotoDesc";
import { tagsData } from "../FormElements/TagsCheckbox/TagsCheckbox.stories";

export default {
  component: PhotoDesc,
  title: "PhotoDesc",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const desc = `Зали пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
землю на вкус... Зали пробует землю на вкус... Зали пробует землю на
вкус... Зали пробует землю на вкус... Зали пробует землю на вкус... Зали
пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
землю на вкус... Зали пробует землю на вкус... `;

export const Default = () => {
  return (
    <div
      style={{
        //width: "100%",
        //height: "100vh",
        padding: "50px",
        maxWidth: "600px",
        margin: "auto",
        //display: "flex",
        //justifyContent: "center",
        //alignItems: "center",
        // backgroundColor: "gray",
      }}
    >
      <PhotoDesc
        tags={tagsData}
        date={new Date("2018-11-23")}
        desc={desc}
        photoId="photoId"
        onClose={() => console.log("onClose")}
      />
    </div>
  );
};
