import React from "react";
//import classes from './IModal.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
//import classes from './LoadableBackDrop.module.scss';
import Modal from "@material-ui/core/Modal";
import ModalCloseButton from "../UI/ModalCloseButton";

interface IModalProps {
  open: boolean;
  onClose: () => void | undefined;
  children: any;
}

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    border: "none",
    backgroundColor: "transparent",
  },
  wrapper: {
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
  /* content: {
    minWidth: "300px",
    maxWidth: "600px",
    minHeight: "200px",
    backgroundColor: "white",
    padding: "20px",
    textAlign: "center",
  }, */
});

const IModal = ({ open, onClose, children }: IModalProps) => {
  const classes = useStyles();

  /* const [state, setState] = React.useState({
    open: false,
    showContent: false,
  });
  const handleClose = () => {
    setState(state => ({ showContent: false, open: false }));
  };
  const handleToggle = () => {
    setState(state => ({ showContent: false, open: true }));
    setTimeout(() => {
      setState(state => ({ ...state, showContent: true }));
    }, 1000);
  }; */

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
        <div className={classes.wrapper}>
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
