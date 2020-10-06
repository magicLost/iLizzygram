import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import ErrorBoundary from ".";
import classes from "./ErrorBoundary.module.scss";

const ErrorComponent = () => {
  throw new Error("Big Error");
  return null;
};

console.log = jest.fn();
console.error = jest.fn();

describe("ErrorBoundary", () => {
  let _render = null;

  describe("Render and props test", () => {
    afterEach(cleanup);

    beforeEach(() => {
      _render = render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );
    });

    describe("Snapshots", () => {
      test("matches snapshot", () => {
        const { baseElement } = _render;
        expect(baseElement).toMatchSnapshot();
      });
    });
  });
});
