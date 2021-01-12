import React, { useEffect, useState } from "react";
import { action } from "@storybook/addon-actions";
import EditPhotoForm from "./EditPhotoForm";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  //authReducer,
  //modalReducer,
  alertReducer,
  tagsReducer,
} from "../../../store";

//import logo from "./../../../../static/logo.svg";
import { tagsData } from "../../../component/FormElements/TagsCheckbox/__mock";
import { TPhotoData } from "./../../types";

//CONFIG REDUX
const reducer = combineReducers({
  //modal: modalReducer,
  //lert: alertReducer,
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

/*  */
const prevPhoto = {
  id: "sfdjlsdf123",
  photo: {
    yearsOld: 1,
    date: {
      toDate: () => new Date("December 17, 2019 03:24:00"),
    },
    base64: "",
    files: [],
    aspectRatio: 1.6,
    srcSet: "",
    iconSrc: "logo.svg",
    src: "",
    _timestamp: new Date(),
    description: "Super puper picture",
    tags: {
      WX6CY5kGx4FXvdZR6g8E: true,
      rNNyXhgNJUjsbGFzVGAL: true,
    },
    googleDriveId: "",
    addedByUserUID: "",
    // do we make changes by express
    isActive: true,
  },
};

export default {
  component: EditPhotoForm,
  title: "Photos/Forms/EditPhotoForm",
  decorators: [
    story => (
      <Provider store={store}>
        <div
          style={{
            padding: "50px",
          }}
        >
          {story()}
        </div>
      </Provider>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template = args => <EditPhotoForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  prevPhoto,
  tagsData,
  uploadLoading: false,
  showAlert: msg => console.log("Alert", msg),
  editPhoto: () => console.log("success upload"),
};

/* export const Default = () => {
  return (
    <div style={{ padding: "40px" }}>
      <EditPhotoForm
        prevPhoto={prevPhoto}
        tagsData={tagsData}
        uploadLoading={false}
        showAlert={msg => console.log("Alert", msg)}
        editPhoto={() => console.log("success upload")}
      />
    </div>
  );
};
 */
