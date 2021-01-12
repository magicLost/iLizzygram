import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  createEvent,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import {
  useForm,
  clearError,
  setValue,
  register,
  handleSubmit,
  submitHandler,
} from "react-hook-form";

import classes from "./../../../component/AddEditPhotoFormWidget/AddEditPhotoFormWidget.module.scss";
import { TAGS } from "./../../../component/FormElements/TagsCheckbox/TagsCheckbox";
import checkboxClasses from "./../../../component/FormElements/TagsCheckbox/TagsCheckbox.module.scss";
//import { mockQueries } from "./../../../component/FormElements/TagsCheckbox/TagsCheckbox.test";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import wait from "waait";
import AddPhotoForm, { UPLOAD_PHOTO } from "./AddPhotoForm";
import { useResetStore } from "../../../hooks/photos/useResetStore";
import { useUploadPhoto } from "./AddPhotoForm.hook";

//const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
const file = {
  name: "chucknorris.png",
};
const desc = "Super puper photo";
const date = "05/10/2019";
const tags = ["123wsdf347423", "123wsdfj43423"];

let isUploadPhoto = false;

jest.mock("../../../hooks/photos/useResetStore", () => {
  return {
    __esModule: true,
    useResetStore: () => {
      return {
        resetStore: jest.fn(),
      };
    },
  };
});
//WE NEED TO MOCK USE_FORM CAUSE IT CAN NOT GET VALUE FROM FILE INPUT
/* jest.mock("react-hook-form", () => {
  const clearError = jest.fn();
  const setValue = jest.fn();
  const register = jest.fn();
  const submitHandler = jest.fn();
  const handleSubmit = jest.fn().mockImplementation((onSubmit) => {
    return submitHandler.mockImplementation((event) => {
      event.preventDefault();
      onSubmit({
        photoFile: {
          name: "chucknorris.png",
        },
        desc: "Super puper photo",
        date: "05/10/2019",
        tags: ["123wsdf347423", "123wsdfj43423"],
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
 */

console.log = jest.fn();
console.error = jest.fn();

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
          { _id: "12wwweq643423", title: "зюганов", name: "zuganov" },
        ],
      },
    },
  },
  {
    request: {
      query: UPLOAD_PHOTO,
      variables: {
        file,
        desc,
        date,
        tags,
      },
    },
    result: () => {
      isUploadPhoto = true;

      return {
        data: {
          photoUpload: {
            srcSet: "hello.png",
          },
        },
      };
    },
  },
];

describe("AddPhotoForm", () => {
  let _render = null;

  /*global.console = {
    log: jest.fn(),
    // error: jest.fn(),
  };*/

  beforeEach(() => {
    /*  clearError.mockClear();
      setValue.mockClear();
      register.mockClear();
      handleSubmit.mockClear(); */
    //useResetStore.resetStore.mockClear();
    _render = render(
      <MockedProvider mocks={mockQueries} addTypename={false}>
        <AddPhotoForm />
      </MockedProvider>
    );
  });

  afterEach(cleanup);

  describe("", () => {
    /* test("It must show upload button, desc textarea, upload button, checkbox add tags, date input and submit button", async () => {
      await act(async () => {
        const uploadButton = _render.getByLabelText("Добавить фоту");

        const submitButton = _render.getByText("Отправить");

        const textarea = _render.getByLabelText(
          "Небольшое необязательное описание."
        );

        const dateInput = _render.getByLabelText(
          "Когда сделан снимок(примерно)."
        );

        const tagsCheckbox = _render.getByText("Добавьте тэги к фоте:");

        const tagsFormGroup = document.querySelector(
          `div[class="MuiFormGroup-root ${checkboxClasses.formGroup}"]`
        );

        //NO LINEAR PROGRESS
        const progress = document.querySelector(
          `div[class="${classes.linearProgress}"]`
        );

        expect(progress).toEqual(null);

        expect(tagsFormGroup.children).toHaveLength(7);

        await wait(0);

        const tag = _render.getByText("зюганов");
      });
    }); */

    /*  test("We set data with fireEvent", async () => {
      await act(async () => {
        await setValuesToForm(_render);
      });
    }); */

    test("Submit", async () => {
      await act(async () => {
        const form = document.querySelector("form");

        await setValuesToForm(_render);

        console.log.mockClear();
        console.error.mockClear();

        expect(console.log).toHaveBeenCalledTimes(0);

        fireEvent.submit(form);

        //expect(console.log).toHaveBeenCalledTimes(1);
        //expect(console.log).toHaveBeenCalledWith("hello");

        let progress = document.querySelector(
          `div[class="${classes.linearProgress}"]`
        );

        expect(progress).toEqual(null);

        await wait(0);

        //const textarea = _render.getByLabelText("Небольшо");

        //const photoFileError = _render.getByText("А где фота?");
        expect(progress).toEqual(null);

        //expect(progress).toEqual(null);

        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("hel");

        /*    expect(console.log).toHaveBeenCalledTimes(7);
        expect(console.log).toHaveBeenNthCalledWith(3, "[COMPLETE]");*/

        //await wait(0);

        //expect(isUploadPhoto).toEqual(true);
        // expect(progress).toEqual(null);

        //SEE WHAT WE GOT IN USE_MUTATION
        //fireEvent.submit(form);
        //await wait(0);

        //WE CALL MUTATION AND IT COMPLETE ALREADY

        //expect(handleSubmit).toHaveBeenCalledTimes(1);
        //expect(submitHandler).toHaveBeenCalledTimes(1);
        //expect(register).toHaveBeenCalledTimes(8);
        //expect(_render.asFragment()).toEqual("hello");

        /* progress = document.querySelector(
            `div[class="${classes.linearProgress}"]`
          );*/

        //expect(isUploadPhoto).toEqual(true);
        //expect(progress).toEqual(null);
      });
    });
  });
});

const setValuesToForm = async (_render) => {
  await wait(0);
  //SET TAGS CHECKBOXES
  let tagsFormGroup = document.querySelector(
    `div[class="MuiFormGroup-root ${classes.formGroup}"]`
  );

  expect(tagsFormGroup.children).toHaveLength(7);
  expect(tagsFormGroup.children[0].className).toEqual(
    "MuiFormControlLabel-root"
  );

  const checkbox = tagsFormGroup.children[0].querySelector(
    'input[type="checkbox"]'
  );
  const checkbox4 = tagsFormGroup.children[3].querySelector(
    'input[type="checkbox"]'
  );

  expect(checkbox.checked).toEqual(false);
  expect(checkbox4.checked).toEqual(false);

  fireEvent.click(checkbox);
  fireEvent.click(checkbox4);

  expect(checkbox.checked).toEqual(true);
  expect(checkbox4.checked).toEqual(true);

  //SET DESC IN TEXTAREA
  const textarea = _render.getByLabelText("Небольшое необязательное описание.");

  fireEvent.change(textarea, {
    target: {
      value: desc,
    },
  });

  expect(textarea.value).toEqual(desc);

  //SET DATE
  const dateInput = _render.getByLabelText("Когда сделан снимок(примерно).");

  fireEvent.change(dateInput, {
    target: {
      value: date,
    },
  });

  await wait(0);
  expect(dateInput.value).toEqual(date);

  //SET FILE
  const uploadFileInput = _render.getByLabelText("Добавить фоту");

  fireEvent.change(uploadFileInput, {
    target: {
      files: [file],
    },
  });

  expect(uploadFileInput.files[0].name).toEqual("chucknorris.png");
};
