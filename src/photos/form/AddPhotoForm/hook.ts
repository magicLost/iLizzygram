import { useDispatch, useSelector } from "react-redux";
import { showAlertAC } from "../../../store";
import { IGlobalState, TTagsData } from "../../../store/types";
import { hideAddFormAC } from "../../../store/action/modal";
import { Color } from "@material-ui/lab/Alert";

export const useAddEditPhotoForm = () => {
  const dispatch = useDispatch();

  const { tagsData, userUID } = useSelector<
    IGlobalState,
    { tagsData: TTagsData; userUID: string }
  >(state => ({
    tagsData: state.tags.tags,
    userUID: state.auth.user.uid,
  }));

  const showAlert = (message: string, type: Color) =>
    dispatch(showAlertAC(message, type));

  return {
    tagsData,
    userUID,
    showAlert,
    dispatch,
  };
};

export const useAddPhotoForm = () => {
  const dispatch = useDispatch();

  const { tagsData, userUID, showAlert } = useAddEditPhotoForm();

  const hideAddPhotoForm = () => dispatch(hideAddFormAC());

  return {
    tagsData,
    userUID,
    showAlert,
    hideAddPhotoForm,
  };
};
