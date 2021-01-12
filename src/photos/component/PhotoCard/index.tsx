import React, { FC } from "react";
import ImageInFixedWrapper from "../../../component/UI/ImageSharp/ImageInFixedWrapper";
import { IBase64ImageProps } from "../../../component/UI/ImageSharp/PreloadBase64Image";
//import { IPhoto } from "./../../../types";
import classes from "./PhotoCard.module.scss";
import EditPhotoMenuBtn from "./../../../component/UI/EditPhotoMenuBtn";

export interface IPhotoCardProps extends IBase64ImageProps {
  isEditable?: boolean;
  showEditPhotoForm?: (index: number) => void;
  /* photo: IPhoto;
  alt: string;
  //isHidden?: boolean;
  onImageClick?: (event: any) => void | undefined;
  index?: number;
  isActive?: boolean; */
}

const PhotoCard: FC<IPhotoCardProps> = props => {
  const isEditable = props.isEditable === undefined ? false : props.isEditable;
  return (
    <div
      key={classes.container + props.index}
      data-index={props.index}
      className={classes.container}
    >
      {/* <div className={classes.image}>{photo.name}</div> */}
      <ImageInFixedWrapper
        wrapperHeight={180}
        wrapperWidth={320}
        wrapperAspectRatio={1.8}
        {...props}
      />

      {isEditable && (
        <div className={classes.moreActionsBtn}>
          <EditPhotoMenuBtn
            index={props.index}
            showEditPhotoForm={props.showEditPhotoForm}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
