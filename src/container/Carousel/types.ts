export interface ICarouselState {
  //translateX: number;
  activeIndex: number;

  isTranslated: boolean;
}

export interface ICarouselTranslateState extends ICarouselState {
  translateX: number;
}

export interface ICarouselOpacityState extends ICarouselState {
  opacity: number;
}
