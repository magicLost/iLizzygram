import React, { useEffect } from "react";
import { action } from "@storybook/addon-actions";
import LoginForm from "./form/LoginForm";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { authReducer } from ".";
import { alertReducer, modalReducer } from "./../store";
import Layout from "../container/partial/Layout";
import Logo from "../component/Logo/PureLogo";
import { initializeApp, apps } from "firebase/app";
import "firebase/firebase-firestore";
import { firebaseConfig } from "../config";
import { useInit } from "./hook";
import { authAC } from ".";

export default {
  component: LoginForm,
  title: "Auth/Index",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// CONFIG FIRESTORE
if (!apps.length) initializeApp(firebaseConfig);

/* 
const db = firestore();

export const photosCollection = db.collection("photos");
export const tagsCollection = db.collection("photos");
 */

//CONFIG REDUX
const reducer = combineReducers({
  modal: modalReducer,
  alert: alertReducer,
  auth: authReducer,
  //tags: tagsReducer,
  //photos: photosReducer,
});

const composeEnhancers = compose;

const middleware = [thunk]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export const Default = () => {
  useInit(
    user => {
      store.dispatch(authAC(user));
    },
    err => {
      console.log("On auth subscribe error", err);
    },
    err => {
      console.log("On auth subscribe successs", err);
    }
  );
  //console.log("STORE", store.getState();
  return (
    <Provider store={store}>
      <Layout Logo={Logo}>
        {/*  <div style={{ padding: "30px" }}>
          <LoginForm
            onSuccessLogin={() => {
              console.log("onSuccessLogin");
            }}
            onLoginError={() => console.log("onLoginError")}
          />
        </div> */}
      </Layout>
    </Provider>
  );
};
