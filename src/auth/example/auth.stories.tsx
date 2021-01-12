import React, { useEffect, useState } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import { authReducer } from "..";
import { alertReducer, modalReducer } from "../../store";
import Layout from "../../container/partial/Layout";
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import { firebaseConfig } from "../../config";
import { useAuth } from "../hook/useAuth";
import Tabs from "../../component/Tabs";
import PhotoTab from "./PhotoTab";
import TagsTab from "./TagsTab";
import UsersTab from "./UsersTab";

export default {
  component: Tabs,
  title: "Auth/Index",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// CONFIG FIRESTORE
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

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
  const authState = useSelector<IGlobalState, IAuthState>(
    (state) => state.auth
  );

  let authStateElem = undefined;

  if (authState) {
    authStateElem = [];

    for (let prop in authState) {
      authStateElem.push(
        <p>
          {prop} -
          {typeof (authState as any)[prop] === "object"
            ? JSON.stringify((authState as any)[prop])
            : (authState as any)[prop]}
        </p>
      );
    }
  }

  return (
    <div style={{ padding: "20px", border: "2px solid cyan" }}>
      <h4>Auth state</h4>
      {/* {authStateElem} */}
      {JSON.stringify(authState)}
    </div>
  );
};

const IDefault = () => {
  useAuth(
    /*  user => {
      store.dispatch(authAC(user));
    }, */
    (err: any) => {
      console.log("On auth subscribe error", err);
    },
    (err: any) => {
      console.log("On auth subscribe successs", err);
    }
  );
  //console.log("STORE", store.getState();
  return (
    <Layout>
      <Tabs titles={["Auth", "Photo", "Tags", "Users"]}>
        <div style={{ padding: "30px" }}>
          <div>
            <ShowAuthState />

            <br />
            <br />

            <h3>SignIn:</h3>
            <p style={{ padding: "15px" }}>
              We must sign in user with google account and on success send
              additional request to check if user in users collection and save
              result to local storage.
            </p>

            <h3>Firestore Rules:</h3>
            <p style={{ padding: "15px" }}>
              <ul>
                <li>User can read if he is auth</li>
                <li>User can add/edit only if he exists in users collection</li>
                <li>User can edit if addByUser = user.uid</li>
              </ul>
            </p>
          </div>
        </div>

        <PhotoTab />

        <TagsTab />

        <UsersTab />
      </Tabs>
    </Layout>
  );
};

export const Default = () => {
  //console.log("STORE", store.getState();
  return (
    <Provider store={store}>
      <IDefault />
    </Provider>
  );
};
