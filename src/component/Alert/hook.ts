import { useDispatch, useSelector } from "react-redux";
import { IGlobalState, IAlertState } from "./../../store/types";
import { hideAlertAC } from "./../../store/action/alert";

export const useAlert = () => {
  const dispatch = useDispatch();

  const alertState = useSelector<IGlobalState, IAlertState>(
    state => state.alert
  );

  const hideAlert = () => dispatch(hideAlertAC());

  return {
    alertState,
    hideAlert,
  };
};
