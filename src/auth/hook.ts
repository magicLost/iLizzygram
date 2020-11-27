import firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import { IUserResponseToClient, IAuthUser } from "../types";
import { authLocalStorageKey, usersCollectionName } from "../config";
import { db } from "../container/ReduxWrapper";

const setIsEditorAndSave = async (
  user: firebase.User,
  refNewUser: IAuthUser
) => {
  const res = await db.collection(usersCollectionName).doc(user.uid).get();
  refNewUser.isEditor = res.exists;

  localStorage.setItem(authLocalStorageKey, JSON.stringify(refNewUser));
};

export const useInit = (
  auth: (user: IAuthUser) => void,
  onError?: Function,
  onSuccess?: Function
) => {
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      async user => {
        if (user) {
          //console.log("AUTH SUCCESS", user);

          const newUser: IAuthUser = {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            isEditor: false,
          };

          const savedUser = localStorage.getItem(authLocalStorageKey);

          if (savedUser) {
            const prevUser = JSON.parse(savedUser);

            if (prevUser.uid === newUser.uid) {
              newUser.isEditor = prevUser.isEditor;
            } else {
              setIsEditorAndSave(user, newUser);

              /*  const res = await db
                .collection(usersCollectionName)
                .doc(user.uid)
                .get();
              newUser.isEditor = res.exists;

              localStorage.setItem(
                authLocalStorageKey,
                JSON.stringify(newUser)
              ); */
            }
          } else {
            setIsEditorAndSave(user, newUser);
            /* const res = await db
              .collection(usersCollectionName)
              .doc(user.uid)
              .get();
            newUser.isEditor = res.exists;

            localStorage.setItem(authLocalStorageKey, JSON.stringify(newUser)); */
          }

          auth(newUser);

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
