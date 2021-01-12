import firebase from "firebase/app";
import "firebase/auth";
import { Dispatch, useEffect } from "react";
import { IAuthUser } from "../../types";
import { authAC } from "./../store/action";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { IGlobalState } from "../../store/types";

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
  >(
    state => ({
      user: state.auth.user,
      loading: state.auth.loading,
    }),
    shallowEqual
  );

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
  dispatch: Dispatch<any>,
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
          isEditor: undefined,
        };

        console.log("AUTH SUCCESS new user", newUser);

        dispatch(authAC(newUser));

        if (onSuccess) onSuccess();
        // ...
      } else {
        console.log("NOT AUTH");
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
