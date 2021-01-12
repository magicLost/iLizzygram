import {
  authVar,
  alertVar,
  modalVar,
  localStorageKey,
} from "../../apolloClient/cache";
import { IUserResponseToClient } from "./../../../server/api/entity/User/User.model";

export const checkSavedUser = () => {
  let userData: any = window.localStorage.getItem(localStorageKey);

  userData = userData ? JSON.parse(userData) : undefined;

  authVar({
    user: userData ? userData : undefined,
    loading: false,
  });
};

export const onSuccessLogin = (user: IUserResponseToClient) => {
  //set user to auth state
  authVar({
    user,
    loading: false,
  });
  //set user to localStorage
  window.localStorage.setItem(localStorageKey, JSON.stringify(user));
  //close login form
  modalVar({
    ...modalVar(),
  });
};
