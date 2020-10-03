import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import LoadableBackDrop from "./LoadableBackDrop";
//import classes from "./LoadableBackDrop.module.scss";

describe("LoadableBackDrop", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<LoadableBackDrop />);
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
