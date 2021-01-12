import { IPhotosAction, TPhotosData } from "../../types";
import { TPhotoData } from "../../types";

export const allPhotosStartNewRequestAC = (): IPhotosAction => {
  return {
    type: "ALL_PHOTOS_START_NEW_REQUEST",
  };
};

export const allPhotosStartMoreRequestAC = (): IPhotosAction => {
  return {
    type: "ALL_PHOTOS_START_MORE_REQUEST",
  };
};

export const allPhotosRequestSuccessAC = (
  photos: TPhotosData,
  nextPageDocRef: any,
  hasNextPage: boolean
): IPhotosAction => {
  return {
    type: "ALL_PHOTOS_REQUEST_SUCCESS",
    photos,
    nextPageDocRef,
    hasNextPage,
  };
};

export const fetchMorePhotosRequestSuccessAC = (
  photos: TPhotosData,
  nextPageDocRef: any,
  hasNextPage: boolean
): IPhotosAction => {
  return {
    type: "FETCH_MORE_PHOTO_REQUEST_SUCCESS",
    photos,
    nextPageDocRef,
    hasNextPage,
  };
};

export const allPhotosRequestErrorAC = (): IPhotosAction => {
  return {
    type: "ALL_PHOTOS_REQUEST_ERROR",
  };
};

export const addPhotoStartRequestAC = (): IPhotosAction => {
  return {
    type: "ADD_PHOTO_START_REQUEST",
  };
};

export const addPhotoRequestSuccessAC = (): IPhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_SUCCESS",
  };
};

export const addPhotoRequestErrorAC = (): IPhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_ERROR",
  };
};

export const editPhotoStartRequestAC = (): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_START_REQUEST",
  };
};

export const editPhotoRequestSuccessAC = (photoId?: string): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_SUCCESS",
    photoId,
  };
};

export const editPhotoRequestErrorAC = (): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_ERROR",
  };
};

export const editPhotoAC = (photo: TPhotoData): IPhotosAction => {
  return {
    type: "EDIT_PHOTO",
    photo,
  };
};

export const addPhotoAC = (photo: TPhotoData): IPhotosAction => {
  return {
    type: "ADD_PHOTO",
    photo,
  };
};

export const deletePhotoAC = (photoId: string): IPhotosAction => {
  return {
    type: "DELETE_PHOTO",
    photoId,
  };
};
