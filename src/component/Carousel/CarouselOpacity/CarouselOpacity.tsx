import React, { useMemo, CSSProperties } from "react";
import classes from "./CarouselOpacity.module.scss";
//import {CarouselAction} from "../../../../hooks/Carousels/RCarousel/rcarousel";
import { ICarouselController } from "../CarouselController";

export type GetItemStyle = (index: number) => CSSProperties | undefined;
export type GetItems = (
  itemClass: string,
  getItemStyle: GetItemStyle,
  //isTranslated: boolean,
  //opacity: number,
  activeIndex: number
) => JSX.Element | JSX.Element[];

interface CarouselOpacityProps {
  //items: any[];
  //getItems: GetItems;
  children: JSX.Element[];
  activeIndex: number;
  opacity: number;
  isTranslated: boolean;
  //dispatch: React.Dispatch<CarouselAction>
  controller: ICarouselController;
  onFetchMore?: () => void;
}

export const getItemStyle = (
  index: number,
  activeIndex: number,
  isTranslated: boolean,
  opacity: number
): CSSProperties => {
  let style = undefined;

  if (activeIndex === index) {
    if (isTranslated) {
      style = {
        //transitionProperty: 'opacity',
        opacity: opacity >= 0.5 ? opacity : 0.5,
      };
    } else {
      style = {
        transitionProperty: "opacity",
        transitionDuration: "0.5s",
        opacity: opacity,
      };
    }
  }

  return style;
};

export const getItems = (
  children: JSX.Element[],
  getItemStyle: (
    index: number,
    activeIndex: number,
    isTranslated: boolean,
    opacity: number
  ) => CSSProperties,
  activeIndex: number,
  isTranslated: boolean,
  opacity: number
) => {
  console.log("[GET ITEMS CAROUSEL] ", activeIndex);

  return React.Children.map(children, (child, index) => {
    let style = getItemStyle(index, activeIndex, isTranslated, opacity);

    const isActive = activeIndex === index;
    return (
      <li key={classes.Item + index} className={classes.Item} style={style}>
        {isActive && child}
      </li>
    );
  });
};

const CarouselOpacity = ({
  //items,
  //getItems,
  children,
  activeIndex,
  opacity,
  isTranslated,
  controller,
  onFetchMore = undefined,
}: CarouselOpacityProps) => {
  /* RENDER */

  controller.onFetchMore = onFetchMore;

  console.log("[RENDER ] RCarouselOpacity", activeIndex);

  const itemsElements = getItems(
    children,
    getItemStyle,
    activeIndex,
    isTranslated,
    opacity
  );

  return (
    <div
      className={classes.CarouselOpacity}
      ref={controller.containerRef}
      onMouseDown={controller.onMouseDown}
      onTouchStart={controller.onTouchStart}
      /*  onTouchMove={controller.onTouchMove} */
      onTouchEnd={controller.onTouchEnd}
    >
      <ul className={classes.ItemsList}>{itemsElements}</ul>
    </div>
  );
};

/*{useMemo(
          () =>
            getItems(
              children,
              getItemStyle,
              activeIndex,
              isTranslated,
              opacity
            ),
          [activeIndex, children, opacity, isTranslated]
        )} */

export default React.memo(CarouselOpacity);
