import Skeleton from "@material-ui/lab/Skeleton";
//import { memo } from "react";
import classes from "./PhotoSkeletons.module.scss";

const getSkeletons = (numberOfSkeletons: number) => {
  const elements = [];

  for (let i = 0; i < numberOfSkeletons; i++) {
    elements.push(
      <div
        key={classes.container + "_skeleton_" + i}
        className={classes.container}
      >
        <Skeleton variant="rect" width={320} height={180} />
      </div>
    );
  }
  return elements;
};

const PhotoSkeletons = ({ numberOfSkeletons }) => {
  console.log("[PHOTO SKELETONS RENDER]");

  const elements = getSkeletons(numberOfSkeletons);

  return <>{elements}</>;
};

export default PhotoSkeletons;
