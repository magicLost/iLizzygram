import React, { useState, useRef, useEffect } from "react";
import classes from "./ImageSharp.module.scss";
import { makeStyles } from "@material-ui/core/styles";

export interface IImageSharpProps {
  base64?: string;
  src: string;
  srcSet?: string;
  sizes?: string;
  isActive?: boolean;
  alt: string;
  isHidden?: boolean;
  onImageClick?: (event: any) => void | undefined;
  index?: number;
}

const useStyles = makeStyles({
  // style rule
  image: (props: any) => ({
    background: `url("${props.base64}") no-repeat`,
    backgroundSize: "cover",
  }),
});

//background div - write media queries for all sizes
//first show div with base64 background image
//then on load hide div
const ImageSharp = ({
  base64 = undefined,
  src,
  alt,
  index = 0,
  onImageClick = undefined,
  isHidden = false,
  srcSet = undefined,
  sizes = undefined,
  isActive = true,
}: IImageSharpProps) => {
  //const srcAttr = isLoad || error ? base64 : src;

  const jssClasses = useStyles({ base64 });

  //const imageSrc = isActive ? src : "";
  //const imageSrcSet = isActive ? srcSet : "";
  //const imageDataSrc = isActive ? undefined : src;
  console.log("[RENDER IMAGE SHARP] ", isHidden);
  const imageClasses = isHidden
    ? `${jssClasses.image} ${classes.hidden}`
    : jssClasses.image;

  return (
    <>
      {isActive && (
        <img
          className={imageClasses}
          data-index={index}
          onClick={onImageClick}
          src={src}
          data-src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
        />
      )}
    </>
  );
};

export default ImageSharp;
