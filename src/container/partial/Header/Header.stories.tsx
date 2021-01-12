import React from "react";
import Header from ".";
import { withNextRouter } from "storybook-addon-next-router";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
//import thunk from "redux-thunk";
//import { modalReducer, alertReducer } from "./../../../store";
import { authReducer } from "../../../auth";

export default {
  component: Header,
  title: "Pages/Header",
  decorators: [withNextRouter],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

//CONFIG REDUX
const reducer = combineReducers({
  auth: authReducer,
  //modal: modalReducer,
  //alert: alertReducer,
});

const store = createStore(reducer);

const Template = (args) => (
  <Provider store={store}>
    <Header {...args} />
  </Provider>
);

export const Default = Template.bind({});
