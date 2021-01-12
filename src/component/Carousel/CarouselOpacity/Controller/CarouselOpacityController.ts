import CarouselController from "../../CarouselController";
import { calcDecreasedIndex, calcIncreasedIndex } from "../../utility";
import {
  CarouselOpacityState,
  CarouselState,
  CarouselAction,
} from "../../../../hooks/carousel/carousel";
//import { clamp } from "../../../../../helper/MathF";
import { ICastTranslateXToOpacity } from "../Model/CastTranslateXToOpacity";
import { ICalcTranslateX } from "../../CalcTranslateX";

class CarouselOpacityController extends CarouselController {
  cast: ICastTranslateXToOpacity;

  constructor(
    calc: ICalcTranslateX,
    cast: ICastTranslateXToOpacity,
    itemsLength: number
  ) {
    super(calc, itemsLength);
    this.cast = cast;
  }

  pointerDownAC = (state: CarouselState, action: CarouselAction) => {
    //console.log("onPointerDown");

    if (action.pageX === undefined || action.pageY === undefined)
      throw new Error("No pageX or pageY");

    this.calc.onPointerDown(action.pageX, action.pageY);

    this.cast.onPointerDown();

    return {
      ...state,
      isTranslated: true,
    };
  };

  pointerMoveAC = (state: CarouselState, action: CarouselAction) => {
    //console.log("onPointerMove");

    if (action.pageX === undefined || action.pageY === undefined)
      throw new Error("No pageX or pageY");

    this.calc.onPointerMove(
      action.pageX,
      action.pageY,
      state.activeIndex,
      this.itemsLength
    );

    const newOpacity = this.cast.calcOpacityByTranslateX(this.calc.translateX);

    if ((state as CarouselOpacityState).opacity !== newOpacity) {
      return { ...state, opacity: newOpacity };
    } else {
      return state;
    }
  };

  pointerUpAC = (state: CarouselState, action: CarouselAction) => {
    //console.log("onPointerUp");

    let newIndex = state.activeIndex;

    if (!this.calc.isYScroll && this.calc.isEnoughDist()) {
      if (this.calc.isIndexIncrease()) {
        newIndex = calcIncreasedIndex(state.activeIndex, this.itemsLength);
        if (state.activeIndex === newIndex && this.onFetchMore) {
          this.onFetchMore();
        }
      } else {
        newIndex = calcDecreasedIndex(state.activeIndex);
      }
    }

    this.calc.onPointerUp();

    return {
      ...state,
      isTranslated: false,
      opacity: 1,
      activeIndex: newIndex,
    };
  };
}

export default CarouselOpacityController;
