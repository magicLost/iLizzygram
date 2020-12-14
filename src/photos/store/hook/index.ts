import { useSelector, useDispatch } from "react-redux";
import {
  saveNewPhoto,
  saveEditedPhoto,
  loadPhotos,
  fetchMore,
} from "./controller";
import {
  IAddPhotoFormData,
  IEditPhotoFormData,
  IPhotosAction,
  IPhotosState,
  ISearchState,
  TPhotosData,
} from "../../types";
import { IGlobalState } from "./../../../store/types";
import { useEffect } from "react";

export const usePhotos = () => {
  const dispatch = useDispatch();

  const { photoState, searchState } = useSelector<
    IGlobalState,
    { photoState: IPhotosState; searchState: ISearchState }
  >(state => ({ photoState: state.photos, searchState: state.search }));

  useEffect(() => {
    if (!photoState.photos && !photoState.loading && !photoState.error) {
      console.log("[USE PHOTOS] USE EFFECT | FETCH PHOTOS");
      loadPhotos(dispatch, searchState);
    }
  }, []);

  const loadMore = () => {
    fetchMore(dispatch, photoState.nextPageDocRef);
  };

  const reLoading = () => {
    loadPhotos(dispatch, searchState);
  };

  return {
    photoState,
    loadMore,
    reLoading,
  };
};

export const useAddPhoto = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector<
    IGlobalState,
    { loading: boolean; error: boolean }
  >(state => ({
    loading: state.photos.addLoading,
    error: state.photos.addError,
  }));

  return {
    addPhoto: (
      photoFormData: IAddPhotoFormData,
      userUid: string,
      onSuccess?: any,
      onError?: any
    ) => saveNewPhoto(dispatch, photoFormData, userUid, onSuccess, onError),
    loading,
    error,
  };
};

export const useEditPhoto = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector<
    IGlobalState,
    { loading: boolean; error: boolean }
  >(state => ({
    loading: state.photos.editLoading,
    error: state.photos.editError,
  }));

  const searchState = useSelector<IGlobalState, ISearchState>(
    state => state.search
  );

  return {
    editPhoto: (
      photoId: string,
      photoFormData: IEditPhotoFormData,
      userUid: string,
      onSuccess?: any,
      onError?: any
    ) =>
      saveEditedPhoto(
        dispatch,
        photoId,
        photoFormData,
        searchState,
        userUid,
        onSuccess,
        onError
      ),
    loading,
    error,
  };
};
