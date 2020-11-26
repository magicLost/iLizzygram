import * as firebase from "firebase/app";
import "firebase/auth";
import { IAuthAction } from "./../types";
import { IAuthUser } from "./../../types";
import { ILoginFormData } from "../types";
import { db } from "./../../container/ReduxWrapper";
import { usersCollectionName } from "./../../config";

export const authAC = (user: IAuthUser): IAuthAction => {
  return {
    type: "AUTH",
    user,
  };
};

export const loginRequestAC = (): IAuthAction => {
  return {
    type: "LOGIN_REQUEST",
  };
};

export const loginRequestSuccessAC = (isEditor: boolean): IAuthAction => {
  return {
    type: "LOGIN_REQUEST_SUCCESS",
    isEditor,
  };
};

export const loginRequestErrorAC = (): IAuthAction => {
  return {
    type: "LOGIN_REQUEST_ERROR",
  };
};

export const logoutRequestAC = (): IAuthAction => {
  return {
    type: "LOGOUT_REQUEST",
  };
};

export const logoutRequestSuccessAC = (): IAuthAction => {
  return {
    type: "LOGOUT_REQUEST_SUCCESS",
  };
};

export const logoutRequestErrorAC = (): IAuthAction => {
  return {
    type: "LOGOUT_REQUEST_ERROR",
  };
};

export const forgetPassRequestAC = (): IAuthAction => {
  return {
    type: "FORGET_PASS_REQUEST",
  };
};

export const forgetPassRequestSuccessAC = (): IAuthAction => {
  return {
    type: "FORGET_PASS_SUCCESS",
  };
};

export const forgetPassRequestErrorAC = (): IAuthAction => {
  return {
    type: "FORGET_PASS_ERROR",
  };
};

export const loginAC = (
  data: ILoginFormData,
  onError?: Function,
  onSuccess?: Function
) => {
  return async (dispatch: any) => {
    try {
      dispatch(loginRequestAC());

      //TODO request to auth to firebase
      const { email, password } = data;
      const userData = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      let isEditor = false;
      if (userData) {
        const res = await db
          .collection(usersCollectionName)
          .doc(userData.user.uid)
          .get();
        isEditor = res.exists;
      }

      dispatch(loginRequestSuccessAC(isEditor));
      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError(err.code);
      dispatch(loginRequestErrorAC());
    }
  };
};

export const logoutAC = (onError?: Function, onSuccess?: Function) => {
  return async (dispatch: any) => {
    try {
      dispatch(logoutRequestAC());

      //TODO request to auth to firebase
      await firebase.auth().signOut();

      dispatch(logoutRequestSuccessAC());

      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError();
      dispatch(logoutRequestErrorAC());
    }
  };
};

export const forgetPassAC = (
  email: string,
  onError?: Function,
  onSuccess?: Function
) => {
  return async (dispatch: any) => {
    try {
      dispatch(forgetPassRequestAC());

      //TODO request to auth to firebase
      await firebase.auth().sendPasswordResetEmail(email);

      //console.log("SUCCESS", data.docs.length);
      dispatch(forgetPassRequestSuccessAC());
      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError();
      dispatch(forgetPassRequestErrorAC());
    }
  };
};
