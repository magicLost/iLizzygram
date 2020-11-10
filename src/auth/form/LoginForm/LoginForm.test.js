import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import wait from "waait";

import LoginForm from ".";
import { LOGIN } from "./../../../hooks/auth/auth.queries";
//import classes from "./LoginForm.module.scss";
import {
  emailRequiredMessage,
  emailValidateMessage,
  passwordMinLengthMessage,
  passwordRequiredMessage,
} from "../User.rules";
import { emailData, passwordData, mockQueriesData } from "./LoginForm.stories";

//We send query request for token
//We show email, password inputs, hide linear progress and send button
//on send we show linear progress and disable all form elements

const onSuccessHandler = jest.fn();
console.log = jest.fn();

describe("LoginForm", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      onSuccessHandler.mockClear();
      _render = render(
        <MockedProvider mocks={mockQueriesData} addTypename={false}>
          <LoginForm onSuccessLogin={onSuccessHandler} />
        </MockedProvider>
      );
    });

    afterEach(cleanup);

    test("We must see email, password input and send button and not see linear progress", () => {
      /* PREPARE */
      /*  const linearProgress = document.querySelector(
        `div[class="${classes.linearProgress}"]`
      ); */
      /* EVAL */
      /* EXPECTS */

      const emailInput = _render.getByLabelText("Адрес электронной почты");

      const submitButton = _render.getByText("Отправить");

      const passwordInput = _render.getByLabelText("Пароль");

      //expect(linearProgress).toEqual(null);
    });

    test("If we submit with empty inputs we get errors", async () => {
      const form = document.querySelector("form");

      const emailInput = _render.getByLabelText("Адрес электронной почты");

      const passwordInput = _render.getByLabelText("Пароль");

      await act(async () => {
        fireEvent.submit(form);

        await wait(0);

        let emailErrorMsg = _render.getByText(emailRequiredMessage);

        let passErrorMsg = _render.getByText(passwordRequiredMessage);
      });
    });

    test("If we submit with bad email and short password get errors", async () => {
      const form = document.querySelector("form");

      const emailInput = _render.getByLabelText("Адрес электронной почты");

      const passwordInput = _render.getByLabelText("Пароль");

      await act(async () => {
        fireEvent.change(emailInput, {
          target: {
            value: "email.ru",
          },
        });

        fireEvent.change(passwordInput, {
          target: {
            value: "hello",
          },
        });

        fireEvent.submit(form);

        await wait(0);

        let emailErrorMsg = _render.getByText(emailValidateMessage);

        let passErrorMsg = _render.getByText(passwordMinLengthMessage);
      });
    });

    test("On success submit", async () => {
      const form = document.querySelector("form");

      const emailInput = _render.getByLabelText("Адрес электронной почты");

      const passwordInput = _render.getByLabelText("Пароль");

      await act(async () => {
        fireEvent.change(emailInput, {
          target: {
            value: emailData,
          },
        });

        fireEvent.change(passwordInput, {
          target: {
            value: passwordData,
          },
        });

        let linearProgress = document.querySelector(`div[role="progressbar"]`);

        expect(linearProgress).toEqual(null);

        fireEvent.submit(form);

        console.log.mockClear();

        await wait(0);

        //const linearProgress = _render.getByLabelText("Пар");

        linearProgress = document.querySelector(`div[role="progressbar"]`);

        expect(linearProgress).not.toEqual(null);

        //expect(console.log).toHaveBeenCalledWith("hello");

        //expect(onSuccessHandler).toHaveBeenCalledTimes(1);

        await wait(1500);

        expect(onSuccessHandler).toHaveBeenCalledWith({
          name: "sia",
          role: "princess",
        });
      });
    });
  });
});
