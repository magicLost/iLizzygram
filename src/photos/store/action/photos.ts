import {
  IPhotosAction,
  IPhotosState,
  ISearchState,
  TPhotoData,
} from "../../types";
import { photosCollection } from "../../../container/ReduxWrapper";
import axios from "axios";
import { IAddPhotoFormData } from "../../types";
import { IEditPhotoFormData } from "../../types";
import { makeAddPhotoData, makeEditPhotoData, isInSearchTerms } from "../utils";
import { addPhotoUrl, editPhotoUrl } from "../../../config";
import { makeNewPhotoStateItems, makePhotoFormData } from "./helper";
import { IPhotoData } from "../../../types";
import random from "lodash.random";

export const allPhotosStartRequestAC = (): IPhotosAction => {
  return {
    type: "ALL_PHOTOS_START_REQUEST",
  };
};

export const allPhotosRequestSuccessAC = (
  photos: TPhotoData,
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
  photos: TPhotoData,
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

export const editPhotoAC = (photo: IPhotoData): IPhotosAction => {
  return {
    type: "EDIT_PHOTO",
    photo,
  };
};

export const addPhotoAC = (photo: IPhotoData): IPhotosAction => {
  return {
    type: "ADD_PHOTO",
    photo,
  };
};

export const fetchPhotosAC = (query: any, isFetchMore: boolean = false) => {
  return async dispatch => {
    try {
      dispatch(allPhotosStartRequestAC());

      const querySnapshot = await query.get();

      console.log("PHOTOS SUCCESS", querySnapshot.size);
      //const photoData: TPhotoData = new Map();

      const { hasNextPage, nextPageDocRef, photos } = makeNewPhotoStateItems(
        querySnapshot
      );

      if (isFetchMore)
        dispatch(
          fetchMorePhotosRequestSuccessAC(photos, nextPageDocRef, hasNextPage)
        );
      else
        dispatch(
          allPhotosRequestSuccessAC(photos, nextPageDocRef, hasNextPage)
        );
    } catch (err) {
      dispatch(allPhotosRequestErrorAC());
    }
  };
};

export const addPhotoToFirestoreAC = (
  photoFormData: IAddPhotoFormData,
  userUid: string,
  onSuccess?: any,
  onError?: any
) => {
  return async dispatch => {
    try {
      const photo = makeAddPhotoData(photoFormData);
      photo.addedByUserUID = userUid;
      dispatch(addPhotoStartRequestAC());

      //SAVE PHOTO DATA TO FIRESTORE
      const id = (photoFormData.date.getTime() + random(69999)).toString();
      await photosCollection.doc(id).set(photo);

      //SEND PHOTO FILE TO EXPRESS

      const formData = makePhotoFormData({
        id,
        file: photoFormData.photoFile[0],
        userUid,
      });

      const res = await axios.post(addPhotoUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("ADD RESPONSE", res);

      if (res.data.status === "error") {
        throw new Error(`Error on add photo - ${res.data.data}`);
      }

      console.log("success axios request ");
      //show success or error alert
      dispatch(addPhotoRequestSuccessAC());
      if (onSuccess) onSuccess();
    } catch (err) {
      dispatch(addPhotoRequestErrorAC());
      if (onError) onError();
    }
  };
};

export const editPhotoToFirestoreAC = (
  photoId: string,
  photoFormData: IEditPhotoFormData,
  searchState: ISearchState,
  userUid: string,
  onSuccess?: any,
  onError?: any
) => {
  return async dispatch => {
    try {
      dispatch(editPhotoStartRequestAC());

      // DO WE HAVE ANY FIRESTORE FIELDS TO UPDATE
      const photo = makeEditPhotoData(photoFormData);

      if (Object.keys(photo).length > 0) {
        await photosCollection.doc(photoId).update(photo);
      }

      // DO WE HAVE FILE TO UPDATE
      if (photoFormData.photoFile && photoFormData.photoFile.length > 0) {
        //send photo file to express
        const formData = makePhotoFormData({
          id: photoId,
          file: photoFormData.photoFile[0],
          userUid,
        });

        const res = await axios.post(addPhotoUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("EDIT RESPONSE", res);

        if (res.data.status === "error") {
          throw new Error(`Error on edit photo - ${res.data.data}`);
        }
      }

      //show success or error alert

      //we must compare photoFormData.tags with serchState.tags
      //and if in photoFormData.tags different tags - we must remove
      // photo from state
      if (isInSearchTerms(searchState, photo)) {
        dispatch(editPhotoRequestSuccessAC());
      } else {
        dispatch(editPhotoRequestSuccessAC(photoId));
      }

      if (onSuccess) onSuccess();

      /* else {
        await photosCollection.doc(photoId).update(photo);

        if (isInSearchTerms(searchState, photo)) {
          dispatch(editPhotoRequestSuccessAC());
        } else {
          dispatch(editPhotoRequestSuccessAC(photoId));
        }

        if (onSuccess) onSuccess();
      } */
    } catch (err) {
      dispatch(editPhotoRequestErrorAC());
      if (onError) onError();
    }
  };
};
