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
import { showLoginForm } from "../../../apolloClient/cache.controller";

interface IHeaderProps {
  Logo: React.FunctionComponent;
  user: IUserResponseToClient | undefined;
  loading: boolean;
  logout: any;
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
    alignItems: "flex-start",
  },
  toolbar: {
    //display: "flex",
    //maxWidth: "1300px",
    //margin: "auto",
    justifyContent: "space-around",
  },
});

const getAuthFragment = (
  user: IUserResponseToClient | undefined,
  loading: boolean,
  classes: any,
  onLogout: () => void
) => {
  if (loading) {
    return <Skeleton variant="rect" width={90} height={36} />;
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
            {user.name}
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
        startIcon={<LockIcon />}
        size="small"
        onClick={showLoginForm}
      >
        Login
      </Button>
    );
  }
};

export const Header = ({ Logo, user, loading, logout }: IHeaderProps) => {
  const classes = useStyles();

  const authFragment = getAuthFragment(user, loading, classes, logout);

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

export default Header;
