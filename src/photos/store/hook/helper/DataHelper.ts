import { IAddEditPhotoPostRequest, IPhoto } from "./../../../../types";

import { getYearsOld } from "../../../../utils";
import {
  IAddPhotoFormData,
  IEditPhotoFormData,
  ISearchState,
  IEditPhotoData,
  TPhotosData,
} from "./../../../types";
import { searchInitialState } from "./../../../store/reducer/search";

export const makePhotoFormData = (data: IAddEditPhotoPostRequest) => {
  const formData = new FormData();

  formData.append("id", data.id);
  formData.append("userUid", data.userUid);
  formData.append("file", data.file);

  return formData;
};

export const makeNewPhotoStateItems = (
  querySnapshot: any,
  limit: number
): { hasNextPage: boolean; nextPageDocRef: any; photos: TPhotosData } => {
  let hasNextPage = false;

  let nextPageDocRef = undefined;

  let count = 0;

  const photoData: TPhotosData = new Map();

  querySnapshot.forEach(photo => {
    if (count >= limit) {
      hasNextPage = true;
      nextPageDocRef = photo;
    } else {
      photoData.set(photo.id, photo.data());
      count++;
    }
  });

  return {
    hasNextPage,
    nextPageDocRef,
    photos: photoData,
  };
};

export const getOnlyTrueTags = (tags: { [name: string]: boolean }) => {
  const result = {};
  for (let id in tags) {
    if (tags[id] === true) {
      result[id] = true;
    }
  }

  return result;
};

export const makeAddPhotoData = (
  formData: IAddPhotoFormData
  //operationType: "edit" | "add"
): IPhoto => {
  const description = formData.desc ? formData.desc : "";

  const tags = getOnlyTrueTags(formData.tags);

  const yearsOld = getYearsOld(formData.date);

  const _timestamp = new Date();

  return {
    date: formData.date,
    tags,
    yearsOld,
    description,
    base64: "",
    files: [],
    aspectRatio: 0,
    srcSet: "",
    iconSrc: "",
    src: "",
    _timestamp,
    googleDriveId: "",
    addedByUserUID: "",
    isActive: false,
  };
};

export const makeEditPhotoData = (
  formData: IEditPhotoFormData
  //operationType: "edit" | "add"
): IEditPhotoData => {
  const fieldsToUpdate: any = {};
  if (formData.date) {
    fieldsToUpdate.date = formData.date;
    fieldsToUpdate.yearsOld = getYearsOld(formData.date);
  }
  if (formData.tags) fieldsToUpdate.tags = getOnlyTrueTags(formData.tags);
  if (formData.desc) fieldsToUpdate.description = formData.desc;

  /* if (formData.photoFile && formData.photoFile.length > 0)
    fieldsToUpdate.isActive = false; */

  return fieldsToUpdate;
};

export const isInSearchTerms = (
  searchState: ISearchState,
  photo: IEditPhotoData
) => {
  if (photo.yearsOld) {
    if (searchState.yearsOld >= 0 && searchState.yearsOld !== photo.yearsOld)
      return false;
  }

  if (photo.tags) {
    if (searchState.tagsIds.length === 0) {
      return true;
    } else {
      let is = true;
      for (let tagId of searchState.tagsIds) {
        if (!photo.tags[tagId]) {
          return false;
        }
      }

      return is;
    }
  }

  return true;

  /*   if (searchState.yearsOld >= 0 && searchState.yearsOld !== photo.yearsOld)
    return false; */
};
