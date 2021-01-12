import { Reducer } from "redux";
import { IModalState, IModalAction } from "./../types";

const modalInitialState: IModalState = {
  openSlider: false,
  openEditForm: false,
  openAddForm: false,
  //openLoginForm: false,
  openSearch: false,
  //openForgetPassForm: false,
  initActiveIndex: 0,
  photo: undefined,
};

const reducer: Reducer<IModalState, IModalAction> = (
  state = modalInitialState,
  action: IModalAction
) => {
  switch (action.type) {
    case "SHOW_PHOTO_SLIDER":
      return {
        ...state,
        openSlider: true,
        photo: action.photo,
        initActiveIndex: action.initActiveIndex,
      };

    case "HIDE_PHOTO_SLIDER":
      return {
        ...state,
        openSlider: false,
      };

    /*  case "SHOW_LOGIN_FORM":
      return {
        ...state,
        openLoginForm: true,
      };

    case "HIDE_LOGIN_FORM":
      return {
        ...state,
        openLoginForm: false,
      }; */

    case "SHOW_ADD_FORM":
      return {
        ...state,
        openAddForm: true,
      };

    case "HIDE_ADD_FORM":
      return {
        ...state,
        openAddForm: false,
      };

    case "SHOW_EDIT_FORM":
      return {
        ...state,
        photo: action.photo,
        openEditForm: true,
      };

    case "HIDE_EDIT_FORM":
      return {
        ...state,
        openEditForm: false,
      };

    case "SHOW_SEARCH_FORM":
      return {
        ...state,
        openSearch: true,
      };

    case "HIDE_SEARCH_FORM":
      return {
        ...state,
        openSearch: false,
      };

    /*   case "SHOW_FORGET_PASS_FORM":
      return {
        ...state,
        openForgetPassForm: true,
      };

    case "HIDE_FORGET_PASS_FORM":
      return {
        ...state,
        openForgetPassForm: false,
      }; */

    default:
      return state;
  }
};

export default reducer;
