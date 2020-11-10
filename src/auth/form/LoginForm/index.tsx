import React from "react";
import { useForm } from "react-hook-form";
import EmailInput from "../../../component/FormElements/EmailInput";
import PasswordInput from "../../../component/FormElements/PasswordInput";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
//import classes from './LoginForm.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import {
  emailUseFormValidation,
  passwordUseFormValidation,
} from "../../../photos/form/User.rules";
import { useLoginForm } from "./LoginForm.hook";
//import { IUserResponseToClient } from "../../../types";
import { connect } from "react-redux";
import { IGlobalState } from "../../../store/types";
import { Color } from "@material-ui/lab/Alert";
import { showAlertAC, showForgetPassFormAC } from "../../../store";
import { loginAC } from "../../store/action";
import { ILoginFormData } from "../../types";

interface LoginFormProps {
  loadingRequest?: boolean;
  login?: (
    data: ILoginFormData,
    onError?: Function,
    onSuccess?: Function
  ) => void;
  showAlert?: (message: string, type: Color) => void;
  showForgetPassForm?: () => void;
  onSuccessLogin?: () => void | undefined;
  onLoginError?: () => void | undefined;
}

const useStyles = makeStyles({
  root: {
    display: "block",
    minWidth: "350px",
    width: "60%",
    margin: "auto",
  },

  element: {
    width: "100%",
    paddingBottom: "15px",
  },

  linearProgress: {
    //padding-top: 6px;
  },

  submitButton: {
    paddingTop: "6px",
  },

  forgetPassButtonWrapper: {
    paddingTop: "12px",
    textTransform: "none",
  },

  forgetPassButton: {
    textTransform: "none",
  },
});

export const LoginForm = ({
  showAlert,
  showForgetPassForm,
  login,
  loadingRequest,
  //hide form modal
  onSuccessLogin,
  //show error message
  onLoginError,
}: LoginFormProps) => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useLoginForm();
  //onSuccessLogin,
  //onLoginError

  const onSuccess = () => {
    if (onSuccessLogin) onSuccessLogin();
  };

  const onError = (code: string) => {
    if (
      code === "auth/wrong-password" ||
      code == "auth/invalid-email" ||
      code === "auth/user-not-found"
    )
      showAlert("Неверный пароль или электронный адрес.", "error");
    else showAlert("Какая-то ошибка. Попробуйте позже.", "error");

    if (onLoginError) onLoginError();
  };

  const onSubmit = handleSubmit((formData: ILoginFormData) => {
    console.log("SUBMIT", formData);
    // SEND PASS AND EMAIL TO FIREBASE
    login(formData, onError, onSuccess);
  });

  const onForgetPassClick = (event: any) => {
    event.preventDefault();

    showForgetPassForm();
  };

  return (
    <div className={classes.root}>
      <form className={classes.root} onSubmit={onSubmit}>
        <div className={classes.element}>
          <EmailInput
            label="Адрес электронной почты"
            name="email"
            inputRef={register(emailUseFormValidation)}
            error={errors.email}
            disabled={loadingRequest}
          />
        </div>

        <div className={classes.element}>
          <PasswordInput
            inputRef={register(passwordUseFormValidation)}
            error={errors.password}
            disabled={loadingRequest}
            label={"Пароль"}
            name={"password"}
          />
        </div>

        {loadingRequest && (
          <div>
            <LinearProgress variant="query" />
          </div>
        )}

        <div className={classes.submitButton}>
          <Button
            disabled={loadingRequest}
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
          >
            Отправить
          </Button>
        </div>
        <div className={classes.forgetPassButtonWrapper}>
          <Button
            disabled={loadingRequest}
            size="small"
            color="primary"
            fullWidth
            variant="text"
            className={classes.forgetPassButton}
            onClick={onForgetPassClick}
          >
            Забыли пароль?
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  return {
    loadingRequest: state.auth.loginLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showForgetPassForm: () => dispatch(showForgetPassFormAC()),
    showAlert: (message: string, type: Color) =>
      dispatch(showAlertAC(message, type)),
    login: (data: ILoginFormData, onError?: Function, onSuccess?: Function) => {
      dispatch(loginAC(data, onError, onSuccess));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
