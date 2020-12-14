import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CarouselOpacityController from "./controller";
import { updateChildren } from "./helper";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },

  list: {
    padding: 0,
    height: "100%",
    width: "100%",
    listStyle: "none",
    display: "flex",
    margin: "auto",
  },

  item: {
    width: "100%",
    height: "100%",
    opacity: 0,

    marginLeft: "-100%",
    //background: linear-gradient(45deg, pink, cyan);
    flexGrow: 0,
    flexShrink: 0,

    "&:first-child": {
      marginLeft: 0,
    },
  },
});

interface ICarouselOpacityProps {
  controller: CarouselOpacityController;
  children: ReactNode[];
  onFetchMore?: () => void;
}

const CarouselOpacity = ({
  controller,
  children,
  onFetchMore,
}: ICarouselOpacityProps) => {
  const classes = useStyles();

  controller.onFetchMore = onFetchMore;

  const updatedChildren = updateChildren(
    children,
    controller.activeIndex,
    controller.isTranslated,
    controller.opacity,
    classes
  );

  console.log("[CAROUSEL OPACITY] RENDER");

  return (
    <div
      className={classes.root}
      ref={controller.containerRef}
      onMouseDown={controller.onMouseDown}
      onTouchStart={controller.onTouchStart}
      /*  onTouchMove={controller.onTouchMove} */
      onTouchEnd={controller.onTouchEnd}
    >
      <ul className={classes.list}>{updatedChildren}</ul>
    </div>
  );
};

export default CarouselOpacity;
