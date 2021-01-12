import React, { useMemo, CSSProperties } from "react";
import classes from "./CarouselTranslate.module.scss";
import { ICarouselController } from "../CarouselController";

interface CarouselTranslateProps {
  items: any[];
  getItems: (
    //items: any[],
    itemClass: string,
    activeIndex: number
  ) => JSX.Element[];
  activeIndex: number;
  translateX: number;
  isTranslated: boolean;
  controller: ICarouselController;
}

const CarouselTranslate = ({
  items,
  getItems,
  activeIndex,
  translateX,
  isTranslated,
  controller,
}: CarouselTranslateProps) => {
  const getListStyle = (
    activeIndex: number,
    translateX: number,
    isTranslated: boolean
  ) => {
    const listStyle: CSSProperties = {
      transform:
        "translateX(" + stringifyTranslateX(activeIndex, translateX) + ")",
    };

    if (!isTranslated) {
      listStyle.transitionProperty = "transform";
      listStyle.transitionDuration = "0.3s";
    }

    return listStyle;
  };

  const stringifyTranslateX = (activeIndex: number, translateX: number) => {
    const translateByActiveIndex = -activeIndex * 100 + "%";

    return "calc(" + translateByActiveIndex + " + " + translateX + "px)";
  };

  /* RENDER */

  console.log("RENDER RCarouselTranslate");

  const listStyle: React.CSSProperties = getListStyle(
    activeIndex,
    translateX,
    isTranslated
  );

  return (
    <div
      ref={controller.containerRef}
      className={classes.CarouselTranslate}
      onMouseDown={controller.onMouseDown}
      onTouchStart={controller.onTouchStart}
      onTouchEnd={controller.onTouchEnd}
    >
      <ul className={classes.ItemsList} style={listStyle}>
        {useMemo(() => getItems(classes.Item, activeIndex), [items])}
      </ul>
    </div>
  );
};

export default CarouselTranslate;
