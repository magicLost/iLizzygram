import { CreateCSSProperties, PropsFunc } from "@material-ui/styles";
import { CSSProperties } from "react";

export interface IListStyledProps {
  activeIndex: number;
  translateX: number;
  isTranslated: boolean;
}

export const makeListStyle = (props: IListStyledProps) => {
  const listStyle: CSSProperties = {
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
};

export const stringifyTranslateX = (
  activeIndex: number,
  translateX: number
) => {
  const translateByActiveIndex = -activeIndex * 100 + "%";

  return "calc(" + translateByActiveIndex + " + " + translateX + "px)";
};
