import { limit } from "./../ihook";
import { TPhotoData } from "../../types";
import { IAddEditPhotoPostRequest } from "./../../../types";

export const makePhotoFormData = (data: IAddEditPhotoPostRequest) => {
  const formData = new FormData();

  formData.append("file", data.file);
  formData.append("id", data.id);
  formData.append("userUid", data.userUid);

  return formData;
};

export const makeNewPhotoStateItems = (
  querySnapshot: any
): { hasNextPage: boolean; nextPageDocRef: any; photos: TPhotoData } => {
  let hasNextPage = false;

  let nextPageDocRef = undefined;

  let count = 0;

  const photoData: TPhotoData = new Map();

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
