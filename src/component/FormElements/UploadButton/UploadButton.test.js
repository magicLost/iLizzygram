import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import UploadButton from ".";
import classes from "./UploadButton.module.scss";

describe("UploadButton", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(
        <UploadButton
          name="photoFile"
          title="Добавить фоту"
          error={undefined}
          disabled={false}
        />
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
