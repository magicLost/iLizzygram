import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import Logo from ".";
import classes from "./Logo.module.scss";

jest.mock("gatsby", () => {
  const RReact = require("react");
  return {
    __esModule: true,
    Link: RReact.forwardRef((props, ref) => (
      <a href={props.to} ref={ref}>
        {props.children}
      </a>
    )),
    /* Link: props => {
      return <a href={props.to}>{props.children}</a>;
    }, */
  };
});

describe("Logo", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<Logo />);
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
