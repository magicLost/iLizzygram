import "./src/styles/global.css";
export { default as wrapRootElement } from "./src/container/ReduxWrapper";
/* import React from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  modalReducer,
  alertReducer,
  authReducer,
  tagsReducer,
  photosReducer,
} from "./src/store/reducer";

//CONFIG REDUX
export default ({ element }) => {
  const reducer = combineReducers({
    modal: modalReducer,
    alert: alertReducer,
    auth: authReducer,
    tags: tagsReducer,
    photos: photosReducer,
  });

  const composeEnhancers = compose;

  const middleware = [thunk]; //sagaMiddleware, thunk

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return <Provider store={store}>{element}</Provider>;
};
 */
