import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import AddEditPhotoFormWidgdget from "./AddEditPhotoFormWidget";
import classes from "./AddEditPhotoFormWidget.module.scss";

describe("AddEditPhotoFormWidget", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<AddEditPhotoFormWidgdget />);
    });

    afterEach(cleanup);

    describe("Snapshots", () => {
      test("matches snapshot", () => {
        const { baseElement } = _render;
        expect(baseElement).toMatchSnapshot();
      });
    });
  });
});
