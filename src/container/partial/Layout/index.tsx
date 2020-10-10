import React, { useEffect } from "react";
//import Head from "next/head";
//import Link from "next/link";
import Container from "@material-ui/core/Container";
//import Footer from "../Footer/Footer";
import Header from "../Header";
import classes from "./Layout.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import IModal from "../../../component/IModal";
import LoginForm from "../../forms/LoginForm";
import ModalCloseButton from "../../../component/UI/ModalCloseButton";
import {
  hideLoginForm,
  hideAlert,
} from "../../../apolloClient/cache.controller";
import Alert from "../../../component/Alert/Alert";
import { useAlert, useAuth, useModal } from "../../../apolloClient/hook";
import { useLogout } from "../../../hooks/auth/auth";
import { checkSavedUser } from "../../../hooks/auth/auth.helper";

interface LayoutProps {
  Logo: React.FunctionComponent;
  children: JSX.Element | JSX.Element[];
}

//const useStyles = makeStyles({});

const Layout = ({ Logo, children }: LayoutProps) => {
  //const classes = useStyles();

  const { alertState } = useAlert();

  const { modalState } = useModal();

  const { authState } = useAuth();
  //const { user, loading } = useAuthUser();

  const { logout } = useLogout();

  useEffect(() => {
    checkSavedUser();
  }, []);

  console.log("[RENDER LAYOUT]");

  return (
    <>
      <Header
        Logo={Logo}
        user={authState.user}
        loading={authState.loading}
        logout={logout}
      />
      <Container component={"main"} className={classes.container} maxWidth="lg">
        {children}
      </Container>

      <IModal open={modalState.openLoginForm} onClose={hideLoginForm}>
        <LoginForm />
      </IModal>

      <Alert
        type={alertState.type}
        isShow={alertState.isShow}
        message={alertState.message}
        hideAlert={hideAlert}
      />
    </>
  );
};

export default Layout;
