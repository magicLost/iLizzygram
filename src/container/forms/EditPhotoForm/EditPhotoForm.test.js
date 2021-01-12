import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

import EditPhotoForm, {
  checkDiffAndGetQueryVariables,
  getTagsIdsFromFormStateTags,
  getDefaultTagsIds,
} from "./EditPhotoForm";
import classes from "./EditPhotoForm.module.scss";

describe("EditPhotoForm", () => {
  let _render = null;

  /* describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<EditPhotoForm />);
    });

    afterEach(cleanup);

    describe("", () => {
      test("", () => {});
    });
  }); */

  describe("Helpers", () => {
    test("getTagsIdsFromFormStateTags", () => {
      const tagsFromFormState = {
        "123id": false,
        "323dsf": true,
        "134id": false,
        "993dsf": true,
      };
      const tagsIds = getTagsIdsFromFormStateTags(tagsFromFormState);

      expect(tagsIds).toEqual(["323dsf", "993dsf"]);
    });

    test("getDefaultTagsIds", () => {
      const photo = {
        tags: [
          { _id: "323dsf", title: "hello" },
          { _id: "345sde", title: "bye" },
        ],
      };
      const defaultTagsIds = getDefaultTagsIds(photo);

      expect(defaultTagsIds).toEqual(["323dsf", "345sde"]);
    });

    test("getQueryVariables", () => {
      //PREPARE
      const tags = { "123id": false, "323dsf": true, "345fer": true };
      const desc = "hello desc";
      const date = new Date(1596911898146);
      const photoFile = [];

      const photo = {
        tags: [{ _id: "323dsf", title: "hello" }],
        description: "hello desc",
        date: "1596911898146",
      };

      //EVAL
      const [isDiff, variables] = checkDiffAndGetQueryVariables(
        tags,
        photo,
        desc,
        date,
        photoFile
      );

      //EXPECTS
      expect(isDiff).toEqual(true);
      expect(variables).toEqual({ tags: ["323dsf", "345fer"] });
    });
  });
});
