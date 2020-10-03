import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import TransitionModal from "./TransitionModal";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import { useCarouselOpacity } from "../../../hooks/carousel/carousel";
import CarouselOpacity from "../../Carousel/CarouselOpacity/CarouselOpacity";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "50%",
    //margin: "auto",
    height: "50%",
    textAlign: "center",
    backgroundColor: "white",
  },
  fullWidthContent: {
    width: "100%",
    //margin: "auto",
    height: "100%",
    textAlign: "center",
    backgroundColor: "white",
  },
  freeSizeContent: {
    //margin: "auto",
    //alignSelf: "flex-start",
    textAlign: "center",
    backgroundColor: "white",
  },
  alignSelfFlexStart: {
    alignSelf: "flex-start",
  },
});

export default {
  component: TransitionModal,
  title: "Modal/TransitionModal",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const classes = useStyles();
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      {isShowModal === false && (
        <Button onClick={() => setIsShowModal(true)}>Show modal</Button>
      )}
      <TransitionModal
        isShow={isShowModal}
        hideModal={() => setIsShowModal(false)}
        modalClass={classes.modal}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            width: "500px",
            height: "300px",
          }}
        >
          <h4>Hello, form modal</h4>
        </div>
      </TransitionModal>
    </>
  );
};

export const NestedModal = () => {
  const classes = useStyles();
  const [state, setState] = useState({ type: "free", isShow: false });
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      {state.isShow === false && (
        <Button onClick={() => setState({ type: "full", isShow: true })}>
          Show modal
        </Button>
      )}

      <TransitionModal
        isShow={state.isShow}
        hideModal={() => setState({ type: "full", isShow: false })}
        modalClass={classes.modal}
      >
        <>
          {state.type === "full" && (
            <div className={classes.fullWidthContent}>
              <h4>Full width content</h4>
              <Button onClick={() => setState({ type: "free", isShow: true })}>
                To free size
              </Button>
              <Button onClick={() => setIsShowModal(true)}>Open modal</Button>
              <TransitionModal
                isShow={isShowModal}
                hideModal={() => setIsShowModal(false)}
                modalClass={classes.modal}
              >
                <Box
                  className={classes.freeSizeContent}
                  width="500px"
                  height="300px"
                  overflow="auto"
                  padding="10px"
                >
                  <h4>Additional modal.</h4>
                  <p>
                    Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na... Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na... Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na... Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na... Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na... Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na... Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na... Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na... Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na... Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na... Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na... Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na... Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na... Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...Hello, my friend, poshel na...Hello, my friend, poshel
                    na...
                  </p>
                </Box>
              </TransitionModal>
            </div>
          )}

          {state.type === "free" && (
            <div
              className={[
                classes.freeSizeContent,
                classes.alignSelfFlexStart,
              ].join(" ")}
            >
              <Box width="500px" height="800px">
                <h4>Free size content</h4>
                <Button
                  onClick={() => setState({ type: "full", isShow: true })}
                >
                  To full size
                </Button>
              </Box>
            </div>
          )}
        </>
      </TransitionModal>
    </>
  );
};
