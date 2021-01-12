import firebase from "firebase/app";
import { firebaseConfig } from "../config";

//CONFIG FIREBASE

export const initApp = () => {
  if (firebase.apps && !firebase.apps.length)
    firebase.initializeApp(firebaseConfig);
};
