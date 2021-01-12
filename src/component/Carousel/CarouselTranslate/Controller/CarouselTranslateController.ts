import CarouselController from "../../CarouselController";
import { calcDecreasedIndex, calcIncreasedIndex } from "../../utility";
import {
  CarouselTranslateState,
  CarouselState,
  CarouselAction,
} from "../../../../hooks/carousel/carousel";
//import { clamp } from "../../../../../helper/MathF";

class CarouselTranslateController extends CarouselController {
  pointerDownAC = (state: CarouselState, action: CarouselAction) => {
    //console.log("onPointerDown");

    if (action.pageX === undefined || action.pageY === undefined)
      throw new Error("No pageX or pageY");

    this.calc.onPointerDown(action.pageX, action.pageY);

    return {
      ...state,
      isTranslated: true,
      translateX: this.calc.translateX,
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

    if ((state as CarouselTranslateState).translateX !== this.calc.translateX) {
      return { ...state, translateX: this.calc.translateX };
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
      } else {
        newIndex = calcDecreasedIndex(state.activeIndex);
      }
    }

    this.calc.onPointerUp();

    return {
      ...state,
      isTranslated: false,
      translateX: 0,
      activeIndex: newIndex,
    };
  };
}

export default CarouselTranslateController;
