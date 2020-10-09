import React from "react";
import { action } from "@storybook/addon-actions";
import { MockedProvider } from "@apollo/client/testing";
import LoginForm from ".";
import { LOGIN } from "./../../../hooks/auth/auth.queries";

export default {
  component: LoginForm,
  title: "Forms/LoginForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const emailData = "sia@mail.ru";
export const passwordData = "1234pass";

export const mockQueriesData = [
  {
    request: {
      query: LOGIN,
      variables: {
        loginInput: {
          email: emailData,
          password: passwordData,
        },
      },
    },
    result: async () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: {
              login: {
                name: "sia",
                role: "princess",
              },
            },
          });
        }, 1000);
      });
    },
  },
];

export const Default = () => {
  return (
    <>
      <h4 style={{ textAlign: "center" }}>
        For correct response use email: {emailData} and pass: {passwordData}{" "}
      </h4>
      <div style={{ padding: "30px" }}>
        <MockedProvider mocks={mockQueriesData} addTypename={true}>
          <LoginForm
            onSuccessLogin={login => {
              console.log("onSuccessLogin", login);
            }}
            onLoginError={() => console.log("onLoginError")}
          />
        </MockedProvider>
      </div>
    </>
  );
};
