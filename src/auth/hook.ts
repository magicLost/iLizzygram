import firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import { IUserResponseToClient, IAuthUser } from "../types";
import { authLocalStorageKey, usersCollectionName } from "../config";
import { db } from "../container/ReduxWrapper";
import { authAC } from "./store/action";
import { useDispatch, useSelector } from "react-redux";
import { IGlobalState } from "../store/types";

let unsubscribe = undefined;

export const useAuth = (
  //auth: (user: IAuthUser) => void,
  onError?: Function,
  onSuccess?: Function
) => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector<
    IGlobalState,
    {
      user: IAuthUser;
      loading: boolean;
    }
  >(state => ({
    user: state.auth.user,
    loading: state.auth.loading,
  }));

  useEffect(() => {
    console.log("USE AUTH SUBSCRIBE");

    if (unsubscribe === undefined) {
      console.log("MAKE AUTH SUBSCRIBE");
      unsubscribe = makeSubscribe(dispatch, onError, onSuccess);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
  };
};

const makeSubscribe = (
  dispatch: any,
  onError?: Function,
  onSuccess?: Function
) => {
  return firebase.auth().onAuthStateChanged(
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

        //console.log("AUTH SUCCESS saved user", savedUser);

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

        //console.log("AUTH SUCCESS new user", newUser);

        dispatch(authAC(newUser));

        if (onSuccess) onSuccess();
        // ...
      } else {
        // User is signed out.
        // ...
        dispatch(authAC(undefined));
      }
    },
    err => {
      dispatch(authAC(undefined));
      console.log("AUTH SUBSCRIBE ERROR", err);
      if (onError) onError(err.message);
      throw err;
    }
  );
};

const setIsEditorAndSave = async (
  user: firebase.User,
  refNewUser: IAuthUser
) => {
  try {
    const res = await db.collection(usersCollectionName).doc(user.uid).get();
    refNewUser.isEditor = res.exists;

    localStorage.setItem(authLocalStorageKey, JSON.stringify(refNewUser));
  } catch (err) {
    console.error("BAD REQUEST IS EDITOR", err);
  }
};

/* export const useInit = (
  //auth: (user: IAuthUser) => void,
  onError?: Function,
  onSuccess?: Function
) => {
  const dispatch = useDispatch();

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

          //console.log("AUTH SUCCESS saved user", savedUser);

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
              ); /
            }
          } else {
            setIsEditorAndSave(user, newUser);
            /* const res = await db
              .collection(usersCollectionName)
              .doc(user.uid)
              .get();
            newUser.isEditor = res.exists;

            localStorage.setItem(authLocalStorageKey, JSON.stringify(newUser)); /
          }

          //console.log("AUTH SUCCESS new user", newUser);

          dispatch(authAC(newUser));

          if (onSuccess) onSuccess();
          // ...
        } else {
          // User is signed out.
          // ...
          dispatch(authAC(undefined));
        }
      },
      err => {
        dispatch(authAC(undefined));
        console.log("AUTH SUBSCRIBE ERROR", err);
        if (onError) onError(err.message);
        throw err;
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
};
 */
