import React, { Children, CSSProperties, ReactNode } from "react";

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

export const updateChildren = (
  children: ReactNode[],
  activeIndex: number,
  isTranslated: boolean,
  opacity: number,
  classes: any
) => {
  console.log("[CAROUSEL OPACITY] UPDATE CHILDREN ", activeIndex);

  return Children.map(children, (child, index) => {
    let style = getItemStyle(index, activeIndex, isTranslated, opacity);

    const isActive = activeIndex === index;
    return (
      <li key={classes.item + index} className={classes.item} style={style}>
        {isActive && child}
      </li>
    );
  });
};
