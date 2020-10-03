import React, { useEffect } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
//import Fade from "@material-ui/core/Fade";

interface ITransitionModalProps {
  isShow: boolean;
  hideModal: () => void | undefined;
  modalClass?: string;
  children: any;
}

/* const useStyles = makeStyles({
  stopScrolling: {
    height: "100%",
    overflow: "hidden",
  },
}); */

export default function TransitionsModal({
  isShow,
  hideModal,
  modalClass,
  children,
}: ITransitionModalProps) {
  //const classes = useStyles();

  /* useEffect(() => {
    if (isShow === true) document.body.classList.add(classes.stopScrolling);
    else document.body.classList.remove(classes.stopScrolling);
  }, [isShow]); */

  console.log("[RENDER TRANSITION MODAL]");

  //<Fade in={isShow}>{children}</Fade>
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isShow}
        onClose={hideModal}
        className={modalClass}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <>{children}</>
      </Modal>
    </>
  );
}
