import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";
import TagsCheckbox, { TAGS } from "./TagsCheckbox";
import classes from "./TagsCheckbox.module.scss";
import { act } from "react-dom/test-utils";
import wait from "waait";

const clearError = jest.fn();
const setValue = jest.fn();
const register = jest.fn();
const tagsRules = {};

export const mockQueries = [
  {
    request: {
      query: TAGS,
    },
    result: {
      data: {
        tags: [
          { _id: "123wsdf347423", title: "на улице", name: "street" },
          { _id: "123wsdf343423", title: "улыбка", name: "smile" },
          { _id: "123wsdd343423", title: "дача", name: "dacha" },
          { _id: "123wsdfj43423", title: "на природе", name: "nature" },
          { _id: "123wsdf34df23", title: "дома", name: "home" },
          { _id: "12wwsdf343423", title: "с петами", name: "pets" },
        ],
      },
    },
  },
];

describe("TagsCheckbox", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(
        <MockedProvider mocks={mockQueries} addTypename={false}>
          <TagsCheckbox
            register={register}
            rules={tagsRules}
            setValue={setValue}
            clearError={clearError}
            error={undefined}
            disabled={false}
          />
        </MockedProvider>
      );
    });

    afterEach(cleanup);

    describe("", () => {
      test("It must render label and Sceletons, and after loading checkboxes", async () => {
        const tagsCheckbox = _render.getAllByText("Добавьте тэги к фоте:");

        let tagsFormGroup = document.querySelector(
          `div[class="MuiFormGroup-root ${classes.formGroup}"]`
        );

        expect(tagsCheckbox).toHaveLength(1);

        expect(tagsFormGroup.children).toHaveLength(6);
        expect(tagsFormGroup.children[0].className).toEqual("container");

        await act(async () => {
          await wait(0);
          let tagsFormGroup = document.querySelector(
            `div[class="MuiFormGroup-root ${classes.formGroup}"]`
          );

          expect(tagsFormGroup.children).toHaveLength(6);
          expect(tagsFormGroup.children[0].className).toEqual(
            "MuiFormControlLabel-root"
          );
        });
      });
    });
  });
});
