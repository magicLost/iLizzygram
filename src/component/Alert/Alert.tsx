import React, { FC } from "react";
//import classes from './Alert.module.scss';
//import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { Color } from "@material-ui/lab/Alert";
//import { hideAlertAC } from "../../store";
//import { IAlertState } from "../../store/reducer";
//import { IGlobalState } from "../../store/types";
//import { connect } from "react-redux";

interface IAlertProps {
  type: Color;
  isShow: boolean;
  message: string;
  hideAlert: () => void | undefined;
}

/* const useStyles = makeStyles({
  root: {
    display: "block",
  },
}); */

export const Alert: FC<IAlertProps> = ({
  type,
  isShow,
  message,
  hideAlert,
}) => {
  //const classes = useStyles();

  console.log("[ALERT WIDGET] RENDER");

  return (
    <Snackbar
      open={isShow}
      autoHideDuration={6000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={hideAlert}
        severity={type}
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

/* const mapStateToProps = (state: IGlobalState) => {
  return {
    type: state.alert.type,
    isShow: state.alert.isShow,
    message: state.alert.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //hideLoginForm: () => dispatch(hideLoginFormAC()),
    hideAlert: () => dispatch(hideAlertAC()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert); */
export default Alert;
