import React from "react";
import { action } from "@storybook/addon-actions";
import CenteredTransitionModal from "./CenteredTransitionModal";
import ModalCloseButton from "../../UI/ModalCloseButton/ModalCloseButton";

export default {
  component: CenteredTransitionModal,
  title: "Modal/CenteredTransitionModal",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <CenteredTransitionModal
        isShow={true}
        hideModal={() => console.log("Hide modal.")}
      >
        <div>
          <h4>Greetings...</h4>
          <p>
            Hello, form modal. Hello, form modal. Hello, form modalHello, form
            modalHello, form modalHello, form modalHello, form modalHello, form
            modal
          </p>
          <p>
            Hello, form modal. Hello, form modal. Hello, form modalHello, form
            modalHello, form modalHello, form modalHello, form modalHello, form
            modal
          </p>
          <p>
            Hello, form modal. Hello, form modal. Hello, form modalHello, form
            modalHello, form modalHello, form modalHello, form modalHello, form
            modal
          </p>

          <p>
            Hello, form modal. Hello, form modal. Hello, form modalHello, form
            modalHello, form modalHello, form modalHello, form modalHello, form
            modal
          </p>
        </div>
        <ModalCloseButton
          onClick={() => console.log("onClick")}
          ariaLabel="close something"
          closeIconSize="default"
        />
      </CenteredTransitionModal>
    </>
  );
};
