import React, { FC } from "react";
import PhotoDescWidget from "./PhotoDesc";
import { usePhotoDesc } from "./hook";
import { TPhotoData } from "../../types";

export interface IPhotoDescProps {
  photo: TPhotoData;
}

export const PhotoDesc: FC<IPhotoDescProps> = ({ photo }) => {
  const { tagsState, showEditPhotoForm } = usePhotoDesc();

  console.log("[RENDER PHOTO DESC] ");

  return (
    <PhotoDescWidget
      photo={photo}
      tagsState={tagsState}
      showEditPhotoForm={showEditPhotoForm}
    />
  );
};

export default PhotoDesc;
