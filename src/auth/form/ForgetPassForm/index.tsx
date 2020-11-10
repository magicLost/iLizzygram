import React from "react";
import { useForm } from "react-hook-form";
import EmailInput from "../../../component/FormElements/EmailInput";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
//import classes from './LoginForm.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import { emailUseFormValidation } from "../../../photos/form/User.rules";
//import { IUserResponseToClient } from "../../../types";
import { connect } from "react-redux";
import { IGlobalState } from "../../../store/types";
import { Color } from "@material-ui/lab/Alert";
import { showAlertAC } from "../../../store";
import { forgetPassAC } from "../../store/action";
import { IForgetPassFormData } from "../../types";

interface ForgetPassFormProps {
  loadingRequest?: boolean;
  sendEmail?: (email: string, onError?: Function, onSuccess?: Function) => void;
  showAlert?: (message: string, type: Color) => void;
  onSuccessEmail?: () => void | undefined;
  onErrorEmail?: () => void | undefined;
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
});

export const ForgetPassForm = ({
  showAlert,
  sendEmail,
  loadingRequest,
  //hide form modal
  onSuccessEmail,
  //show error message
  onErrorEmail,
}: ForgetPassFormProps) => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm<IForgetPassFormData>();
  //onSuccessLogin,
  //onLoginError

  const onSuccess = () => {
    showAlert(
      "Мы отправили письмо, на указанный вами адрес, содержащее ссылку для установки нового пароля.",
      "success"
    );
    if (onSuccessEmail) onSuccessEmail();
  };

  const onError = () => {
    showAlert("Какая-то ошибка. Попробуйте позже.", "error");
    if (onErrorEmail) onErrorEmail();
  };

  const onSubmit = handleSubmit((formData: IForgetPassFormData) => {
    console.log("SUBMIT", formData);
    // SEND PASS AND EMAIL TO FIREBASE
    sendEmail(formData.email, onError, onSuccess);
  });

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
      </form>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  return {
    loadingRequest: state.auth.forgetPassLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAlert: (message: string, type: Color) =>
      dispatch(showAlertAC(message, type)),
    sendEmail: (email: string, onError?: Function, onSuccess?: Function) => {
      dispatch(forgetPassAC(email, onError, onSuccess));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassForm);
