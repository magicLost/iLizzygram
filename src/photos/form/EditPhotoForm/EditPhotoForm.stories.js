import React, { useEffect, useState } from "react";
import { action } from "@storybook/addon-actions";
import { EditPhotoForm } from ".";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  //authReducer,
  //modalReducer,
  alertReducer,
  tagsReducer,
} from "../../../store";
import logo from "./../../../../static/logo.svg";
import { tagsData } from "../../../component/FormElements/TagsCheckbox/__mock";

//CONFIG REDUX
const reducer = combineReducers({
  //modal: modalReducer,
  alert: alertReducer,
  //auth: authReducer,
  tags: tagsReducer,
  //photos: photosReducer,
});

const composeEnhancers = compose;

const middleware = [thunk]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

//PROPS
const fetchPhoto = (photoId, photoFormData, onSuccess, onError) => {
  console.log("Fetch photo", photoFormData);
  console.log("Fetch photo id", photoId);
  console.log("Fetch photo success", onSuccess());
  console.log("Fetch photo error", onError());
};

const prevPhoto = {
  id: "sfdjlsdf123",
  photo: {
    date: {
      toDate: () => new Date("December 17, 2019 03:24:00"),
    },
    base64: "",
    files: [],
    aspectRatio: 1.6,
    srcSet: "",
    iconSrc: logo,
    src: "",
    _timestamp: Date.now(),
    description: "Super puper picture",
    tags: {
      Pa8GvtwrT1tMDgNLwy4S: true,
      YBa0wyeWwEB6takyExmF: true,
    },
    googleDriveId: "",
    addedByUser: "",
    // do we make changes by express
    isActive: true,
  },
};

export default {
  component: EditPhotoForm,
  title: "Photos/Forms/EditPhotoForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: "40px" }}>
        <EditPhotoForm
          title="Fucking edit photo form."
          prevPhoto={prevPhoto}
          tagsData={tagsData}
          showAlert={msg => console.log("Alert", msg)}
          fetchPhoto={fetchPhoto}
          onSuccessUpload={() => console.log("success upload")}
          onUploadError={() => console.log("error upload")}
        />
      </div>
    </Provider>
  );
};
