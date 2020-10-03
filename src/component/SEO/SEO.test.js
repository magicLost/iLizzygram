import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import SEO from ".";
import Helmet from "react-helmet";

jest.mock("gatsby", () => {
  return {
    __esModule: true,
    useStaticQuery: () => ({
      site: {
        siteMetadata: {
          defaultTitle: "Boom",
          titleTemplate: "%s - Template",
          defaultDescription: "Super puper boom...",
        },
      },
    }),
    graphql: () => "Hello",
  };
});

describe("Layout", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<SEO />);
    });

    afterEach(cleanup);

    /* describe("Snapshots", () => {
      test("matches snapshot", () => {
        const { baseElement } = _render;
        expect(baseElement).toMatchSnapshot();
      });
    }); */

    test("It must render title", () => {
      const helmet = Helmet.peek();
      expect(helmet.title).toEqual("Boom - Template");
      /*       expect(helmet.htmlAttributes).toEqual("Super puper boom...");
      expect(helmet.bodyAttributes).toEqual("Super puper boom...");
 */ expect(
        helmet.metaTags[0].content
      ).toEqual("Super puper boom...");
    });
  });
});
