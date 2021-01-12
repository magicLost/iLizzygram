import { useSelector } from "react-redux";
//import { showAlertAC } from "../../../store";
import { IGlobalState, TTagsData } from "../../../store/types";
//import { Color } from "@material-ui/lab/Alert";
import { TPhotoData } from "./../../types";
import { useAddEditPhotoForm } from "../AddPhotoForm/hook";
import { hideEditFormAC } from "../../../store/action/modal";

export const useEditPhotoForm = () => {
  const { tagsData, userUID, showAlert, dispatch } = useAddEditPhotoForm();

  const prevPhoto = useSelector<IGlobalState, TPhotoData>(
    state => state.modal.photo
  );

  const hideEditPhotoForm = () => dispatch(hideEditFormAC());

  return {
    prevPhoto,
    tagsData,
    userUID,
    showAlert,
    hideEditPhotoForm,
  };
};
