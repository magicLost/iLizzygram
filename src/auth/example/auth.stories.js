import React, { useEffect, useState } from "react";
import { action } from "@storybook/addon-actions";
import LoginForm from "../form/LoginForm";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { authReducer } from "..";
import { alertReducer, modalReducer } from "../../store";
import Layout from "../../container/partial/Layout";
import Logo from "../../component/Logo/PureLogo";
import { initializeApp, apps } from "firebase/app";
import "firebase/firebase-firestore";
import { firebaseConfig } from "../../config";
import { useInit } from "../hook";
import { authAC } from "..";
import { db } from "../../container/ReduxWrapper";
import Tabs from "../../component/Tabs";
import PhotoTab from "./PhotoTab";
import TagsTab from "./TagsTab";
import UsersTab from "./UsersTab";
import Button from "@material-ui/core/Button";

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

const ShowAuthState = () => {
  const [authState, setAuthState] = useState(undefined);

  let authStateElem = undefined;

  if (authState) {
    authStateElem = [];

    for (let prop in authState) {
      authStateElem.push(
        <p>
          {prop} -{" "}
          {typeof authState[prop] === "object"
            ? JSON.stringify(authState[prop])
            : authState[prop]}
        </p>
      );
    }
  }

  return (
    <>
      <Button
        variant="text"
        onClick={() => {
          if (authState) setAuthState();
          else setAuthState(store.getState().auth);
        }}
      >
        Show auth state
      </Button>
      {authStateElem}
    </>
  );
};

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
        <Tabs titles={["Auth", "Photo", "Tags", "Users"]}>
          <div style={{ padding: "30px" }}>
            <div>
              <ShowAuthState />
              <h3>Registration</h3>
              <p>
                We must manually add user to users table if we wanna allow him
                to add photos
              </p>

              <h3>SignIn</h3>
              <p>
                We must sign in user with email and password and on success send
                additional request to check if user in users collection
              </p>

              <h3>Firestore Rules</h3>
              <p>
                <ul>
                  <li>User can read if he is auth</li>
                  <li>
                    User can add/edit only if he exists in users collection
                  </li>
                  <li>User can edit if addByUser = user.uid</li>
                  <li>???Validate to user name, pass.</li>
                </ul>
              </p>
            </div>

            <p>
              {" "}
              TODO: make registration with name - on success register call
              currentUser.updateProfile
            </p>
            <p> TODO: make change profile name </p>
          </div>

          <PhotoTab />

          <TagsTab />

          <UsersTab />
        </Tabs>
      </Layout>
    </Provider>
  );
};
