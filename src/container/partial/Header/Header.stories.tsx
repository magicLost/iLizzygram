import React from "react";
import Header from "./Header";

export default {
  component: Header,
  title: "Pages/Header",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = args => <Header {...args} />;

export const NotAuth = Template.bind({});
NotAuth.args = {
  user: undefined,
  loading: false,
  login: () => {},
  logout: () => {},
};

export const Auth = Template.bind({});
Auth.args = {
  user: { name: "Sia", uid: "userUID1234", email: "sia@mail.ru" },
  loading: false,
  login: () => console.log("LOGIN"),
  logout: () => console.log("LOGOUT"),
};
