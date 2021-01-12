import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "../Carousel/CarouselOpacity/node_modules/@testing-library/jest-dom/extend-expect";

import CarouselOpacity from "./CarouselOpacity";
import classes from "./CarouselOpacity.module.scss";

describe("RCarouselOpacity", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<CarouselOpacity />);
    });

    afterEach(cleanup);

    describe("", () => {
      test("", () => {});
    });
  });
});
