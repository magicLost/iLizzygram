import { Reducer } from "redux";
import { IAuthState, IAuthAction } from "./../types";

//export const localStorageKey = "lg_super_puper_user";

const authInitialState: IAuthState = {
  user: undefined,
  authLoading: true,
  loginLoading: false,
  logoutLoading: false,
  forgetPassLoading: false,
  loginError: false,
  logoutError: false,
  forgetPassError: false,
};

const reducer: Reducer<IAuthState, IAuthAction> = (
  state = authInitialState,
  action: IAuthAction
) => {
  switch (action.type) {
    case "AUTH":
      return {
        ...state,
        user: action.user,
        authLoading: false,
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        loginLoading: true,
        loginError: false,
      };
    case "LOGIN_REQUEST_SUCCESS":
      return {
        ...state,
        user: { ...state.user, isEditor: action.isEditor },
        loginLoading: false,
        loginError: false,
      };
    case "LOGIN_REQUEST_ERROR":
      return {
        ...state,
        loginLoading: false,
        loginError: true,
      };
    case "LOGOUT_REQUEST":
      return {
        ...state,
        logoutLoading: true,
        logoutError: false,
      };
    case "LOGOUT_REQUEST_SUCCESS":
      return {
        ...state,
        logoutLoading: false,
        logoutError: false,
      };
    case "LOGOUT_REQUEST_ERROR":
      return {
        ...state,
        logoutLoading: false,
        logoutError: true,
      };
    case "FORGET_PASS_REQUEST":
      return {
        ...state,
        forgetPassLoading: true,
        forgetPassError: false,
      };
    case "FORGET_PASS_SUCCESS":
      return {
        ...state,
        forgetPassLoading: false,
        forgetPassError: false,
      };
    case "FORGET_PASS_ERROR":
      return {
        ...state,
        forgetPassLoading: false,
        forgetPassError: true,
      };
    default:
      return state;
  }
};

export default reducer;
