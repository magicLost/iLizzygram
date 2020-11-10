import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import AddEditPhotoFormWidget from ".";
//import { tagsData, tagsState } from "./../../../hooks/photos/useTags.mock";
//import fetchMock from "fetch-mock";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  //authReducer,
  //modalReducer,
  //alertReducer,
  tagsReducer,
} from "../../../store";
import { useUploadPhotoForm } from "../hook";
import { photoFileRules, descRules } from "../Photo.rules";
import { registerInfo } from "../AddPhotoForm";
import { tagsData } from "../../../component/FormElements/TagsCheckbox/__mock";

export default {
  component: AddEditPhotoFormWidget,
  title: "Photos/Forms/AddEditPhotoFormWidget",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

//CONFIG REDUX
const reducer = combineReducers({
  //modal: modalReducer,
  //alert: alertReducer,
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

export const Default = () => {
  const submit = formData => {
    //fetchPhoto(formData, onSuccessUpload, onUploadError);
    console.log(formData);
  };

  const uploadPhotoFormData = useUploadPhotoForm(tagsData, registerInfo);
  return (
    <Provider store={store}>
      <AddEditPhotoFormWidget
        title="Super Widget"
        photoFileRules={photoFileRules}
        descRules={descRules}
        uploadLoading={false}
        onSubmit={uploadPhotoFormData.handleSubmit(submit)}
        uploadPhotoFormData={uploadPhotoFormData}
      />
    </Provider>
  );
};
