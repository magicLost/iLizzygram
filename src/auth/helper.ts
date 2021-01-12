import { IUserResponseToClient } from "./../types";
import { authLocalStorageKey } from "./../config";

export const getUserFromLocalStorage = () => {
  const savedData: string = window.localStorage.getItem(authLocalStorageKey);

  const userData: IUserResponseToClient = savedData
    ? JSON.parse(savedData)
    : undefined;

  return userData;
};

export const saveUserToLocalStorage = (user: IUserResponseToClient) => {
  //set user to localStorage
  window.localStorage.setItem(authLocalStorageKey, JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  //set user to localStorage
  window.localStorage.removeItem(authLocalStorageKey);
};
