import React, { FC, useState } from "react";
//import classes from './FinalImageSharp.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { IPhoto } from "./../../../../types";

/* export interface IFinalImageSharpProps {
  base64: string;
  src: string;
  srcSet?: string;
  //sizes?: string;
  isActive?: boolean;
  alt: string;
  //isHidden?: boolean;
  onImageClick?: (event: any) => void | undefined;
  index?: number;
  aspectRatio: number;
} */

export interface IBase64ImageProps {
  //type: TPhotoSizes;
  //imageClasses: string;
  photo: IPhoto;
  alt: string;
  //isHidden?: boolean;
  onImageClick?: (event: any) => void | undefined;
  index?: number;
  isActive?: boolean;
}

export interface IPreloadBase64ImageProps extends IBase64ImageProps {
  //type: TPhotoSizes;
  imageClasses: string;
}

//wrapperFixed - wrapper element has fixed aspectRatio( width and height )
export type TPhotoSizes = "full" | "wrapperFixed";

/* interface IStylesProps {
  type: TPhotoSizes;

  aspectRatio?: number;
  isAspectRatio?: boolean;
  base64: string;
} */

const useStyles = makeStyles({
  // style rule
  /* image: (props: IStylesProps) => {
    if(props.type === "full"){
      return {
        display: "block",
        width: props.isAspectRatio ? "100vw" : `${props.aspectRatio * 100}vh`,
        height: props.isAspectRatio
          ? `${Math.round(100 / props.aspectRatio)}vw`
          : "100vh",
        margin: "auto",
      }
    }else if(props.type === "wrapperFixed"){

    }
  }, */
  background: (props: any) => ({
    background: `url("data:image/jpeg;base64, ${props.base64}") no-repeat`,
    backgroundSize: "cover",
  }),
});

const PreloadBase64Image: FC<IPreloadBase64ImageProps> = ({
  //type,
  imageClasses,
  photo,
  alt,
  index = 0,
  onImageClick = undefined,
}) => {
  const classes = useStyles({
    base64: photo.base64,
  });

  const [isBackground, setIsBackground] = useState(true);

  const onLoad = () => {
    console.log("ON LOAD");
    setIsBackground(false);
  };

  const fImageClasses = isBackground
    ? `${imageClasses} ${classes.background}`
    : imageClasses;

  console.log("[PRELOAD_BASE64_IMAGE] RENDER");

  return (
    <img
      className={fImageClasses}
      data-index={index}
      onClick={onImageClick}
      src={photo.src}
      data-src={photo.src}
      srcSet={photo.srcSet}
      alt={alt}
      onLoad={onLoad}
    />
  );
};

export default PreloadBase64Image;
