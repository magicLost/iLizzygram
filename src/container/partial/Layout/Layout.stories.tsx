import React, { useEffect, useState } from "react";
//import { action } from "@storybook/addon-actions";

import Layout from ".";
//import { mockQueriesData } from "../Header/Header.stories";
//import { cache } from "../../../apolloClient/cache";
/* import {
  showAlert,
  showLoginForm,
} from "../../../apolloClient/cache.controller"; */
//import PureLogo from "../../../component/Logo/PureLogo";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
//import thunk from "redux-thunk";
import { modalReducer, alertReducer } from "./../../../store";
import { authReducer } from "../../../auth";

/* const td = require("testdouble");

const Header = td.replaceEsm("./../Header");
td.when(connect()).thenReturn(() => <p>Hello</p>); */

export default {
  component: Layout,
  title: "Pages/Layout",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

//CONFIG REDUX
const reducer = combineReducers({
  auth: authReducer,
  //modal: modalReducer,
  alert: alertReducer,
});

const store = createStore(reducer);

export const Default = () => {
  useEffect(() => {
    store.dispatch({
      type: "AUTH",
      user: {
        name: "Sia",
        email: "sia@mail.ru",
        uid: "123elrfjweoj324",
      },
    });
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <p>Layout stories</p>
      </Layout>
    </Provider>
  );
};
