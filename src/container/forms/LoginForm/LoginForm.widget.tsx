import React from "react";
//import classes from './LoginForm.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { IUserResponseToClient } from "../../../../server/api/entity/User/User.model";
import {
  emailUseFormValidation,
  passwordUseFormValidation,
} from "../../../../server/api/entity/User/User.validators";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import EmailInput from "../../../component/FormElements/EmailInput/EmailInput";
import PasswordInput from "../../../component/FormElements/PasswordInput/PasswordInput";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

interface LoginFormProps {
  //onSuccessHandler: (user: IUserResponseToClient) => void | undefined;
  loading: boolean;
  register: any;
  onSubmit: any;
  errors: any;
  //showAlert,
  //setUser // set user to global state
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

const LoginFormWidget = ({
  loading,
  register,
  onSubmit,
  errors,
}: LoginFormProps) => {
  const classes = useStyles();

  /*  const { register, handleSubmit, errors } = useForm<ILoginFormData>();

  const [login, { data, loading }] = useMutation<ILoginResponseData>(LOGIN, {
    onCompleted: (data) => {
      /*show success alert
      onSuccessHandler(data.login);
      //hide form();
      console.log("[COMPLETE]", data);
    },
    onError: (err) => {
      /*show error alert
      console.error("BAD LOGIN", err.message);
    },
  }); */

  /* const onSubmit = ({ email, password }) => {
    console.log("SUBMIT", email, password);
    login({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  }; */

  //onSubmit={handleSubmit(onSubmit)}
  return (
    <div className={classes.root}>
      <form className={classes.root} onSubmit={onSubmit}>
        <div className={classes.element}>
          <EmailInput
            register={register}
            rules={emailUseFormValidation}
            error={errors.email}
            disabled={loading}
          />
        </div>

        <div className={classes.element}>
          <PasswordInput
            register={register}
            rules={passwordUseFormValidation}
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

export default LoginFormWidget;
