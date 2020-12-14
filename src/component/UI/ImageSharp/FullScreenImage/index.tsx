import React, { FC } from "react";
import PreloadBase64Image, { IBase64ImageProps } from "./../PreloadBase64Image";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
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
});

export interface IFullScreenImage extends IBase64ImageProps {}

const FullScreenImage: FC<IFullScreenImage> = props => {
  const isAspectRatio = useMediaQuery(
    `(max-aspect-ratio: ${props.photo.aspectRatio * 100}/100)`
  );

  const classes = useStyles({
    isAspectRatio,
    aspectRatio: props.photo.aspectRatio,
  });

  console.log("[FULL SCREEN IMAGE] RENDER");

  return <PreloadBase64Image imageClasses={classes.image} {...props} />;
};

export default FullScreenImage;
