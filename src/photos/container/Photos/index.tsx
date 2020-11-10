import React from "react";
import Button from "@material-ui/core/Button";
import IModal from "../../../component/IModal";
import WallOfPhotos from "../../../container/WallOfPhotos";
import AddPhotoForm from "../../form/AddPhotoForm";
import EditPhotoForm from "../../form/EditPhotoForm";
import SearchPhotoForm from "../../form/SearchPhotoForm";
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
import {
  editPhotoAC,
  addPhotoAC,
  fetchPhotosAC,
} from "./../../store/action/photos";

import { usePhotos } from "./../../store/ihook";

import { IPhotoData } from "./../../../types";
import { connect } from "react-redux";
import { TPhotoData, ISearchState } from "./../../types";
import { photosCollection } from "./../../../container/ReduxWrapper";

export interface IPhotosProps {
  searchState?: ISearchState;
  photos?: TPhotoData;
  nextPageDocRef?: any;
  hasNextPage?: boolean;

  setPhoto?: (photo: IPhotoData, isAdd: boolean) => void;
  fetchPhotos?: (query: any, isFetchMore: boolean) => Promise<void>;

  isShowAddPhotoForm?: boolean;
  isShowEditPhotoForm?: boolean;
  isShowSearchPhotoForm?: boolean;

  showAddPhotoForm?: () => void;
  showEditPhotoForm?: (photo: IPhotoData) => void;
  showSearchPhotoForm?: () => void;

  hideAddPhotoForm?: () => void;
  hideEditPhotoForm?: () => void;
  hideSearchPhotoForm?: () => void;

  //showErrorAlert?: () => void;
}

export const Photos = ({
  searchState,
  photos,
  nextPageDocRef,
  hasNextPage,

  setPhoto,
  fetchPhotos,

  isShowAddPhotoForm,
  isShowEditPhotoForm,
  isShowSearchPhotoForm,

  showAddPhotoForm,
  showEditPhotoForm,
  showSearchPhotoForm,

  hideAddPhotoForm,
  hideEditPhotoForm,
  hideSearchPhotoForm,
}: IPhotosProps) => {
  const { fetchMore } = usePhotos(
    photosCollection,
    fetchPhotos,
    setPhoto,
    searchState
  );

  const onFetchMore = () => {
    fetchMore(fetchPhotos, setPhoto, nextPageDocRef);
  };

  const onShowEditPhotoForm = (event: any) => {
    // GET PHOTO FROM EVENT TARGET AND PHOTOS STATE

    const photo = Array.from(photos.entries())[1];

    showEditPhotoForm({ id: photo[0], photo: photo[1] });
  };

  console.log("[RENDER PHOTOS]", photos, nextPageDocRef, hasNextPage);

  return (
    <>
      <div>
        <Button onClick={showAddPhotoForm}>Add photo</Button>
        <Button onClick={onShowEditPhotoForm}>Edit photo</Button>
        <Button onClick={showSearchPhotoForm}>Search photo</Button>
      </div>

      <WallOfPhotos />

      {hasNextPage && <Button onClick={onFetchMore}>Загрузить еще...</Button>}

      <IModal open={isShowAddPhotoForm} onClose={hideAddPhotoForm}>
        <AddPhotoForm onSuccessUpload={hideAddPhotoForm} />
      </IModal>

      <IModal open={isShowEditPhotoForm} onClose={hideEditPhotoForm}>
        <EditPhotoForm onSuccessUpload={hideEditPhotoForm} />
      </IModal>

      <IModal open={isShowSearchPhotoForm} onClose={hideSearchPhotoForm}>
        <SearchPhotoForm onSetSearchState={hideSearchPhotoForm} />
      </IModal>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  return {
    searchState: state.search,
    photos: state.photos.photos,
    nextPageDocRef: state.photos.nextPageDocRef,
    hasNextPage: state.photos.hasNextPage,
    isShowAddPhotoForm: state.modal.openAddForm,
    isShowEditPhotoForm: state.modal.openEditForm,
    isShowSearchPhotoForm: state.modal.openSearch,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhoto: (photo: IPhotoData, isAdd: boolean) => {
      console.log("setPhoto", photo);
      if (isAdd) dispatch(addPhotoAC(photo));
      else dispatch(editPhotoAC(photo));
    },

    fetchPhotos: (query: any, isFetchMore: boolean) =>
      dispatch(fetchPhotosAC(query, isFetchMore)),

    /*  showErrorAlert: () =>
      dispatch(showAlertAC("Какая-то ошибочка, попробуйте позже...", "error")), */

    showAddPhotoForm: () => dispatch(showAddFormAC()),
    showEditPhotoForm: (photo: IPhotoData) => dispatch(showEditFormAC(photo)),
    showSearchPhotoForm: () => dispatch(showSearchFormAC()),

    hideAddPhotoForm: () => dispatch(hideAddFormAC()),
    hideEditPhotoForm: () => dispatch(hideEditFormAC()),
    hideSearchPhotoForm: () => dispatch(hideSearchFormAC()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
