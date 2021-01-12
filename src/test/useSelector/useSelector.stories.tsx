import React, { useEffect } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { alertReducer, modalReducer, tagsReducer } from "../../store";
import { Main } from ".";
//import { firestore, initializeApp, apps } from "firebase/app";
//import { firebaseConfig } from "../config";

export default {
  component: Main,
  title: "Tests/useSelector",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

//CONFIG REDUX
const reducer = combineReducers({
  modal: modalReducer,
  alert: alertReducer,
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
      <Main />
    </Provider>
  );
};
