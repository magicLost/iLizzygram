import { useDispatch, useSelector } from "react-redux";
import { IGlobalState } from "./../../../store/types";
import {
  showAddFormAC,
  hideAddFormAC,
  showEditFormAC,
  hideEditFormAC,
  showPhotoSliderAC,
  hidePhotoSliderAC,
  showSearchFormAC,
  hideSearchFormAC,
  showAlertAC,
} from "./../../../store";
import { IAuthUser } from "./../../../types";
import { TPhotoData } from "./../../types";

/* const mapStateToProps = (state: IGlobalState) => {
  return {
    authUser: state.auth.user,
    authLoading: state.auth.loading,
    isShowAddPhotoForm: state.modal.openAddForm,
    isShowEditPhotoForm: state.modal.openEditForm,
    isShowSearchPhotoForm: state.modal.openSearch,
  };
};

 */

export const usePhotoContainer = () => {
  const dispatch = useDispatch();

  const {
    //authUser,
    //authLoading,
    isShowAddPhotoForm,
    isShowEditPhotoForm,
    isShowSearchPhotoForm,
  } = useSelector<
    IGlobalState,
    {
      //authUser: IAuthUser;
      //authLoading: boolean;
      isShowAddPhotoForm: boolean;
      isShowEditPhotoForm: boolean;
      isShowSearchPhotoForm: boolean;
    }
  >(state => ({
    //authUser: state.auth.user,
    //authLoading: state.auth.loading,
    isShowAddPhotoForm: state.modal.openAddForm,
    isShowEditPhotoForm: state.modal.openEditForm,
    isShowSearchPhotoForm: state.modal.openSearch,
  }));

  const showAddPhotoForm = () => dispatch(showAddFormAC());
  const showEditPhotoForm = (photo: TPhotoData) =>
    dispatch(showEditFormAC(photo));
  const showSearchPhotoForm = () => dispatch(showSearchFormAC());

  const hideAddPhotoForm = () => dispatch(hideAddFormAC());
  const hideEditPhotoForm = () => dispatch(hideEditFormAC());
  const hideSearchPhotoForm = () => dispatch(hideSearchFormAC());

  return {
    //authUser,
    //authLoading,
    isShowAddPhotoForm,
    isShowEditPhotoForm,
    isShowSearchPhotoForm,

    showAddPhotoForm,
    showEditPhotoForm,
    showSearchPhotoForm,
    hideAddPhotoForm,
    hideEditPhotoForm,
    hideSearchPhotoForm,
  };
};
