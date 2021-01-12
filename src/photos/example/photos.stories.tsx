import React from "react";
import AddPhotoForm from "../form/AddPhotoForm";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { alertReducer, modalReducer, tagsReducer } from "../../store";
//import { firestore, initializeApp, apps } from "firebase/app";
//import "firebase/firebase-firestore";
//import { firebaseConfig } from "../config";
/* import {
  getAll,
  generateAndSavePhotosData,
  resFirestoreToMapObj,
  updatePhotosWithTagsArrField,
} from "../helper"; */
import { photoReducer, searchReducer } from "..";
import Photos from "../container/Photos";
import Alert from "../../component/Alert";
//import { db } from "./../../firebase/initFirestore";
import { initApp } from "./../../firebase/initApp";
import Tabs from "../../component/Tabs";
import GenerateTab from "./GenerateTab";
import ShowDataTab from "./ShowDataTab";
import { authReducer } from "../../auth";

export default {
  component: AddPhotoForm,
  title: "Photos/Index",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

initApp();

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
