//import CalcTranslateX, { ICalcTranslateX } from "./CalcTranslateX";
import { calcDecreasedIndex, calcIncreasedIndex, clamp } from "../utils";
//import { Dispatch, SetStateAction } from "react";
import { ICarouselOpacityState } from "./../types";
import CarouselController from "../controller";
import CastTranslateXToOpacity, {
  ICastTranslateXToOpacity,
} from "./CastTranslateXToOpacity";

class CarouselOpacityController extends CarouselController<
  ICarouselOpacityState
> {
  cast: ICastTranslateXToOpacity = new CastTranslateXToOpacity();

  opacity: number;

  pointerDown = (pageX: number, pageY: number) => {
    //console.log("onPointerDown");

    this.calc.onPointerDown(pageX, pageY);

    this.cast.onPointerDown();

    this.setState(prevState => ({
      ...prevState,
      isTranslated: true,
    }));
  };

  pointerMove = (pageX: number, pageY: number) => {
    //console.log("onPointerMove");

    this.calc.onPointerMove(pageX, pageY, this.activeIndex, this.itemsLength);

    const newOpacity = this.cast.calcOpacityByTranslateX(this.calc.translateX);

    if (this.opacity !== newOpacity) {
      this.setState(prevState => ({
        ...prevState,
        opacity: newOpacity,
      }));
    }
  };

  pointerUp = () => {
    //console.log("onPointerUp");

    let newIndex = this.activeIndex;

    if (!this.calc.isYScroll && this.calc.isEnoughDist()) {
      if (this.calc.isIndexIncrease()) {
        newIndex = calcIncreasedIndex(this.activeIndex, this.itemsLength);
        if (this.activeIndex === newIndex && this.onFetchMore) {
          this.onFetchMore();
        }
      } else {
        newIndex = calcDecreasedIndex(this.activeIndex);
      }
    }

    this.calc.onPointerUp();

    this.setState(prevState => ({
      ...prevState,
      isTranslated: false,
      opacity: 1,
      activeIndex: newIndex,
    }));
  };
}

export default CarouselOpacityController;
