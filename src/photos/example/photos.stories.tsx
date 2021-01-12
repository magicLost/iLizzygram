import React, { useEffect } from "react";
import AddPhotoForm from "../form/AddPhotoForm";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { alertReducer, modalReducer, tagsReducer } from "../../store";
///import firebase from "firebase/app";
//import "firebase/firebase-firestore";
//import { firebaseConfig } from "../config";
/* import {
  getAll,
  generateAndSavePhotosData,
  resFirestoreToMapObj,
  updatePhotosWithTagsArrField,
} from "../helper"; */
import Button from "@material-ui/core/Button";
import { photoReducer, searchReducer } from "..";
import Photos from "../container/Photos";
import Alert from "../../component/Alert";
//import { db } from "../../container/ReduxWrapper";
import Tabs from "../../component/Tabs";
import GenerateTab from "./GenerateTab";
import ShowDataTab from "./ShowDataTab";
import { authReducer, useAuth } from "../../auth";

export default {
  component: AddPhotoForm,
  title: "Photos/Index",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// CONFIG FIRESTORE
/* firestore()
  .enablePersistence()
  .catch(err => {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log("[FIRESTORE ENABLE PERSISTENCE ERROR]", err);
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log("[FIRESTORE ENABLE PERSISTENCE ERROR]", err);
    }
  }); */
/* 
if (!apps.length) initializeApp(firebaseConfig);

const db = firestore();

const photosCollection = db.collection("photos");
const tagsCollection = db.collection("tags"); */

/*  photosCollection.onSnapshot(
  snapshot => {
    console.log("[ON SNAPSHOT]", snapshot.docChanges().length)
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "added") {
        //console.log("New city: ", change.oldIndex);
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
      }
    });
  },
  err => {
    console.log("[SUBSCRIBE ERROR]", err);
    //errorPhotos();
  }
);  */

//CONFIG REDUX
const reducer = combineReducers({
  modal: modalReducer,
  alert: alertReducer,
  auth: authReducer,
  search: searchReducer,
  tags: tagsReducer,
  photos: photoReducer,
});

const composeEnhancers = compose;

//const middleware = [thunk]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)) //...middleware
);

/* const fetchTags = () => store.dispatch(fetchTagsAC());

const fetchPhotos = (query, isFetchMore) =>
  store.dispatch(fetchPhotosAC(query, isFetchMore));

const setPhotos = photos => store.dispatch(allPhotosRequestSuccessAC(photos));

const errorPhotos = () => store.dispatch(allPhotosRequestErrorAC()); */

export const Default = () => {
  //console.log("STORE", store.getState();

  return (
    <Provider store={store}>
      <>
        <Tabs titles={["Photos", "Generate data", "Show data"]}>
          <>
            <div style={{ padding: "20px" }}>
              <Photos />
            </div>
            <Alert />
          </>

          <GenerateTab />

          <ShowDataTab />
        </Tabs>
      </>
    </Provider>
  );
};
