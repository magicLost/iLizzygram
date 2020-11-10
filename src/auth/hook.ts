import firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import { IUserResponseToClient } from "../types";

export const useInit = (
  auth: (user: IUserResponseToClient) => void,
  onError?: Function,
  onSuccess?: Function
) => {
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          // User is signed in.
          /*  var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;  */

          auth({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          });

          if (onSuccess) onSuccess();
          // ...
        } else {
          // User is signed out.
          // ...
          auth(undefined);
        }
      },
      err => {
        auth(undefined);
        if (onError) onError(err.message);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
};
