import { useDispatch } from "react-redux";
import { logoutAC, loginAC } from "../../../auth/store/action";
import { useAuth } from "../../../auth/hook/useAuth";
//import { IGlobalState } from "./../../../store/types";
//import { IUserResponseToClient } from "./../../../types";

/*  user: state.auth.user,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: () => dispatch(loginAC()),
    logout: () => {
      console.log("logout");
      dispatch(logoutAC());
    }, */

export const useHeader = () => {
  const dispatch = useDispatch();

  const { user, loading } = useAuth();

  /* const { user, loading } = useSelector<
    IGlobalState,
    {
      user: IUserResponseToClient;
      loading: boolean;
    }
  >(state => ({
    user: state.auth.user,
    loading: state.auth.loading,
  })); */

  const logout = () => dispatch(logoutAC());

  const login = () => dispatch(loginAC());

  return {
    user,
    loading,
    logout,
    login,
  };
};
