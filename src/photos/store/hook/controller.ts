/* import {
  IAddPhotoFormData,
  IEditPhotoFormData,
  IPhotosAction,
  IPhotosState,
  ISearchState,
  TPhotosData,
} from "../../types"; */
import { getPhotosCollection } from "../../../firebase/initFirestore";
import { post } from "./../../../utils/Fetch";
//import axios from "axios";
//import { IAddPhotoFormData } from "../../types";
//import { IEditPhotoFormData } from "../../types";

import {
  addPhotoUrl,
  editPhotoUrl,
  limitPhotosPerQuery as limit,
} from "../../../config";
import {
  makeNewPhotoStateItems,
  makePhotoFormData,
  makeAddPhotoData,
  makeEditPhotoData,
  isInSearchTerms,
} from "./helper/DataHelper";
import { makeQuery } from "./helper/QueryHelper";
import random from "lodash.random";
import {
  allPhotosStartNewRequestAC,
  allPhotosStartMoreRequestAC,
  fetchMorePhotosRequestSuccessAC,
  allPhotosRequestSuccessAC,
  allPhotosRequestErrorAC,
  addPhotoStartRequestAC,
  addPhotoRequestSuccessAC,
  addPhotoRequestErrorAC,
  editPhotoStartRequestAC,
  editPhotoRequestSuccessAC,
  editPhotoRequestErrorAC,
} from "./../action/photos";

//export const limit = 1;
let gQuery: any = undefined;

export const fetchPhotos = async (
  dispatch: any,
  query: any,
  isFetchMore: boolean = false
) => {
  try {
    if (!isFetchMore) dispatch(allPhotosStartNewRequestAC());
    else dispatch(allPhotosStartMoreRequestAC());

    const querySnapshot = await query.get();

    console.log("PHOTOS SUCCESS", querySnapshot.size);
    //const photoData: TPhotosData = new Map();

    const { hasNextPage, nextPageDocRef, photos } = makeNewPhotoStateItems(
      querySnapshot,
      limit
    );

    if (isFetchMore)
      dispatch(
        fetchMorePhotosRequestSuccessAC(photos, nextPageDocRef, hasNextPage)
      );
    else
      dispatch(allPhotosRequestSuccessAC(photos, nextPageDocRef, hasNextPage));
  } catch (err) {
    dispatch(allPhotosRequestErrorAC());
  }
};

export const loadPhotos = async (dispatch: any, searchState: ISearchState) => {
  gQuery = makeQuery(searchState, getPhotosCollection());

  fetchPhotos(dispatch, gQuery.limit(limit + 1), false);
};

export const fetchMore = (dispatch: any, nextPageDocRef: any) => {
  if (!nextPageDocRef) throw new Error("No NEXT PAGE REF...");

  fetchPhotos(dispatch, gQuery.startAt(nextPageDocRef).limit(limit + 1), true);
};

/* export const save = () => {
  const abortController = new AbortController();

  const signal = abortController.signal;

  return abortController;
} */

export const saveNewPhoto = async (
  dispatch: any,
  photoFormData: IAddPhotoFormData,
  userUid: string,
  onSuccess?: any,
  onError?: any
) => {
  try {
    const photo = makeAddPhotoData(photoFormData);
    photo.addedByUserUID = userUid;
    dispatch(addPhotoStartRequestAC());

    //SAVE PHOTO DATA TO FIRESTORE
    const id = (photoFormData.date.getTime() + random(69999)).toString();
    await getPhotosCollection().doc(id).set(photo);

    //SEND PHOTO FILE TO EXPRESS

    const formData = makePhotoFormData({
      id,
      userUid,
      file: photoFormData.photoFile[0],
    });

    const res = await post(addPhotoUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("ADD RESPONSE", res);

    const data = await res.json();

    if (data.status === "error") {
      throw new Error(`Error on add photo - ${data.data}`);
    }

    console.log("success axios request ");
    //show success or error alert
    dispatch(addPhotoRequestSuccessAC());
    if (onSuccess) onSuccess();
  } catch (err) {
    //console.log(err);
    dispatch(addPhotoRequestErrorAC());
    if (onError) onError();
  }
};

export const saveEditedPhoto = async (
  dispatch: any,
  photoId: string,
  photoFormData: IEditPhotoFormData,
  searchState: ISearchState,
  userUid: string,
  onSuccess?: any,
  onError?: any
) => {
  try {
    dispatch(editPhotoStartRequestAC());

    // DO WE HAVE ANY FIRESTORE FIELDS TO UPDATE
    const photo = makeEditPhotoData(photoFormData);

    if (Object.keys(photo).length > 0) {
      await getPhotosCollection().doc(photoId).update(photo);
    }

    // DO WE HAVE FILE TO UPDATE
    if (photoFormData.photoFile && photoFormData.photoFile.length > 0) {
      //send photo file to express
      const formData = makePhotoFormData({
        id: photoId,
        file: photoFormData.photoFile[0],
        userUid,
      });

      const res = await post(editPhotoUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("EDIT RESPONSE", res);

      const data = await res.json();

      if (data.status === "error") {
        throw new Error(`Error on edit photo - ${data.data}`);
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
