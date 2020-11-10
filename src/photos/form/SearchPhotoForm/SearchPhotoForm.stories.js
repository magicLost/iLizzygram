import React from "react";
import { action } from "@storybook/addon-actions";
import { SearchPhotoForm } from ".";
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
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const state = {
  tagsIds: [],
  yearsOld: -1,
};

export const Default = () => {
  return (
    <Provider store={store}>
      <div style={{ width: "650px", margin: "auto", padding: "30px" }}>
        <SearchPhotoForm
          title={"Поиск фотографий:"}
          state={state}
          tagsData={tagsData}
          setSearchState={() => console.log("onSetSearchState")}
        />
      </div>
    </Provider>
  );
};
