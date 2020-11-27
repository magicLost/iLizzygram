import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
//import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import NavUserBtnWithMenu from "../../../component/NavUserBtnWithMenu";
//import ButtonLink from "../../../component/UI/ButtonLink/ButtonLink";
import FaceIcon from "@material-ui/icons/Face";
import Skeleton from "@material-ui/lab/Skeleton";
import { IUserResponseToClient } from "../../../types";
//import { showLoginForm } from "../../../apolloClient/cache.controller";
import { IGlobalState } from "../../../store/types";
//import { showLoginFormAC } from "../../../store";
import { logoutAC, loginAC } from "../../../auth";
import { connect } from "react-redux";
import googleIcon from "./../../../../static/google.svg";

interface IHeaderProps {
  Logo: React.FunctionComponent;
  user?: IUserResponseToClient | undefined;
  loading?: boolean;
  onLogin?: (onError?: Function, onSuccess?: Function) => void;
  logout?: () => void;
}

const useStyles = makeStyles({
  menuButton: {},
  appBar: {
    //display: "flex",
    //justifyContent: "center",
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
});

const GoogleIcon = () => <img width={17} src={googleIcon} />;

const getAuthFragment = (
  user: IUserResponseToClient | undefined,
  loading: boolean,
  classes: any,
  onLogin: () => void,
  onLogout: () => void
) => {
  if (loading) {
    return <Skeleton variant="rect" width={100} height={28} />;
  }

  if (user) {
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
        onClick={onLogin}
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

export const Header = ({
  Logo,
  user,
  loading,
  onLogin,
  logout,
}: IHeaderProps) => {
  const classes = useStyles();

  const authFragment = getAuthFragment(user, loading, classes, onLogin, logout);

  console.log("[RENDER HEADER]", user, loading);

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

const mapStateToProps = (state: IGlobalState) => {
  return {
    user: state.auth.user,
    loading: state.auth.authLoading,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
