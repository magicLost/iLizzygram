import React, { useEffect } from "react";
//import Head from "next/head";
//import Link from "next/link";
import Container from "@material-ui/core/Container";
//import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import classes from "./Layout.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import CenteredTransitionModal from "../../../component/Modal/CenteredTransitionModal/CenteredTransitionModal";
import LoginForm from "../../forms/LoginForm/LoginForm";
import ModalCloseButton from "../../../component/UI/ModalCloseButton/ModalCloseButton";
import {
  hideLoginForm,
  hideAlert,
} from "./../../../hooks/cache/cache.controller";
import Alert from "../../../component/Alert/Alert";
import { useAlert, useModal } from "../../../hooks/cache";
import { useAuthUser, useLogout } from "../../../hooks/auth/auth";
import { checkSavedUser } from "../../../hooks/auth/auth.helper";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

//const useStyles = makeStyles({});

const Layout = ({ children }: LayoutProps) => {
  //const classes = useStyles();

  const { alertState } = useAlert();

  const { modalState } = useModal();

  const { user, loading } = useAuthUser();

  const { logout } = useLogout();

  useEffect(() => {
    checkSavedUser();
  }, []);

  console.log("[RENDER LAYOUT]");

  return (
    <>
      <Header user={user} loading={loading} logout={logout} />
      <Container component={"main"} className={classes.container} maxWidth="lg">
        {children}
      </Container>

      <CenteredTransitionModal
        isShow={modalState.openLoginForm}
        hideModal={hideLoginForm}
      >
        <LoginForm />
        <ModalCloseButton
          ariaLabel="close login form"
          onClick={hideLoginForm}
        />
      </CenteredTransitionModal>

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
