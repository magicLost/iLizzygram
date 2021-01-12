import { Action, Reducer } from "redux";
import { Color } from "@material-ui/lab/Alert";
import { IAlertState, IAlertAction } from "./../types";

const alertInitialState: IAlertState = {
  isShow: false,
  type: "info",
  message: "",
};

const reducer: Reducer<IAlertState, IAlertAction> = (
  state = alertInitialState,
  action: IAlertAction
) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        isShow: true,
        type: action.alertType,
        message: action.message,
      };

    case "HIDE_ALERT":
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
};

export default reducer;
