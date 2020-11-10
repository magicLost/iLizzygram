import { localStorageKey } from "../reducer/auth";
import { IUserResponseToClient } from "./../../types";

export const getUserFormLocalStorage = ():
  | IUserResponseToClient
  | undefined => {
  let userData: any = window.localStorage.getItem(localStorageKey);

  userData = userData ? JSON.parse(userData) : undefined;

  return userData;
};

export const saveUserToLocalStorage = (user: IUserResponseToClient) => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(user));
};
