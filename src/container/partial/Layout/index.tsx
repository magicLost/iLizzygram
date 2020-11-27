import React from "react";
import Container from "@material-ui/core/Container";
import Header from "../Header";
import classes from "./Layout.module.scss";
//import IModal from "../../../component/IModal";
//import LoginForm from "../../../auth/form/LoginForm";
import Alert from "../../../component/Alert";
//import { hideLoginFormAC, hideForgetPassFormAC } from "../../../store";
//import { IGlobalState } from "../../../store/types";
//import { connect } from "react-redux";
//import ForgetPassForm from "../../../auth/form/ForgetPassForm";

interface LayoutProps {
  Logo: React.FunctionComponent;
  children: JSX.Element | JSX.Element[];
  //isShowLoginForm?: boolean;
  //isShowForgetPassForm?: boolean;
  //hideLoginForm?: () => void;
  //hideForgetPassForm?: () => void;
}

//const useStyles = makeStyles({});

export const Layout = ({
  Logo,
  children,
}: //isShowLoginForm,
//isShowForgetPassForm,
//hideLoginForm,
//hideForgetPassForm,
LayoutProps) => {
  /* const onSuccessLogin = () => {
    hideLoginForm();
  };

  const onSuccessEmail = () => {
    hideForgetPassForm();
  }; */

  console.log("[RENDER LAYOUT]");

  return (
    <>
      <Header Logo={Logo} />
      <Container component={"main"} className={classes.container} maxWidth="lg">
        {children}
      </Container>

      {/* <IModal open={isShowLoginForm} onClose={hideLoginForm}>
        <LoginForm onSuccessLogin={onSuccessLogin} />
      </IModal>

      <IModal open={isShowForgetPassForm} onClose={hideForgetPassForm}>
        <ForgetPassForm onSuccessEmail={onSuccessEmail} />
      </IModal> */}

      <Alert />
    </>
  );
};

/* const mapStateToProps = (state: IGlobalState) => {
  return {
    isShowLoginForm: state.modal.openLoginForm,
    isShowForgetPassForm: state.modal.openForgetPassForm,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideLoginForm: () => dispatch(hideLoginFormAC()),
    hideForgetPassForm: () => dispatch(hideForgetPassFormAC()),
  };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(Layout);*/

export default Layout;
