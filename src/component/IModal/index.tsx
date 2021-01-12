import React from "react";
import classes from "./IModal.module.scss";
//import { makeStyles } from "@material-ui/core/styles";
//import CircularProgress from "@material-ui/core/CircularProgress";
//import Button from "@material-ui/core/Button";
//import classes from './LoadableBackDrop.module.scss';
import Modal from "@material-ui/core/Modal";
import ModalCloseButton from "../UI/ModalCloseButton";

type TModalType = "slider" | "form";

interface IModalProps {
  open: boolean;
  type: TModalType;
  onClose: () => void | undefined;
  children: any;
}
/* 
const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    border: "none",
    backgroundColor: "transparent",
  },
  wrapperForm: {
    position: "relative",
    outline: 0,
    "&:focus": {
      outline: "0 !important",
    },
    overflow: "auto",
    maxHeight: "80%",
    backgroundColor: "white",
    padding: "50px 25px 25px",
  },

  wrapperSlider: {
    position: "relative",
    outline: 0,
    "&:focus": {
      outline: "0 !important",
    },
    overflow: "auto",
    //maxHeight: "80%",
    backgroundColor: "white",
    //padding: "50px 25px 25px",
    width: "100%",
  },
}); */

const IModal = ({ open, type, onClose, children }: IModalProps) => {
  //const classes = useStyles();

  let wrapperClass = "";

  if (type === "form") wrapperClass = classes.wrapperForm;
  else if (type === "slider") wrapperClass = classes.wrapperSlider;

  return (
    <>
      {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button> */}
      <Modal
        open={open}
        className={classes.modal}
        onClose={onClose}
        disableAutoFocus={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={wrapperClass}>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Закрыть модальное окно."
          />
          {children}
        </div>
      </Modal>
    </>
  );
};

export default IModal;
