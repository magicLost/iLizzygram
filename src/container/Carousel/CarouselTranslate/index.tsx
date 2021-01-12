import React, { useMemo, Children, ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CarouselTranslateController from "./controller";
import cssClasses from "./CarouselTranslate.module.scss";
import { stringifyTranslateX, makeListStyle, IListStyledProps } from "./helper";

const useStyles = makeStyles({
  /* root: {
    touchAction: "pan-y",
    width: "100%",
    overflow: "hidden",
  },

  list: {
    padding: 0,
    width: "100%",
    listStyle: "none",
    display: "flex",
  }, */

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

  /*  item: {
    width: "100%",
    minHeight: "300px",
    textAlign: "center",
    //background: linear-gradient(45deg, pink, cyan);
    flexGrow: 0,
    flexShrink: 0,
  }, */
});

interface ICarouselTranslateProps {
  controller: CarouselTranslateController;
  children: ReactNode[];
}

const updateChildren = (children: ReactNode[], itemClass: string) => {
  console.log("[CAROUSEL TRANSLATE] UPDATE CHILDREN", Children.count(children));
  return Children.map(children, (child, index) => {
    //return cloneElement(child, { activeIndex: 3 });
    return (
      <li key={itemClass + index} className={itemClass}>
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

  const updatedChildren = useMemo(
    () => updateChildren(children, cssClasses.item),
    [children]
  );

  console.log("[CAROUSEL TRANSLATE] RENDER");

  return (
    <div
      ref={controller.containerRef}
      className={cssClasses.root}
      onMouseDown={controller.onMouseDown}
      onTouchStart={controller.onTouchStart}
      onTouchEnd={controller.onTouchEnd}
    >
      <ul className={`${cssClasses.list} ${classes.listModify}`}>
        {updatedChildren}
      </ul>
    </div>
  );
};

export default CarouselTranslate;
