import React from "react";
import AddButton from ".";

export default {
  component: AddButton,
  title: "Buttons/AddButton",
  decorators: [
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

const Template = args => <AddButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Добавить фото",
  onClick: () => console.log("Click"),
};
