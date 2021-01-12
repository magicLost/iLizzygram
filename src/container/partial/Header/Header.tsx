import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import NavUserBtnWithMenu from "../../../component/NavUserBtnWithMenu";
import FaceIcon from "@material-ui/icons/Face";
import Skeleton from "@material-ui/lab/Skeleton";
import { IUserResponseToClient } from "../../../types";
import googleIcon from "./../../../../static/google.svg";
import classes from "./Header.module.scss";
import Logo from "./../../../component/Logo";

interface IHeaderProps {
  user: IUserResponseToClient | undefined;
  loading: boolean;
  login: (onError?: Function, onSuccess?: Function) => void;
  logout: () => void;
}

/* const useStyles = makeStyles({
  menuButton: {},
  appBar: {
    backgroundColor: "white", //"#55c57a"
  },
  label: {
    textTransform: "none",
  },
  loginButton: {
    //alignItems: "flex-start",
    textTransform: "none",
  },
  toolbar: {
    //display: "flex",
    //maxWidth: "1300px",
    //margin: "auto",
    justifyContent: "space-around",
  },
}); */

const GoogleIcon = () => <img width={17} src={googleIcon} />;

const getAuthFragment = (
  user: IUserResponseToClient | undefined,
  loading: boolean,
  classes: any,
  login: () => void,
  onLogout: () => void
) => {
  if (loading) {
    return <Skeleton variant="rect" width={100} height={28} />;
  }

  if (user && user.uid) {
    return (
      <NavUserBtnWithMenu
        userButton={
          <Button
            classes={{
              label: classes.label,
            }}
            color="primary"
            startIcon={<FaceIcon />}
          >
            {user.name ? user.name : user.email}
          </Button>
        }
        onLogOutUser={onLogout}
      />
    );
  } else {
    return (
      <Button
        color="primary"
        className={classes.loginButton}
        startIcon={<GoogleIcon />}
        size="small"
        onClick={login}
      >
        Войти с Google
      </Button>
    );
  }
};

/* <Button
        color="primary"
        className={classes.loginButton}
        startIcon={<LockIcon />}
        size="small"
        onClick={showLoginForm}
      >
        Login
      </Button> */

const Header = ({ user, loading, login, logout }: IHeaderProps) => {
  //const classes = useStyles();

  const authFragment = getAuthFragment(user, loading, classes, login, logout);

  console.log("[RENDER HEADER WIDGET]", user, loading);

  return (
    <Container maxWidth="lg">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Logo />

          {authFragment}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

/* const mapStateToProps = (state: IGlobalState) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: () => dispatch(loginAC()),
    logout: () => {
      console.log("logout");
      dispatch(logoutAC());
    },
  };
}; */

//export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
