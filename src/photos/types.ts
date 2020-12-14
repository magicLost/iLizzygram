import { IPhoto } from "./../types";
import { Action } from "redux";

// STORE

// SEARCH

export type TSearchActionTypes = "SET_SEARCH_STATE";

export interface ISearchState {
  tagsIds: string[];
  yearsOld: number;
  //minDate: Date;
  //maxDate: Date;
  //orderBy: "desc" | "";
}

export interface ISearchAction extends Action<TSearchActionTypes> {
  state: ISearchState;
  /* tagsIds: string[];
  minDate?: Date;
  maxDate?: Date;
  orderBy: "desc" | ""; */
}

// PHOTOS

export type TPhotosActionTypes =
  | "ADD_PHOTO"
  | "EDIT_PHOTO"
  | "DELETE_PHOTO"
  | "ADD_PHOTO_START_REQUEST"
  | "ADD_PHOTO_REQUEST_SUCCESS"
  | "ADD_PHOTO_REQUEST_ERROR"
  | "ALL_PHOTOS_START_REQUEST"
  | "ALL_PHOTOS_REQUEST_SUCCESS"
  | "ALL_PHOTOS_REQUEST_ERROR"
  | "EDIT_PHOTO_START_REQUEST"
  | "EDIT_PHOTO_REQUEST_SUCCESS"
  | "EDIT_PHOTO_REQUEST_ERROR"
  | "FETCH_MORE_PHOTO_START_REQUEST"
  | "FETCH_MORE_PHOTO_REQUEST_SUCCESS"
  | "FETCH_MORE_PHOTO_REQUEST_ERROR";

export type TPhotoFirestoreResponse = {
  data: () => IPhoto;
  id: string;
};

export type TPhotosData = Map<string, IPhoto>;

export type TPhotoData = {
  id: string;
  photo: IPhoto;
};

export interface IPhotosState {
  hasNextPage: boolean;
  nextPageDocRef: any;
  photos: TPhotosData | undefined;
  loading: boolean;
  error: boolean;
  addLoading: boolean;
  addError: boolean;
  editLoading: boolean;
  editError: boolean;
}

export interface IPhotosAction extends Action<TPhotosActionTypes> {
  photos?: TPhotosData;
  photo?: TPhotoData;
  photoId?: string;
  hasNextPage?: boolean;
  nextPageDocRef?: any;
}

export type TAllPhotosFetchFunc = (searchTerms: any) => (dispatch: any) => void;

export type TAddFormFetchFunc = (
  photoFormData: IAddPhotoFormData,
  onSuccess?: any,
  onError?: any
) => (dispatch: any) => void;

/* export type TEditFormFetchFunc = (
  photoId: string,
  photoFormData: IEditPhotoFormData,
  onSuccess?: any,
  onError?: any
) => (dispatch: any) => void; */

// FORMS

/* export const makeEditPhotoData = (
  formData: IEditPhotoFormData
  //operationType: "edit" | "add"
) => {
  const fieldsToUpdate: any = {};
  if (formData.date) {
    fieldsToUpdate.date = formData.date;
    fieldsToUpdate.yearsOld = getYearsOld(formData.date);
  }
  if (formData.tags) fieldsToUpdate.tags = getOnlyTrueTags(formData.tags);
  if (formData.desc) fieldsToUpdate.description = formData.desc;

  if (formData.photoFile && formData.photoFile.length > 0)
    fieldsToUpdate.isActive = false;

  return fieldsToUpdate;
};
 */
export interface IEditPhotoData {
  description?: string;
  date?: Date;
  photoFile?: FileList;
  isActive?: boolean;
  yearsOld?: number;
  tags?: { [name: string]: boolean };
}

export interface IEditPhotoFormData {
  desc?: string;
  date?: Date;
  photoFile?: FileList;
  tags?: { [name: string]: boolean };
}

export interface IAddPhotoFormData {
  desc: string;
  date: Date;
  photoFile: FileList;
  tags: { [name: string]: boolean };
}

export interface ISearchFormData {
  ages: number;
  tags: { [name: string]: boolean };
}
