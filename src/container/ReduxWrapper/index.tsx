import React from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { modalReducer, alertReducer, tagsReducer } from "./../../store";
import { photoReducer } from "./../../photos";
import { authReducer } from "./../../auth";
import { firestore, initializeApp, apps } from "firebase/app";
import "firebase/firebase-firestore";
import { firebaseConfig } from "../../config";

//CONFIG FIREBASE

if (!apps.length) initializeApp(firebaseConfig);

export const db = firestore();

export const photosCollection = db.collection("photos");
export const tagsCollection = db.collection("tags");

// ENABLE CACHE https://firebase.google.com/docs/firestore/manage-data/enable-offline?authuser=0
/* firestore().enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  }); */

/*   db.collection("cities").where("state", "==", "CA")
  .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
              console.log("New city: ", change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
      });
  }); 
  
  firebase.firestore().disableNetwork()
    .then(function() {
        // Do offline actions
        // ...
    });

    firebase.firestore().enableNetwork()
    .then(function() {
        // Do online actions
        // ...
    });
  
  */

console.log("INITIALIZE");

//CONFIG REDUX
const reducer = combineReducers({
  modal: modalReducer,
  alert: alertReducer,
  auth: authReducer,
  tags: tagsReducer,
  photos: photoReducer,
});

const composeEnhancers = compose;

const middleware = [thunk]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default ({ element }) => <Provider store={store}>{element}</Provider>;
