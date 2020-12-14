import React from "react";
import { action } from "@storybook/addon-actions";
import AddPhotoForm from "./AddPhotoForm";
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
  component: AddPhotoForm,
  title: "Photos/Forms/AddPhotoForm",
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

const Template = args => <AddPhotoForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  tagsData,
  uploadLoading: false,
  addPhoto: () => console.log("ADD PHOTO"),
};

/* export const Default = () => {
  return (
    <AddPhotoForm
      uploadLoading={false}
      addPhoto={() => console.log("ADD PHOTO")}
      tagsData={tagsData}
    />
  );
}; */
