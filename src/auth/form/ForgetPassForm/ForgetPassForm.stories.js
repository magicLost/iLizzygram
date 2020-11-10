import React from "react";
import { action } from "@storybook/addon-actions";
//import { MockedProvider } from "@apollo/client/testing";
import { ForgetPassForm } from ".";
//import { LOGIN } from "./../../../hooks/auth/auth.queries";

export default {
  component: ForgetPassForm,
  title: "Auth/Forms/ForgetPassForm",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const showAlert = (msg, type) => {
  console.log(`ALERT TYPE - ${type} - MSG - ${msg}`);
};

const sendEmail = (email, onError, onSuccess) => {
  onError();
  onSuccess();
};

export const Default = () => {
  return (
    <>
      <div style={{ padding: "30px" }}>
        <ForgetPassForm
          showAlert={showAlert}
          sendEmail={sendEmail}
          loadingRequest={false}
          onSuccessEmail={() => {
            console.log("onSuccessEmail", login);
          }}
          onErrorEmail={() => console.log("onErrorEmail")}
        />
      </div>
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <div style={{ padding: "30px" }}>
        <ForgetPassForm
          showAlert={() => console.log("showAlert")}
          sendEmail={() => console.log("sendEmail")}
          loadingRequest={true}
          onSuccessEmail={() => {
            console.log("onSuccessEmail");
          }}
          onErrorEmail={() => console.log("onErrorEmail")}
        />
      </div>
    </>
  );
};
