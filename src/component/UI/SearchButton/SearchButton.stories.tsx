import React from "react";
import SearchButton from ".";

export default {
  component: SearchButton,
  title: "Buttons/SearchButton",
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

const Template = args => <SearchButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => console.log("Click"),
};
