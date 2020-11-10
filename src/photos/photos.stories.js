import React, { useEffect } from "react";
import { action } from "@storybook/addon-actions";
import AddPhotoForm from "./form/AddPhotoForm";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  alertReducer,
  fetchTagsAC,
  modalReducer,
  tagsReducer,
} from "./../store";
import {
  allPhotosRequestSuccessAC,
  allPhotosRequestErrorAC,
  fetchPhotosAC,
} from "./store/action/photos";
//import { firestore, initializeApp, apps } from "firebase/app";
import "firebase/firebase-firestore";
//import { firebaseConfig } from "../config";
import {
  getAll,
  generateAndSavePhotosData,
  resFirestoreToMapObj,
  updatePhotosWithTagsArrField,
} from "./helper";
import Button from "@material-ui/core/Button";
//import { useSubscribe, reSubscribe, subscribe } from "./store/hook";
//import { usePhotos } from "./store/ihook";
//import WallOfPhotos from "../container/WallOfPhotos";
import { photoReducer, searchReducer } from ".";
import Photos from "./container/Photos";
import Alert from "./../component/Alert";
import {
  photosCollection,
  tagsCollection,
  db,
} from "../container/ReduxWrapper";

export default {
  component: AddPhotoForm,
  title: "Photos/Index",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// CONFIG FIRESTORE
/* firestore()
  .enablePersistence()
  .catch(err => {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log("[FIRESTORE ENABLE PERSISTENCE ERROR]", err);
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log("[FIRESTORE ENABLE PERSISTENCE ERROR]", err);
    }
  }); */
/* 
if (!apps.length) initializeApp(firebaseConfig);

const db = firestore();

const photosCollection = db.collection("photos");
const tagsCollection = db.collection("tags"); */

/*  photosCollection.onSnapshot(
  snapshot => {
    console.log("[ON SNAPSHOT]", snapshot.docChanges().length)
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "added") {
        //console.log("New city: ", change.oldIndex);
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
      }
    });
  },
  err => {
    console.log("[SUBSCRIBE ERROR]", err);
    //errorPhotos();
  }
);  */

//CONFIG REDUX
const reducer = combineReducers({
  modal: modalReducer,
  alert: alertReducer,
  //auth: authReducer,
  search: searchReducer,
  tags: tagsReducer,
  photos: photoReducer,
});

const composeEnhancers = compose;

//const middleware = [thunk]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk)) //...middleware
);

/* const fetchTags = () => store.dispatch(fetchTagsAC());

const fetchPhotos = (query, isFetchMore) =>
  store.dispatch(fetchPhotosAC(query, isFetchMore));

const setPhotos = photos => store.dispatch(allPhotosRequestSuccessAC(photos));

const errorPhotos = () => store.dispatch(allPhotosRequestErrorAC()); */

export const Default = () => {
  //console.log("STORE", store.getState();

  return (
    <Provider store={store}>
      <>
        <div style={{ padding: "20px", borderBottom: "2px solid gray" }}>
          <h4>Generate and save fake data.</h4>
          <Button
            onClick={async () => {
              const tags = await getAll(tagsCollection);

              await generateAndSavePhotosData(photosCollection, tags);

              console.log("SUCCESS GENERATE AND SAVE PHOTOS");
            }}
          >
            Generate and save photos
          </Button>
        </div>
        <div
          style={{
            padding: "20px",
            borderBottom: "2px solid gray",
            marginBottom: "20px",
          }}
        >
          <h4>Show firestore data.</h4>
          <Button
            onClick={async () => {
              const tags = await getAll(tagsCollection);
              console.log("[FIRESTORE] TAGS", tags);
            }}
          >
            Get all tags to console.
          </Button>

          <Button
            onClick={async () => {
              const photos = await getAll(photosCollection);
              console.log("[FIRESTORE] PHOTOS", photos);
            }}
          >
            Get all photos to console.
          </Button>

          <Button
            onClick={async () => {
              /* const photos = await updatePhotosWithTagsArrField(
                db.collection("photos")
              ); */

              const result = await photosCollection
                .where("tags.Ql2r2DFzzjZnzP2adh9Z", "==", true)
                .where("yearsOld", "==", 0)
                .orderBy("date")
                .limit(100)
                .get(); //orderBy("_timestamp")
              console.log("SUCCESS GET");
              const res = new Map();

              result.docs.map(item => {
                res.set(item.id, item.data());
              });

              console.log(res);

              //const photosMap = resFirestoreToMapObj(photos);
              //console.log("[FIRESTORE] TEST", photosMap);
            }}
          >
            Test firestore.
          </Button>
        </div>
        <div style={{ padding: "20px", border: "2px solid cyan" }}>
          <Photos />
        </div>
        <Alert />
      </>
    </Provider>
  );
};
