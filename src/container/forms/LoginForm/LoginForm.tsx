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
import LoginFormWidget from "./LoginForm.widget";
import { useLogin } from "../../../hooks/auth/auth";

interface LoginFormProps {
  //onSuccessHandler: (user: IUserResponseToClient) => void | undefined;
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

const LoginForm = ({}: LoginFormProps) => {
  //const classes = useStyles();

  const { register, handleSubmit, errors } = useForm<ILoginFormData>();

  const { login, loading } = useLogin();
  /* const [login, { data, loading }] = useMutation<ILoginResponseData>(LOGIN, {
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

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log("SUBMIT", email, password);
    login({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });
  });

  return (
    <LoginFormWidget
      onSubmit={onSubmit}
      register={register}
      loading={loading}
      errors={errors}
    />
  );
};

export default LoginForm;
