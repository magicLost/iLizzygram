import React, { useState } from "react";
//import classes from './FinalImageSharp.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";

export interface IFinalImageSharpProps {
  base64: string;
  src: string;
  srcSet?: string;
  sizes?: string;
  isActive?: boolean;
  alt: string;
  //isHidden?: boolean;
  onImageClick?: (event: any) => void | undefined;
  index?: number;
  aspectRatio: number;
}

const useStyles = makeStyles({
  // style rule

  image: (props: any) => ({
    /* position: "relative",
    top: 0,
    left: 0, */
    display: "block",
    width: props.isAspectRatio ? "100vw" : `${props.aspectRatio * 100}vh`,
    height: props.isAspectRatio
      ? `${Math.round(100 / props.aspectRatio)}vw`
      : "100vh",
    margin: "auto",
  }),
  background: (props: any) => ({
    background: `url("data:image/jpeg;base64, ${props.base64}") no-repeat`,
    backgroundSize: "cover",
  }),
});

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const FinalImageSharp = ({
  base64,
  src,
  alt,
  aspectRatio,
  index = 0,
  onImageClick = undefined,
  //isHidden = false,
  srcSet = undefined,
  //sizes = undefined,
  isActive = true,
}: IFinalImageSharpProps) => {
  const [isBackground, setIsBackground] = useState(true);
  const isAspectRatio = useMediaQuery(
    `(max-aspect-ratio: ${aspectRatio * 100}/100)`
  );
  const classes = useStyles({ base64, isAspectRatio, aspectRatio });

  const onLoad = () => {
    console.log("ON LOAD");
    setIsBackground(false);
  };

  const imageClasses = isBackground
    ? [classes.image, classes.background].join(" ")
    : classes.image;

  console.log("[RENDER FINAL IMAGE SHARP");

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
          alt={alt}
          onLoad={onLoad}
        />
      )}
    </>
  );
};

export default FinalImageSharp;
