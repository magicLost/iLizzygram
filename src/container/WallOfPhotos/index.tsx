import React from "react";
import { TTagsData } from "../../store/types";
import { TPhotoData, TPhotosData } from "./../../photos/types";
import { useDispatch, useSelector } from "react-redux";
import { IGlobalState } from "../../store/types";
import WallOfPhotosWidget from "./WallOfPhotos";
import { usePhotos } from "../../photos/store/hook";
import { showPhotoSliderAC, showEditFormAC } from "../../store";

const getPhotoIndex = (eventTarget: EventTarget) => {
  //console.log("getPhotoIndex", eventTarget);
  const indexValue = (eventTarget as HTMLElement).dataset.index;
  const index = indexValue ? parseInt(indexValue) : -1;
  if (index === -1) throw new Error(`Bad bad image index === ${index}`);

  return index;
};

const getPhotoByIndex = (photos: TPhotosData, index: number): TPhotoData => {
  //@ts-ignore
  const entries = [...photos.entries()];

  return {
    id: entries[index][0],
    photo: entries[index][1],
  };
};

export const WallOfPhotos = () => {
  const {
    photoState: { photos, hasNextPage, loading, error },
    loadMore,
    reLoading,
  } = usePhotos();

  const dispatch = useDispatch();

  const showPhotoSlider = (event: any) => {
    // set active index
    // show photo slider
    const index = getPhotoIndex(event.target);

    const photo = getPhotoByIndex(photos, index);

    dispatch(showPhotoSliderAC(photo, index));
  };

  const showEditPhotoForm = (index: number) => {
    //const index = getPhotoIndex(eventTarget);

    const photo = getPhotoByIndex(photos, index);

    dispatch(showEditFormAC(photo));
  };

  const userUID = useSelector<IGlobalState, string>(state =>
    state.auth.user ? state.auth.user.uid : ""
  );

  console.log("[RENDER WALL_OF_PHOTS]");

  return (
    <WallOfPhotosWidget
      photos={photos}
      loadMorePhotos={loadMore}
      reLoadPhotos={reLoading}
      hasNextPage={hasNextPage}
      loading={loading}
      error={error}
      showPhotoSlider={showPhotoSlider}
      showEditPhotoForm={showEditPhotoForm}
      userUID={userUID}
    />
  );
};

export default WallOfPhotos;
