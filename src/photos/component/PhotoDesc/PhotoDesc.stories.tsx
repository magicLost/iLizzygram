import React from "react";
import { action } from "@storybook/addon-actions";
import PhotoDesc from "./PhotoDesc";
import { tagsData } from "../../../component/FormElements/TagsCheckbox/__mock";

export default {
  component: PhotoDesc,
  title: "Photos/PhotoDesc",
  decorators: [
    story => (
      <div
        style={{
          padding: "50px",
          maxWidth: "600px",
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

const photo = {
  id: "123ic",
  photo: {
    tags: {
      vekwWqVY1yYRd3XeERmd: true,
      WX6CY5kGx4FXvdZR6g8E: true,
      fYZ3uqG1vBLFH75Y0rjM: true,
      bCcRcxADj2xP9fkSXNpH: false,
    },
    date: new Date("2018-11-23"),
    description: "",
  },
};

/* `Зали пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
      землю на вкус... Зали пробует землю на вкус... Зали пробует землю на
      вкус... Зали пробует землю на вкус... Зали пробует землю на вкус... Зали
      пробует землю на вкус... Зали пробует землю на вкус... Зали пробует
      землю на вкус... Зали пробует землю на вкус... ` */

const Template = args => <PhotoDesc {...args} />;

export const Default = Template.bind({});
Default.args = {
  tagsState: {
    tags: tagsData,
    error: false,
    loading: false,
  },
  photo,
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};

/* export const LoadingTags = Template.bind({});
LoadingTags.args = {
  tagsState: {
    tags: tagsData,
    error: false,
    loading: true,
  },
  photo,
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
};

export const ErrorTags = Template.bind({});
ErrorTags.args = {
  tagsState: {
    tags: tagsData,
    error: true,
    loading: true,
  },
  photo,
  showEditPhotoForm: () => console.log("SHOW EDIT PHOTO FORM"),
}; */

/* export const Default = () => {
  return (
    <PhotoDesc
      photo={photo as any}
      tags={tagsData}
      tagsError={false}
      tagsLoading={false}
      showEditPhotoForm={() => console.log("On edit photo click")}
    />
  );
};
 */
/* export const LoadingTags = () => {
  return (
    <PhotoDesc
      photo={photo as any}
      tags={undefined}
      tagsError={false}
      tagsLoading={true}
      showEditPhotoForm={() => console.log("On edit photo click")}
    />
  );
};

export const ErrorTags = () => {
  return (
    <PhotoDesc
      photo={photo as any}
      tags={undefined}
      tagsError={true}
      tagsLoading={false}
      showEditPhotoForm={() => console.log("On edit photo click")}
    />
  );
}; */
