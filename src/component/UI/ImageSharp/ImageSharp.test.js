import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import ImageSharp from ".";
//import classes from "./ImageSharp.module.scss";

describe("ImageSharp", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<ImageSharp />);
    });

    afterEach(cleanup);

    test("It must render image and div with background base64 image", () => {
      //const p = _render.getAllByText("Hello.");

      expect(true).toEqual(true);
    });
  });
});
