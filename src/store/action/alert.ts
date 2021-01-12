import { Color } from "@material-ui/lab/Alert";
import { IAlertAction } from "./../types";

export const showAlertAC = (message: string, type: Color): IAlertAction => {
  return {
    type: "SHOW_ALERT",
    message,
    alertType: type,
  };
};

export const hideAlertAC = (): IAlertAction => {
  return {
    type: "HIDE_ALERT",
  };
};
