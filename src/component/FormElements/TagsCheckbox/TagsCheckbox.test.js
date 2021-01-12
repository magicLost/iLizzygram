import React, { useState } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";
import TagsCheckbox, { TAGS } from ".";
import classes from "./TagsCheckbox.module.scss";
import { act } from "react-dom/test-utils";
import wait from "waait";
import {
  defaultTagsIds,
  tagsData,
  state as tagsState,
} from "../../../hooks/photos/useTags.mock";

const label = "My tags";

const onCheckboxChange = jest.fn();
//const setValue = jest.fn();
const register = jest.fn();
//const watch = jest.fn(() => tagsState);
const tagsRules = {};

//const ddefaultTagsIds = ["123wsdf343423", "123wsdf34df23", "12wwsdf343423"];

/* const Wrapper = ({ defaultTagsIds }) => {
  const [tagsState, setTagsState] = useState({
    /* "123wsdf347423": false,
    "123wsdf343423": false,
    "123wsdd343423": false,
    "123wsdfj43423": false,
    "123wsdf34df23": false,
    "12wwsdf343423": false, 
  });

  const setValue = (name, state) => {
    //console.log("setTagsState", state);
    setTagsState(state);
  };

  const watch = name => {
    return tagsState;
  };

  return (
    <TagsCheckbox
      items={data ? data.tags : data}
      itemsState={tagsState}
      loading={loading}
      queryError={false}
      onChange={onCheckboxChange}
      error={undefined}
      disabled={false}
      label={label}
      defaultTagsIds={defaultTagsIds}
    />
  );
}; */

describe("TagsCheckbox", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {});

    afterEach(cleanup);

    describe("", () => {
      test("It must render label and Sceletons on loading checkboxes", async () => {
        _render = render(
          <TagsCheckbox
            items={tagsData}
            itemsState={tagsState}
            loading={true}
            queryError={false}
            onChange={onCheckboxChange}
            error={undefined}
            disabled={false}
            label={label}
          />
        );

        const tagsCheckbox = _render.getAllByText(label);

        let tagsFormGroup = document.querySelector(
          `div[class="MuiFormGroup-root ${classes.formGroup}"]`
        );

        expect(tagsCheckbox).toHaveLength(1);

        expect(tagsFormGroup.children).toHaveLength(7);
        expect(tagsFormGroup.children[0].className).toEqual("container");
      });

      test("It must set checked to true on defaultTagsIds", async () => {
        const state = { ...tagsState };
        state["123wsdd343423"] = true;
        state["123wsdf34df23"] = true;
        _render = render(
          <TagsCheckbox
            items={tagsData}
            itemsState={state}
            loading={false}
            queryError={false}
            onChange={onCheckboxChange}
            error={undefined}
            disabled={false}
            label={label}
          />
        );

        let tagsFormGroup = document.querySelector(
          `div[class="MuiFormGroup-root ${classes.formGroup}"]`
        );

        expect(tagsFormGroup.children).toHaveLength(6);
        expect(tagsFormGroup.children[0].className).toEqual(
          "MuiFormControlLabel-root"
        );

        expect(
          tagsFormGroup.children[1].querySelector("input").checked
        ).toEqual(false);
        expect(
          tagsFormGroup.children[0].querySelector("input").checked
        ).toEqual(false);
        expect(
          tagsFormGroup.children[2].querySelector("input").checked
        ).toEqual(true);
        expect(
          tagsFormGroup.children[3].querySelector("input").checked
        ).toEqual(false);
        expect(
          tagsFormGroup.children[4].querySelector("input").checked
        ).toEqual(true);
        expect(
          tagsFormGroup.children[5].querySelector("input").checked
        ).toEqual(false);
      });
    });

    describe("Snapshots", () => {
      test("We got skeletons on load snapshot", () => {
        _render = render(
          <TagsCheckbox
            items={tagsData}
            itemsState={tagsState}
            loading={true}
            queryError={false}
            onChange={onCheckboxChange}
            error={undefined}
            disabled={false}
            label={label}
          />
        );

        const { baseElement } = _render;
        expect(baseElement).toMatchSnapshot();
      });

      test("We got checkboxes on load data snapshot", async () => {
        const state = { ...tagsState };
        state["123wsdd343423"] = true;
        state["123wsdf34df23"] = true;
        _render = render(
          <TagsCheckbox
            items={tagsData}
            itemsState={state}
            loading={false}
            queryError={false}
            onChange={onCheckboxChange}
            error={undefined}
            disabled={false}
            label={label}
          />
        );

        const { baseElement } = _render;
        expect(baseElement).toMatchSnapshot();
      });
      /*   test("We got checkboxes with default values on load data snapshot", async () => {
        _render.rerender(
          <MockedProvider mocks={mockQueries} addTypename={false}>
            <Wrapper defaultTagsIds={ddefaultTagsIds} />
          </MockedProvider>
        );

        await act(async () => {
          await wait(0);

          await wait(0);

          const { baseElement } = _render;
          expect(baseElement).toMatchSnapshot();
        });
      }); */
    });
  });
});
