import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import IModal from ".";
import classes from "./IModal.module.scss";

describe("IModal", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(
        <IModal open={true} onClose={() => console.log("close")}>
          <div
            style={{
              width: "300px",
              height: "200px",
              textAlign: "center",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <p>Hello.</p>
          </div>
        </IModal>
      );
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
