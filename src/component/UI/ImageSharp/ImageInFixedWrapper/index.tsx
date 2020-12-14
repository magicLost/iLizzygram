import React, { FC } from "react";
import PreloadBase64Image, { IBase64ImageProps } from "./../PreloadBase64Image";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  image: (props: any) => {
    let height, width;

    if (props.aspectRatio <= props.wrapperAspectRatio) {
      width = `${Math.floor(props.wrapperHeight * props.aspectRatio)}px`;
      height = `${props.wrapperHeight}px`;
    } else {
      width = `${props.wrapperWidth}px`;
      height = `${Math.floor(props.wrapperWidth / props.aspectRatio)}px`;
    }

    return {
      display: "block",
      margin: "auto",
      width,
      height,
    };
  },
});

export interface IImageInFixedWrapper extends IBase64ImageProps {
  wrapperAspectRatio: number;
  wrapperWidth: number;
  wrapperHeight: number;
}

const ImageInFixedWrapper: FC<IImageInFixedWrapper> = props => {
  const classes = useStyles({
    wrapperAspectRatio: props.wrapperAspectRatio,
    aspectRatio: props.photo.aspectRatio,
    wrapperWidth: props.wrapperWidth,
    wrapperHeight: props.wrapperHeight,
  });

  console.log("[IMAGE FIXED WRAPPER] RENDER");

  return <PreloadBase64Image imageClasses={classes.image} {...props} />;
};

export default ImageInFixedWrapper;
