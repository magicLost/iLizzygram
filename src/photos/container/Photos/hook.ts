import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { IGlobalState } from "./../../../store/types";
import {
  showAddFormAC,
  hideAddFormAC,
  hideEditFormAC,
  hidePhotoSliderAC,
  showSearchFormAC,
  hideSearchFormAC,
} from "./../../../store";
//import { IAuthUser } from "./../../../types";
//import { TPhotoData } from "./../../types";

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
    isShowPhotoSlider,
  } = useSelector<
    IGlobalState,
    {
      //authUser: IAuthUser;
      //authLoading: boolean;
      isShowAddPhotoForm: boolean;
      isShowEditPhotoForm: boolean;
      isShowSearchPhotoForm: boolean;
      isShowPhotoSlider: boolean;
    }
  >(
    state => ({
      //authUser: state.auth.user,
      //authLoading: state.auth.loading,
      isShowAddPhotoForm: state.modal.openAddForm,
      isShowEditPhotoForm: state.modal.openEditForm,
      isShowSearchPhotoForm: state.modal.openSearch,
      isShowPhotoSlider: state.modal.openSlider,
    }),
    shallowEqual
  );

  const showAddPhotoForm = () => dispatch(showAddFormAC());
  /* const showEditPhotoForm = (photo: TPhotoData) =>
    dispatch(showEditFormAC(photo)); */
  const showSearchPhotoForm = () => dispatch(showSearchFormAC());

  const hideAddPhotoForm = () => dispatch(hideAddFormAC());
  const hideEditPhotoForm = () => dispatch(hideEditFormAC());
  //hidePhotoSliderAC
  const hideSearchPhotoForm = () => dispatch(hideSearchFormAC());
  const hidePhotoSlider = () => dispatch(hidePhotoSliderAC());

  return {
    //authUser,
    //authLoading,
    isShowAddPhotoForm,
    isShowEditPhotoForm,
    isShowSearchPhotoForm,
    isShowPhotoSlider,

    showAddPhotoForm,
    //showEditPhotoForm,
    showSearchPhotoForm,
    hideAddPhotoForm,
    hideEditPhotoForm,
    hideSearchPhotoForm,
    hidePhotoSlider,
  };
};
