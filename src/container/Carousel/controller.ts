import { ICarouselState } from "./types";
import { Dispatch, SetStateAction } from "react";

import { calcDecreasedIndex, calcIncreasedIndex, clamp } from "./utils";
import CalcTranslateX, {
  ICalcTranslateX,
} from "./CarouselTranslate/CalcTranslateX";

export interface ICarouselController<T> {
  setState: Dispatch<SetStateAction<T>>;

  containerRef: React.RefObject<HTMLDivElement> | undefined;

  calc: ICalcTranslateX;

  isMultiTouch: boolean;

  onFetchMore: () => void;

  isTranslated: boolean;

  activeIndex: number;
  itemsLength: number;

  onMouseDown: (event: any) => void | undefined;
  onMouseMove: (event: any) => void | undefined;
  onMouseUp: (event: any) => void | undefined;

  onTouchStart: (event: any) => void | undefined;
  onTouchMove: (event: any) => void | undefined;
  onTouchEnd: (event: any) => void | undefined;

  onIncreaseIndex: (event: any) => void | undefined;
  onDecreaseIndex: (event: any) => void | undefined;

  onSetIndex: (index: number) => void | undefined;
}

abstract class CarouselController<T> implements ICarouselController<T> {
  calc: ICalcTranslateX = new CalcTranslateX();

  containerRef: React.RefObject<HTMLDivElement> | undefined;

  isMultiTouch: boolean = false;

  // values from state
  isTranslated: boolean = false;
  activeIndex: number = 0;

  setState: Dispatch<SetStateAction<T>>;

  onFetchMore: () => void = undefined;

  //activeIndex: number = 0;
  itemsLength: number;

  constructor(itemsLength: number) {
    this.itemsLength = itemsLength;
  }

  onMouseDown = (event: any) => {
    //console.log("RCatrousel mouse down");
    event.preventDefault();
    event.stopPropagation();

    window.addEventListener("mousemove", this.onMouseMove, false);
    window.addEventListener("mouseup", this.onMouseUp, false);

    this.pointerDown(event.pageX, event.pageY);
  };

  onMouseMove = (event: any) => {
    //console.log("RCatrousel mouse move");
    event.preventDefault();
    event.stopPropagation();

    this.pointerMove(event.pageX, event.pageY);
  };

  onMouseUp = (event: any) => {
    //console.log("RCatrousel mouse up");
    event.preventDefault();
    event.stopPropagation();

    window.removeEventListener("mousemove", this.onMouseMove, false);
    window.removeEventListener("mouseup", this.onMouseUp, false);

    this.pointerUp();
  };

  onTouchStart = (event: any) => {
    //console.log("RCarousel touch start");
    //event.preventDefault();
    //event.stopPropagation();

    if (event.targetTouches.length > 1) {
      this.isMultiTouch = true;
      return;
    }

    const touches = event.changedTouches[0];

    this.pointerDown(touches.pageX, touches.pageY);
  };

  onTouchMove = (event: any) => {
    //if (event.targetTouches.length  > 1) return;
    if (this.isMultiTouch) return;

    const touches = event.changedTouches[0];

    /* console.log(
        "RCarousel touch move",
        this.calc.getYScrollFunc(touches.pageX, touches.pageY)
      ); */

    event.stopPropagation();

    if (this.calc.getYScrollFunc(touches.pageX, touches.pageY)) return;

    event.preventDefault();

    this.pointerMove(touches.pageX, touches.pageY);
  };

  onTouchEnd = (event: any) => {
    console.log("RCarousel touch end");
    //event.preventDefault();
    //event.stopPropagation();

    //if (event.changedTouches.length > 1) return;
    if (this.isMultiTouch) {
      this.isMultiTouch = false;
      return;
    }

    //const touches = event.changedTouches[0];

    this.pointerUp();
  };

  onIncreaseIndex = (event: any) => {
    //event.preventDefault();
    //event.stopPropagation();

    const newIndex = calcIncreasedIndex(this.activeIndex, this.itemsLength);

    this.setState(prevState => ({
      ...prevState,
      activeIndex: newIndex,
    }));
  };

  onDecreaseIndex = (event: any) => {
    //event.preventDefault();
    //event.stopPropagation();

    const newIndex = calcDecreasedIndex(this.activeIndex);

    this.setState(prevState => ({
      ...prevState,
      activeIndex: newIndex,
    }));
  };

  onSetIndex = (index: number) => {
    const newIndex = clamp(index, 0, this.itemsLength - 1);

    if (newIndex === this.activeIndex) return;

    this.setState(prevState => ({
      ...prevState,
      activeIndex: newIndex,
    }));
  };

  abstract pointerDown: (pageX: number, pageY: number) => void;

  abstract pointerMove: (pageX: number, pageY: number) => void;

  abstract pointerUp: () => void;
}

export default CarouselController;
