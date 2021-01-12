import { FC } from "react";
import Button from "@material-ui/core/Button";
import NavUserBtnWithMenu from "../../../component/NavUserBtnWithMenu";
import FaceIcon from "@material-ui/icons/Face";
import Skeleton from "@material-ui/lab/Skeleton";
import { IUserResponseToClient } from "../../../types";
//import googleIcon from "./../../../../static/google.svg";
import classes from "./AuthFragment.module.scss";

interface IAuthFragmentProps {
  user: IUserResponseToClient | undefined;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const GoogleIcon = () => (
  <img width={17} alt="Google иконка" src="google.svg" />
);

export const AuthSkeleton = () => {
  return <Skeleton variant="rect" width={100} height={28} />;
};

const AuthFragment: FC<IAuthFragmentProps> = ({
  user,
  loading,
  login,
  logout,
}) => {
  if (loading) {
    return <AuthSkeleton />;
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
        onLogOutUser={logout}
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

export default AuthFragment;
