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
} from "../User.rules";
import { useLoginForm } from "./LoginForm.hook";
import { IUserResponseToClient } from "../../../types";

interface LoginFormProps {
  onSuccessLogin?: (login: IUserResponseToClient) => void | undefined;
  onLoginError?: () => void | undefined;
}

export interface ILoginFormData {
  email: string;
  password: string;
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

const LoginForm = ({
  //hide form modal
  onSuccessLogin,
  //show error message
  onLoginError,
}: LoginFormProps) => {
  const classes = useStyles();

  const { register, onSubmit, loading, errors } = useLoginForm(
    onSuccessLogin,
    onLoginError
  );

  return (
    <div className={classes.root}>
      <form className={classes.root} onSubmit={onSubmit}>
        <div className={classes.element}>
          <EmailInput
            label="Адрес электронной почты"
            name="email"
            inputRef={register(emailUseFormValidation)}
            error={errors.email}
            disabled={loading}
          />
        </div>

        <div className={classes.element}>
          <PasswordInput
            inputRef={register(passwordUseFormValidation)}
            error={errors.password}
            disabled={loading}
            label={"Пароль"}
            name={"password"}
          />
        </div>

        {loading && (
          <div>
            <LinearProgress variant="query" />
          </div>
        )}

        <div className={classes.submitButton}>
          <Button
            disabled={loading}
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

export default LoginForm;
