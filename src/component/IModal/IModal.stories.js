import React from "react";
import { action } from "@storybook/addon-actions";
import IModal from ".";

export default {
  component: IModal,
  title: "Components/IModal",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = args => (
  <IModal {...args}>
    <div
      style={{
        width: "300px",
        height: "200px",
        textAlign: "center",
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      <p>Hello.</p>
    </div>
  </IModal>
);

export const FormType = Template.bind({});
FormType.args = {
  type: "form",
  open: true,
  onClose: () => console.log("close"),
};

export const SliderType = Template.bind({});
SliderType.args = {
  type: "slider",
  open: true,
  onClose: () => console.log("close"),
};
