import React from "react";
//import { action } from "@storybook/addon-actions";
import { MockedProvider } from "@apollo/client/testing";
import LoginForm from "./LoginForm";
import { LOGIN } from "../../../hooks/auth/auth.queries";
import CenteredTransitionModal from "../../../component/Modal/CenteredTransitionModal/CenteredTransitionModal";
import ModalCloseButton from "../../../component/UI/ModalCloseButton/ModalCloseButton";

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
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              login: {
                name: "sia",
                role: "user",
              },
            },
          });
        }, 1000);
      });
    },
  },
];

/* result: {
      data: {
        login: {
          name: "sia",
          role: "user",
        },
      },
    }, */

export default {
  component: LoginForm,
  title: "Forms/LoginForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <h4 style={{ textAlign: "center" }}>
        For correct response use email: {emailData} and pass: {passwordData}{" "}
      </h4>
      <div style={{ padding: "30px" }}>
        <MockedProvider mocks={mockQueriesData} addTypename={false}>
          <LoginForm />
        </MockedProvider>
      </div>
    </>
  );
};

export const InModal = () => {
  return (
    <>
      <div>
        <MockedProvider mocks={mockQueriesData} addTypename={false}>
          <CenteredTransitionModal
            isShow={true}
            hideModal={() => console.log("hideLoginForm")}
          >
            <LoginForm />
            <ModalCloseButton
              ariaLabel="close login form"
              onClick={() => console.log("hideLoginForm")}
            />
          </CenteredTransitionModal>
        </MockedProvider>
      </div>
    </>
  );
};
