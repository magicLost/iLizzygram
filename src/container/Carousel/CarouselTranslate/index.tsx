import React, {
  useRef,
  useMemo,
  cloneElement,
  Children,
  ReactNode,
  useEffect,
  CSSProperties,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CarouselTranslateController from "./controller";
import { ICarouselTranslateState } from "./../types";
import { stringifyTranslateX, makeListStyle, IListStyledProps } from "./helper";

const useStyles = makeStyles({
  root: {
    touchAction: "pan-y",
    width: "100%",
    overflow: "hidden",
  },

  list: {
    padding: 0,
    width: "100%",
    listStyle: "none",
    display: "flex",
  },

  listModify: (props: IListStyledProps) => {
    const listStyle: any = {
      transform:
        "translateX(" +
        stringifyTranslateX(props.activeIndex, props.translateX) +
        ")",
    };

    if (!props.isTranslated) {
      listStyle.transitionProperty = "transform";
      listStyle.transitionDuration = "0.3s";
    }

    return listStyle;
  },

  item: {
    width: "100%",
    minHeight: "300px",
    textAlign: "center",
    //background: linear-gradient(45deg, pink, cyan);
    flexGrow: 0,
    flexShrink: 0,
  },
});

interface ICarouselTranslateProps {
  controller: CarouselTranslateController;
  children: ReactNode[];
}

const updateChildren = (
  children: ReactNode[],
  classes: Record<"item", string>
) => {
  console.log("[CAROUSEL TRANSLATE] UPDATE CHILDREN", Children.count(children));
  return Children.map(children, (child, index) => {
    //return cloneElement(child, { activeIndex: 3 });
    return (
      <li key={classes.item + index} className={classes.item}>
        {child}
      </li>
    );
  });
};

const CarouselTranslate = ({
  controller,
  children,
}: ICarouselTranslateProps) => {
  //const updatedChildrenRef = useRef([]);

  const classes = useStyles({
    activeIndex: controller.activeIndex,
    translateX: controller.translateX,
    isTranslated: controller.isTranslated,
  });

  const updatedChildren = useMemo(() => updateChildren(children, classes), [
    children,
  ]);

  console.log("[CAROUSEL TRANSLATE] RENDER");

  return (
    <div
      ref={controller.containerRef}
      className={classes.root}
      onMouseDown={controller.onMouseDown}
      onTouchStart={controller.onTouchStart}
      onTouchEnd={controller.onTouchEnd}
    >
      <ul className={`${classes.list} ${classes.listModify}`}>
        {updatedChildren}
      </ul>
    </div>
  );
};

export default CarouselTranslate;
