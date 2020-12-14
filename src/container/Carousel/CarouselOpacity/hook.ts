import { useState, useRef, useEffect } from "react";
import CarouselOpacityController from "./controller";
import { ICarouselOpacityState } from "./../types";
//import CarouselTranslateController from "../../component/Carousel/CarouselTranslate/Controller/CarouselTranslateController";
//import CalcTranslateX from "../../component/Carousel/CalcTranslateX";
//import CastTranslateXToOpacity from "../../component/Carousel/CarouselOpacity/Model/CastTranslateXToOpacity";

const initState: ICarouselOpacityState = {
  isTranslated: false,
  activeIndex: 0,
  opacity: 1,
};

export const useCarouselOpacity = (
  itemsLength: number,
  activeIndex: number = 0
) => {
  const controllerRef: React.MutableRefObject<CarouselOpacityController> = useRef();

  const [state, setState] = useState(() => {
    controllerRef.current = new CarouselOpacityController(itemsLength);

    if (activeIndex) {
      initState.activeIndex = activeIndex;
    }

    return initState;
  });

  controllerRef.current.containerRef = useRef(null);

  controllerRef.current.setState = setState;
  controllerRef.current.activeIndex = state.activeIndex;
  controllerRef.current.isTranslated = state.isTranslated;
  controllerRef.current.opacity = state.opacity;

  controllerRef.current.itemsLength = itemsLength;

  useEffect(() => {
    const controller = controllerRef.current;

    //console.log("USE EFFECT CAROUSEL ", controller);

    if (controller === null) throw new Error("No controller");

    /* if (!controller.containerRef || !controller.containerRef.current) {
        throw new Error("No container ref");
      } */

    if (!controller.containerRef || !controller.containerRef.current) return;

    //console.log("Add event touchmove", controller.containerRef.current);
    controller.containerRef.current.addEventListener(
      "touchmove",
      controller.onTouchMove,
      { passive: false }
    );

    /* return () => {
      const controller = controllerRef.current;
      if (controller === null) throw new Error("No controller");

      if (!controller.containerRef || !controller.containerRef.current)
        throw new Error("No container ref"); 

      controller.containerRef.current.removeEventListener(
        "touchmove",
        controller.onTouchMove
      );
    }; */
  }, [controllerRef.current.containerRef]);

  return {
    controller: controllerRef.current,
  };
};
