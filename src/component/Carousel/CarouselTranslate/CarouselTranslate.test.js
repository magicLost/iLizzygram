import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "../Carousel/CarouselOpacity/node_modules/@testing-library/jest-dom/extend-expect";

import CarouselTranslate from "./CarouselTranslate";
import classes from "./CarouselTranslate.module.scss";

describe("CarouselTranslate", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<CarouselTranslate />);
    });

    afterEach(cleanup);

    describe("", () => {
      test("", () => {});
    });
  });
});
