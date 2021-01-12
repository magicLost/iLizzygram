//import { IModalState, IAlertState, ITagsState } from "./types";
import { IPhotosState, ISearchState } from "./../photos/types";
import { Action, Reducer } from "redux";
import { Color } from "@material-ui/lab/Alert";
import { IAuthState } from "./../auth/types";
import { TPhotoData } from "./../photos/types";
import { ICheckboxItemData } from "./../component/FormElements/TagsCheckbox";

export interface IGlobalState {
  modal: IModalState;
  alert: IAlertState;
  auth: IAuthState;
  tags: ITagsState;
  photos: IPhotosState;
  search: ISearchState;
}

// ACTIONS TYPES

export type TAlertActionTypes = "SHOW_ALERT" | "HIDE_ALERT";

export type TModalActionTypes =
  // | "SHOW_LOGIN_FORM"
  | "SHOW_ADD_FORM"
  | "SHOW_EDIT_FORM"
  | "SHOW_PHOTO_SLIDER"
  | "SHOW_SEARCH_FORM"
  // | "SHOW_FORGET_PASS_FORM"
  //  | "HIDE_LOGIN_FORM"
  | "HIDE_ADD_FORM"
  | "HIDE_EDIT_FORM"
  | "HIDE_PHOTO_SLIDER"
  | "HIDE_SEARCH_FORM";
// | "HIDE_FORGET_PASS_FORM"

export type TTagsActionTypes =
  | "TAGS_REQUEST"
  | "TAGS_REQUEST_SUCCESS"
  | "TAGS_REQUEST_ERROR";

// STATE INTERFACE

export interface IAlertState {
  isShow: boolean;
  type: Color;
  message: string;
}

export interface IModalState {
  openSlider: boolean;
  openEditForm: boolean;
  openAddForm: boolean;
  //openLoginForm: boolean;
  openSearch: boolean;
  // openForgetPassForm: boolean;
  initActiveIndex: number;
  photo: TPhotoData;
}

export type TTagsData = Map<string, ICheckboxItemData>;

export type TTagsFirestoreResponse = {
  data: () => ICheckboxItemData;
  id: string;
};

export interface ITagsState {
  tags: TTagsData | undefined;
  loading: boolean;
  error: boolean;
}

// ACTIONS

export interface IAlertAction extends Action<TAlertActionTypes> {
  alertType?: Color;
  message?: string;
}

export interface IModalAction extends Action<TModalActionTypes> {
  photo?: TPhotoData;
  initActiveIndex?: number;
}

export interface ITagsAction extends Action<TTagsActionTypes> {
  tags?: TTagsData;
}
