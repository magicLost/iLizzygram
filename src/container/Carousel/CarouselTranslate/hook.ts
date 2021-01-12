import { useState, useEffect, useRef, MutableRefObject } from "react";
import CarouselTranslateController from "./controller";
import { ICarouselTranslateState } from "./../types";

const initState: ICarouselTranslateState = {
  isTranslated: false,
  activeIndex: 0,
  translateX: 0,
};

export const useCarouselTranslate = (
  itemsLength: number,
  activeIndex?: number
) => {
  const controllerRef: MutableRefObject<CarouselTranslateController> = useRef();

  const [state, setState] = useState(() => {
    controllerRef.current = new CarouselTranslateController(itemsLength);

    if (activeIndex) {
      initState.activeIndex = activeIndex;
    }

    return initState;
  });

  controllerRef.current.containerRef = useRef(null);

  useEffect(() => {
    controllerRef.current.itemsLength = itemsLength;
  }, [itemsLength]);

  // ADD ON_TOUCH_MOVE TO CONTAINER ELEMENT
  useEffect(() => {
    const controller = controllerRef.current;

    //console.log("ADD ON_TOUCH_MOVE TO CONTAINER ELEMENT", controller);

    if (controller === null) throw new Error("No controller");

    //console.log(controller);
    if (!controller.containerRef || !controller.containerRef.current) {
      throw new Error("No container ref");
    }

    //console.log("Add event touchmove", controller.containerRef.current);
    controller.containerRef.current.addEventListener(
      "touchmove",
      controller.onTouchMove,
      { passive: false }
    );

    return () => {
      const controller = controllerRef.current;
      if (controller === null) throw new Error("No controller");

      if (!controller.containerRef || !controller.containerRef.current)
        throw new Error("No container ref");

      controller.containerRef.current.removeEventListener(
        "touchmove",
        controller.onTouchMove
      );
    };
  }, []);

  controllerRef.current.setState = setState;
  controllerRef.current.activeIndex = state.activeIndex;
  controllerRef.current.isTranslated = state.isTranslated;
  controllerRef.current.translateX = state.translateX;

  return {
    controller: controllerRef.current,
  };
};
