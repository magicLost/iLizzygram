import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { doSomething } from "./Test.helper";
import { act } from "react-dom/test-utils";
import wait from "waait";
import {
  useForm,
  clearError,
  setValue,
  register,
  submitHandler,
  handleSubmit,
} from "react-hook-form";

import Test, { Form } from "./Test";

jest.mock("./Test.helper", () => {
  //const originalModule = jest.requireActual("./Test");

  return {
    __esModule: true,
    //...originalModule,
    doSomething: jest.fn(),
  };
});

jest.mock("react-hook-form", () => {
  const clearError = jest.fn();
  const setValue = jest.fn();
  const register = jest.fn();
  const submitHandler = jest.fn();
  const handleSubmit = jest.fn().mockImplementation((onSubmit) => {
    return submitHandler.mockImplementation((event) => {
      event.preventDefault();
      onSubmit({
        photoFile: "photoFile",
        desc: "desc",
        date: "date",
        tags: "tags",
      });
    });
  });
  return {
    __esModule: true,
    clearError,
    setValue,
    register,
    handleSubmit,
    submitHandler,
    useForm: jest.fn().mockImplementation(() => {
      return {
        register,
        handleSubmit,
        setValue,
        clearError: clearError,
        errors: {},
      };
    }),
  };
});

const onSubmit = jest.fn().mockImplementation((data) => console.log(data));

describe("Test", () => {
  let _render = null;

  describe("Render", () => {
    beforeEach(() => {
      _render = render(<Form onSubmit={onSubmit} />);
    });

    afterEach(cleanup);

    test("It must render Hello and it must call doSomething", async () => {
      expect(useForm).toHaveBeenCalledTimes(1);
      const submitButton = _render.getByText("GO");
      const form = document.querySelector("form");

      await act(async () => {
        const input = document.querySelector('input[name="exampleRequired"]');

        //expect(input).toEqual("hello");

        fireEvent.change(input, {
          target: {
            file: new File(["foo"], "chucknorris.txt", {
              type: "text/plain",
            }),
          },
        });

        fireEvent.submit(form);
        await wait(0);
        //const error = document.querySelector("span");

        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(submitHandler).toHaveBeenCalledTimes(1);
        //expect(error).toEqual("hello");
        //expect(onSubmit).toHaveBeenCalledTimes(1);
      });
    });
  });
});

/* describe("Test", () => {
  let _render = null;

  describe("Render", () => {
    beforeEach(() => {
      _render = render(<Test />);
    });

    afterEach(cleanup);

    test("It must render Hello and it must call doSomething", () => {
      const logos = _render.getAllByText("Hello");

      expect(doSomething).toHaveBeenCalledTimes(1);

      expect(logos).toHaveLength(1);

      _render.rerender(<Test />);

      expect(doSomething).toHaveBeenCalledTimes(1);
    });
  });
}); */
