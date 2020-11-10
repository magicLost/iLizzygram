import React from "react";
import { action } from "@storybook/addon-actions";
//import { MockedProvider } from "@apollo/client/testing";
import { LoginForm } from ".";
//import { LOGIN } from "./../../../hooks/auth/auth.queries";

export default {
  component: LoginForm,
  title: "Auth/Forms/LoginForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <div style={{ padding: "30px" }}>
        <LoginForm
          showAlert={() => console.log("showAlert")}
          login={() => console.log("login")}
          loadingRequest={false}
          onSuccessLogin={login => {
            console.log("onSuccessLogin", login);
          }}
          onLoginError={() => console.log("onLoginError")}
        />
      </div>
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <div style={{ padding: "30px" }}>
        <LoginForm
          showAlert={() => console.log("showAlert")}
          login={() => console.log("login")}
          loadingRequest={true}
          onSuccessLogin={login => {
            console.log("onSuccessLogin", login);
          }}
          onLoginError={() => console.log("onLoginError")}
        />
      </div>
    </>
  );
};
