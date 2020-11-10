import React from "react";
import { action } from "@storybook/addon-actions";
import { AddPhotoForm } from ".";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  //authReducer,
  //modalReducer,
  //alertReducer,
  tagsReducer,
} from "../../../store";
import { tagsData } from "../../../component/FormElements/TagsCheckbox/__mock";

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

const fetchPhoto = (photoFormData, onSuccess, onError) => {
  console.log("Fetch photo", photoFormData);
  console.log("Fetch photo success", onSuccess());
  console.log("Fetch photo error", onError());
};

export default {
  component: AddPhotoForm,
  title: "Photos/Forms/AddPhotoForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <Provider store={store}>
      <AddPhotoForm
        title="Fucking add photo form."
        fetchPhoto={fetchPhoto}
        tagsData={tagsData}
        onSuccessUpload={() => console.log("success upload")}
        onUploadError={() => console.log("error upload")}
      />
    </Provider>
  );
};
