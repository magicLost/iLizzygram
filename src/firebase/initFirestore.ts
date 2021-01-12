import firebase from "firebase/app";
import "firebase/firebase-firestore";
import { photosCollectionName, tagsCollectionName } from "../config";

//CONFIG FIREBASE

export let db;

export let photosCollection;
export let tagsCollection;

export const getFirestoreDb = () => {
  /* if (typeof window !== "undefined") {
    db = firebase.firestore();
  } */

  if (!db) {
    db = firebase.firestore();
  }

  return db;
};

const setFirestoreDb = () => {
  if (!db) {
    db = firebase.firestore();
  }
};

export const getPhotosCollection = () => {
  setFirestoreDb();

  if (!photosCollection) {
    photosCollection = db.collection(photosCollectionName);
    tagsCollection = db.collection(tagsCollectionName);
  }

  return photosCollection;
};

export const getTagsCollection = () => {
  setFirestoreDb();

  if (!tagsCollection) {
    tagsCollection = db.collection(tagsCollectionName);
  }

  return tagsCollection;
};

//if (apps && !apps.length) initializeApp(firebaseConfig);

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
