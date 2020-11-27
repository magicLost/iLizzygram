import { Action, Reducer } from "redux";
import { IUserResponseToClient } from "./../types";

// STORE
export type TAuthActionTypes =
  | "AUTH"
  | "LOGIN_REQUEST"
  | "LOGIN_REQUEST_SUCCESS"
  | "LOGIN_REQUEST_ERROR"
  | "LOGOUT_REQUEST"
  | "LOGOUT_REQUEST_SUCCESS"
  | "LOGOUT_REQUEST_ERROR";

/*   | "FORGET_PASS_REQUEST"
  | "FORGET_PASS_SUCCESS"
  | "FORGET_PASS_ERROR" */

export interface IAuthState {
  user: IUserResponseToClient | undefined;
  authLoading: boolean;
  loginLoading: boolean;
  logoutLoading: boolean;
  //forgetPassLoading: boolean;
  loginError: boolean;
  logoutError: boolean;
  //forgetPassError: boolean;
}

export interface IAuthAction extends Action<TAuthActionTypes> {
  user?: IUserResponseToClient;
  isEditor?: boolean;
}

// FORM
export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IForgetPassFormData {
  email: string;
}
