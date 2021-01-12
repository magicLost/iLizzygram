import React from "react";
import { action } from "@storybook/addon-actions";
import SearchPhotoForm from "./SearchPhotoForm";
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

export default {
  component: SearchPhotoForm,
  title: "Photos/Forms/SearchPhotoForm",
  decorators: [
    story => (
      <Provider store={store}>
        <div
          style={{
            width: "650px",
            margin: "auto",
            padding: "30px",
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

const state = {
  tagsIds: [],
  yearsOld: -1,
};

const Template = args => <SearchPhotoForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  state,
  tagsData,
  setSearchState: () => console.log("onSetSearchState"),
};

const initState = {
  tagsIds: [
    "ybrq9aFZlTk71akoH7Lz",
    "fYZ3uqG1vBLFH75Y0rjM",
    "rNNyXhgNJUjsbGFzVGAL",
  ],
  yearsOld: 2,
};

export const InitState = Template.bind({});
InitState.args = {
  state: initState,
  tagsData,
  setSearchState: () => console.log("onSetSearchState"),
};

/* export const Default = () => {



  return (
      <div style={{ width: "650px", margin: "auto", padding: "30px" }}>
        <SearchPhotoForm
          state={state}
          tagsData={tagsData}
          setSearchState={() => console.log("onSetSearchState")}
        />
      </div>
  );
}; */
