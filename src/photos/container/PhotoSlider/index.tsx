import React from "react";
import { usePhotoSlider } from "./hooks";
import PhotoSliderWidget from "./PhotoSlider";

export const PhotoSlider = () => {
  const { photoState, loadMore, initActiveIndex } = usePhotoSlider();

  console.log("[PHOTO SLIDER] RENDER", initActiveIndex, photoState.loading);
  return (
    <PhotoSliderWidget
      photoState={photoState}
      loadMorePhotos={loadMore}
      initActiveIndex={initActiveIndex}
    />
  );
};

export default PhotoSlider;
