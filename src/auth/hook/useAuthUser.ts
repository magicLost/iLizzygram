import { useSelector } from "react-redux";
import { IGlobalState } from "./../../store/types";
import { IAuthUser } from "./../../types";

export const useAuthUser = () => {
  const { user, loading } = useSelector<
    IGlobalState,
    { user: IAuthUser; loading: boolean }
  >((state) => ({
    user: state.auth.user,
    loading: state.auth.loading,
  }));

  return {
    user,
    loading,
  };
};
