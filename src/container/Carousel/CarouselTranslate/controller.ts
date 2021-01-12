import CalcTranslateX, { ICalcTranslateX } from "./CalcTranslateX";
import { calcDecreasedIndex, calcIncreasedIndex, clamp } from "../utils";
import { Dispatch, SetStateAction } from "react";
import { ICarouselTranslateState } from "./../types";
import CarouselController from "../controller";

class CarouselTranslateController extends CarouselController<
  ICarouselTranslateState
> {
  translateX: number;

  pointerDown = (pageX: number, pageY: number) => {
    //console.log("onPointerDown");

    this.calc.onPointerDown(pageX, pageY);

    this.setState(prevState => ({
      ...prevState,
      isTranslated: true,
      translateX: this.calc.translateX,
    }));
  };

  pointerMove = (pageX: number, pageY: number) => {
    //console.log("onPointerMove");

    this.calc.onPointerMove(pageX, pageY, this.activeIndex, this.itemsLength);

    if (this.translateX !== this.calc.translateX) {
      this.setState(prevState => ({
        ...prevState,
        translateX: this.calc.translateX,
      }));
    }
  };

  pointerUp = () => {
    //console.log("onPointerUp");

    let newIndex = this.activeIndex;

    if (!this.calc.isYScroll && this.calc.isEnoughDist()) {
      if (this.calc.isIndexIncrease()) {
        newIndex = calcIncreasedIndex(this.activeIndex, this.itemsLength);
      } else {
        newIndex = calcDecreasedIndex(this.activeIndex);
      }
    }

    this.calc.onPointerUp();

    this.setState(prevState => ({
      ...prevState,
      isTranslated: false,
      translateX: 0,
      activeIndex: newIndex,
    }));
  };
}

export default CarouselTranslateController;
