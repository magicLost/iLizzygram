import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import { makeStyles } from "@material-ui/core/styles";
//import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
/* import NavUserBtnWithMenu from "../../../component/NavUserBtnWithMenu";
import FaceIcon from "@material-ui/icons/Face";
import Skeleton from "@material-ui/lab/Skeleton";
import { IUserResponseToClient } from "../../../types"; */
//import googleIcon from "./../../../../static/google.svg";
import classes from "./Header.module.scss";
import Logo from "./../../../component/Logo";
//import AuthFragment from "../../../auth/component/AuthFragment";
import { AuthSkeleton } from "../../../auth/component/AuthFragment/AuthFragment";
import dynamic from "next/dynamic";

/* const DynamicAuthFragment = dynamic(
  () => import("../../../auth/component/AuthFragment"),
  { loading: AuthSkeleton }
); */

const Header = () => {
  //const classes = useStyles();

  //const authFragment = getAuthFragment(user, loading, classes, login, logout);

  console.log("[RENDER HEADER WIDGET]");

  return (
    <Container maxWidth="lg">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Logo />

          {/* <DynamicAuthFragment /> */}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
