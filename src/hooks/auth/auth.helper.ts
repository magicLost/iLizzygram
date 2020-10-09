import {
  authVar,
  alertVar,
  modalVar,
  localStorageKey,
} from "../../apolloClient/cache";
import { IUserResponseToClient } from "./../../types";

export const checkSavedUser = () => {
  let userData: any = window.localStorage.getItem(localStorageKey);

  userData = userData ? JSON.parse(userData) : undefined;

  authVar({
    user: userData ? userData : undefined,
    loading: false,
  });
};

export const saveUser = (user: IUserResponseToClient) => {
  //set user to auth state
  authVar({
    user,
    loading: false,
  });
  //set user to localStorage
  window.localStorage.setItem(localStorageKey, JSON.stringify(user));
  //close login form
  /* modalVar({
    ...modalVar(),
  }); */
};
