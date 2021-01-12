import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
//import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import NavUserBtnWithMenu from "../../../component/NavUserBtnWithMenu/NavUserBtnWithMenu";
//import ButtonLink from "../../../component/UI/ButtonLink/ButtonLink";
import FaceIcon from "@material-ui/icons/Face";
import Skeleton from "@material-ui/lab/Skeleton";
import Logo from "../../../component/Logo/Logo";
import { IUserResponseToClient } from "../../../../server/api/entity/User/User.model";
import { showLoginForm } from "../../../hooks/cache/cache.controller";

interface IHeaderProps {
  user: IUserResponseToClient | undefined;
  loading: boolean;
  logout: any;
}

const useStyles = makeStyles({
  menuButton: {},
  appBarBGColor: {
    //display: "flex",
    //justifyContent: "center",
    backgroundColor: "white", //"#55c57a"
  },
  label: {
    textTransform: "none",
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
  labelClass: string,
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
              label: labelClass,
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
        startIcon={<LockIcon />}
        size="small"
        onClick={showLoginForm}
      >
        Login
      </Button>
    );
  }
};

export const Header = ({
  user,
  loading,
  logout,
}: /*  user,
  showModal,
  showSuccessAlert,
  logOutUser,
  showErrorAlert, */
IHeaderProps) => {
  const classes = useStyles();

  /*  const { user, loading } = useAuthUser();
  const { logout } = useLogout(); */

  //const { sendRequest } = usePostRequest<undefined>();
  //let history = useHistory();

  /*  const onSuccessLogout = () => {
    console.log("onSuccessLogout");
    /* showSuccessAlert();
    logOutUser();
    //ToDo: make redirect only from protected pages
    history.push("/"); 
  };

  const onLogout = () => {
    console.log("onLogout");
    logout();
    //sendRequest(logoutPath, new FormData(), onSuccessLogout, showErrorAlert);
  }; */

  const authFragment = getAuthFragment(user, loading, classes.label, logout);

  console.log("[RENDER HEADER]", user, loading);

  return (
    <Container maxWidth="lg">
      <AppBar position="fixed" className={classes.appBarBGColor}>
        <Toolbar className={classes.toolbar}>
          <Logo />

          {authFragment}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;

/* const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logOutUser: () =>
      dispatch({
        type: "LOG_OUT_USER",
      }),
    showModal: () =>
      dispatch({
        type: "SHOW_MODAL",
      }),
    showSuccessAlert: () =>
      dispatch({
        type: "SHOW_ALERT",
        message: "Вы успешно вышли из аккаунта.",
        alertType: "success",
      }),
    showErrorAlert: () =>
      dispatch({
        type: "SHOW_ALERT",
        message: "Опс. Какая-то ошибка... Пожалуйста попробуйт позже...",
        alertType: "error",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
 */
