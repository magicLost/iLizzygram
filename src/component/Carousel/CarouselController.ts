import { ICalcTranslateX } from "./CalcTranslateX";
import { CarouselState, CarouselAction } from "../../hooks/carousel/carousel";
import { calcDecreasedIndex, calcIncreasedIndex } from "./utility";
import { clamp } from "utils-library-lost/MathF/MathF";

export interface ICarouselController {
  dispatch: React.Dispatch<CarouselAction> | undefined;
  reducer: (state: CarouselState, action: CarouselAction) => CarouselState;

  containerRef: React.RefObject<HTMLDivElement> | undefined;

  calc: ICalcTranslateX;

  isMultiTouch: boolean;

  onFetchMore: () => void;

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

  /* case "POINTER_DOWN": return onPointerDownTranslateAc(state, action);

            case "POINTER_MOVE": return onPointerMoveTranslateAc(state, action);

            case "POINTER_UP": return onPointerUpTranslateAc(state, action);

            case "INCREASE_INDEX": return onIncreaseIndexAC(state, action) as CarouselTranslateState;

            case "DECREASE_INDEX": return onDecreaseIndexAC(state, action) as CarouselTranslateState;

            case "SET_INDEX": return onSetIndexAC(state, action) as CarouselTranslateState; */
}

abstract class CarouselController implements ICarouselController {
  dispatch: React.Dispatch<CarouselAction> | undefined;

  calc: ICalcTranslateX;

  containerRef: React.RefObject<HTMLDivElement> | undefined;

  isMultiTouch: boolean = false;

  onFetchMore: () => void = undefined;

  activeIndex: number = 0;
  itemsLength: number;

  constructor(calc: ICalcTranslateX, itemsLength: number) {
    this.calc = calc;
    this.itemsLength = itemsLength;
  }

  reducer = (state: CarouselState, action: CarouselAction) => {
    switch (action.type) {
      case "POINTER_DOWN":
        return this.pointerDownAC(state, action);

      case "POINTER_MOVE":
        return this.pointerMoveAC(state, action);

      case "POINTER_UP":
        return this.pointerUpAC(state, action);

      case "INCREASE_INDEX":
        return this.increaseIndexAC(state, action);

      case "DECREASE_INDEX":
        return this.decreaseIndexAC(state, action);

      case "SET_INDEX":
        return this.setIndexAC(state, action);

      default:
        throw new Error("No implementation for type = " + action.type);
    }
  };

  onMouseDown = (event: any) => {
    //console.log("RCatrousel mouse down");
    event.preventDefault();
    event.stopPropagation();

    if (this.dispatch === undefined) throw new Error("No dispatch");

    window.addEventListener("mousemove", this.onMouseMove, false);
    window.addEventListener("mouseup", this.onMouseUp, false);

    this.dispatch({
      type: "POINTER_DOWN",
      pageX: event.pageX,
      pageY: event.pageY,
    });
  };

  onMouseMove = (event: any) => {
    //console.log("RCatrousel mouse move");
    event.preventDefault();
    event.stopPropagation();

    if (this.dispatch === undefined) throw new Error("No dispatch");

    this.dispatch({
      type: "POINTER_MOVE",
      pageX: event.pageX,
      pageY: event.pageY,
    });
  };

  onMouseUp = (event: any) => {
    //console.log("RCatrousel mouse up");
    event.preventDefault();
    event.stopPropagation();

    if (this.dispatch === undefined) throw new Error("No dispatch");

    window.removeEventListener("mousemove", this.onMouseMove, false);
    window.removeEventListener("mouseup", this.onMouseUp, false);

    this.dispatch({ type: "POINTER_UP" });
  };

  onTouchStart = (event: any) => {
    //console.log("RCarousel touch start");
    //event.preventDefault();
    //event.stopPropagation();

    if (event.targetTouches.length > 1) {
      this.isMultiTouch = true;
      return;
    }

    if (this.dispatch === undefined) throw new Error("No dispatch");

    const touches = event.changedTouches[0];

    this.dispatch({
      type: "POINTER_DOWN",
      pageX: touches.pageX,
      pageY: touches.pageY,
    });
  };

  onTouchMove = (event: any) => {
    //if (event.targetTouches.length  > 1) return;
    if (this.isMultiTouch) return;

    if (this.dispatch === undefined) throw new Error("No dispatch");

    const touches = event.changedTouches[0];

    /* console.log(
      "RCarousel touch move",
      this.calc.getYScrollFunc(touches.pageX, touches.pageY)
    ); */

    event.stopPropagation();

    if (this.calc.getYScrollFunc(touches.pageX, touches.pageY)) return;

    event.preventDefault();

    this.dispatch({
      type: "POINTER_MOVE",
      pageX: touches.pageX,
      pageY: touches.pageY,
    });
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

    if (this.dispatch === undefined) throw new Error("No dispatch");

    const touches = event.changedTouches[0];

    this.dispatch({ type: "POINTER_UP" });
  };

  onIncreaseIndex = (event: any) => {
    //event.preventDefault();
    //event.stopPropagation();

    if (this.dispatch === undefined) throw new Error("No dispatch");

    this.dispatch({ type: "INCREASE_INDEX" });
  };

  onDecreaseIndex = (event: any) => {
    //event.preventDefault();
    //event.stopPropagation();

    if (this.dispatch === undefined) throw new Error("No dispatch");

    this.dispatch({ type: "DECREASE_INDEX" });
  };

  onSetIndex = (index: number) => {
    if (this.dispatch === undefined) throw new Error("No dispatch");

    this.dispatch({ type: "SET_INDEX", index: index });
  };

  abstract pointerDownAC: (
    state: CarouselState,
    action: CarouselAction
  ) => CarouselState;
  abstract pointerMoveAC: (
    state: CarouselState,
    action: CarouselAction
  ) => CarouselState;
  abstract pointerUpAC: (
    state: CarouselState,
    action: CarouselAction
  ) => CarouselState;

  /* abstract increaseIndexAC: (state: CarouselState, action: CarouselAction) => CarouselState;
    abstract decreaseIndexAC: (state: CarouselState, action: CarouselAction) => CarouselState;
    abstract setIndexAC: (state: CarouselState, action: CarouselAction) => CarouselState; */

  increaseIndexAC = (state: CarouselState, action: CarouselAction) => {
    const newIndex = calcIncreasedIndex(state.activeIndex, this.itemsLength);

    return { ...state, activeIndex: newIndex };
  };

  decreaseIndexAC = (state: CarouselState, action: CarouselAction) => {
    const newIndex = calcDecreasedIndex(state.activeIndex);

    return { ...state, activeIndex: newIndex };
  };

  setIndexAC = (state: CarouselState, action: CarouselAction) => {
    if (action.index === undefined) throw new Error("No new index");

    const newIndex = clamp(action.index, 0, this.itemsLength - 1);

    if (newIndex === state.activeIndex) return state;

    return { ...state, activeIndex: newIndex };
  };
}

export default CarouselController;
