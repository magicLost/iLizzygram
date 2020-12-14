import React from "react";
import { usePhotos } from "../../store/hook";
import PhotoSliderWidget from "./PhotoSlider";

interface PhotoSliderProps {
  initActiveIndex?: number;
}

export const PhotoSlider = ({ initActiveIndex = 0 }: PhotoSliderProps) => {
  const { photoState, loadMore } = usePhotos();

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
