import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

//import classes from './CenteredTransitionModal.module.scss';
import { makeStyles } from "@material-ui/core/styles";

interface CenteredTransitionModalProps {
  isShow: boolean;
  hideModal: () => void | undefined;
  modalClass?: string;
  contentClass?: string;
  children: any;
}

const useStyles = makeStyles({
  modal: {
    outline: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  content: {
    position: "relative",
    maxWidth: "600px",
    minWidth: "300px",
    //minHeight: "220px",
    //width: "60%",
    margin: "auto",
    backgroundColor: "#fff",
    padding: "45px 20px 20px",
    borderRadius: "5px",
  },
});

const CenteredTransitionModal = ({
  isShow,
  hideModal,
  modalClass,
  contentClass,
  children,
}: CenteredTransitionModalProps) => {
  const classes = useStyles();

  const cntClass = contentClass ? contentClass : classes.content;
  const mdlClass = modalClass ? modalClass : classes.modal;

  console.log("[RENDER CENTERED TRANSITION MODAL]");

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isShow}
        onClose={hideModal}
        className={mdlClass}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={cntClass}>{children}</div>
      </Modal>
    </>
  );
};

export default CenteredTransitionModal;
