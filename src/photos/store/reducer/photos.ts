import { Reducer } from "redux";
import { IPhotosState, IPhotosAction } from "../../types";
import { onFetchMorePhotosRequestSuccess } from "./helper";

const photosInitialState: IPhotosState = {
  nextPageDocRef: undefined,
  hasNextPage: false,
  photos: undefined,
  loading: false,
  error: false,
  addLoading: false,
  addError: false,
  editLoading: false,
  editError: false,
};

const reducer: Reducer<IPhotosState, IPhotosAction> = (
  state = photosInitialState,
  action: IPhotosAction
) => {
  switch (action.type) {
    case "ALL_PHOTOS_START_NEW_REQUEST":
      return {
        ...state,
        photos: undefined,
        loading: true,
        error: false,
      };
    case "ALL_PHOTOS_START_MORE_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "ALL_PHOTOS_REQUEST_SUCCESS":
      return {
        ...state,
        photos: action.photos,
        loading: false,
        error: false,
        nextPageDocRef: action.nextPageDocRef,
        hasNextPage: action.hasNextPage,
      };

    case "FETCH_MORE_PHOTO_REQUEST_SUCCESS":
      return onFetchMorePhotosRequestSuccess(state, action);

    case "ALL_PHOTOS_REQUEST_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "ADD_PHOTO_START_REQUEST":
      return {
        ...state,
        addLoading: true,
        addError: false,
      };
    case "ADD_PHOTO_REQUEST_SUCCESS":
      return {
        ...state,
        addLoading: false,
        addError: false,
      };
    case "ADD_PHOTO_REQUEST_ERROR":
      return {
        ...state,
        addLoading: false,
        addError: true,
      };

    case "EDIT_PHOTO_START_REQUEST":
      return {
        ...state,
        editLoading: true,
        editError: false,
      };
    case "EDIT_PHOTO_REQUEST_SUCCESS":
      if (action.photoId) {
        const photos2 = state.photos;
        photos2.delete(action.photoId);
        const newPhotos2 = new Map(photos2);
        return {
          ...state,
          photos: newPhotos2,
          editLoading: false,
          editError: false,
        };
      } else {
        return {
          ...state,
          editLoading: false,
          editError: false,
        };
      }
    case "EDIT_PHOTO_REQUEST_ERROR":
      return {
        ...state,
        editLoading: false,
        editError: true,
      };

    case "ADD_PHOTO":
      //const photos = state.photos;
      //photos.set(action.photo.id, action.photo.photo);
      const newPhotos = new Map([
        [action.photo.id, action.photo.photo],
        ...state.photos,
      ]);
      return {
        ...state,
        photos: newPhotos,
      };

    case "EDIT_PHOTO":
      const photos1 = state.photos;
      photos1.set(action.photo.id, action.photo.photo);
      const newPhotos1 = new Map(photos1);

      console.log("EDIT_PHOTO", newPhotos1);
      return {
        ...state,
        photos: newPhotos1,
      };

    case "DELETE_PHOTO":
      const allPhotos = state.photos;
      allPhotos.delete(action.photoId);

      const newPhotos3 = new Map(allPhotos);

      console.log("EDIT_PHOTO", newPhotos1);
      return {
        ...state,
        photos: newPhotos3,
      };

    default:
      return state;
  }
};

export default reducer;
