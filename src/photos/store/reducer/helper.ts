import { IPhotosAction, IPhotosState, TPhotoData } from "../../types";

export const onFetchMorePhotosRequestSuccess = (
  state: IPhotosState,
  action: IPhotosAction
) => {
  // we combine photos in state with new photos
  const photos: TPhotoData = new Map([...state.photos, ...action.photos]);

  return {
    ...state,
    photos,
    loading: false,
    error: false,
    nextPageDocRef: action.nextPageDocRef,
    hasNextPage: action.hasNextPage,
  };
};
