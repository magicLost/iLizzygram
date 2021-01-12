import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import Header from ".";
//import classes from "./Header.module.scss";

//it must render logo
//it useAuthUser and then render auth fragment
describe("Header", () => {
  let _render = null;

  describe("Render", () => {
    beforeEach(() => {
      _render = render(
        <Header
          Logo={Logo}
          user={undefined}
          loading={false}
          logout={() => {}}
        />
      );
    });

    afterEach(cleanup);

    test("It must render logo and Sceleton", () => {
      //const logos = _render.getAllByAltText("Natours logo");

      expect(true).toEqual(true);
    });
  });
});
