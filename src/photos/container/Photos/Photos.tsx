import React, { FC } from "react";
//import Button from "@material-ui/core/Button";
import IModal from "../../../component/IModal";
import WallOfPhotos from "../../../container/WallOfPhotos";
import AddPhotoForm from "../../form/AddPhotoForm";
import EditPhotoForm from "../../form/EditPhotoForm";
import SearchPhotoForm from "../../form/SearchPhotoForm";
import { IAuthUser } from "./../../../types";
import { usePhotoContainer } from "./hook";
//import { IPhotosState } from "../../types";
//import { makeStyles } from "@material-ui/core/styles";
import SearchButton from "../../../component/UI/SearchButton";
import AddButton from "../../../component/UI/AddButton";
import PhotoSlider from "./../PhotoSlider";
import classes from "./Photos.module.scss";

export interface IPhotosProps {
  authUser: IAuthUser;
  authLoading: boolean;
  //photoState: IPhotosState;
  //loadMore: () => void;
}

/* const useStyles = makeStyles({
  addPhotoButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  },
}); */

/* FINAL COMPONENTS */

const _refAddPhotoForm = <AddPhotoForm />;

const IAddPhotoForm = () => _refAddPhotoForm;

const _refEditPhotoForm = <EditPhotoForm />;

const IEditPhotoForm = () => _refEditPhotoForm;

const _refSearchPhotoForm = <SearchPhotoForm />;

const ISearchPhotoForm = () => _refSearchPhotoForm;

const _refWallOfPhotos = <WallOfPhotos />;

const IWallOfPhotos = () => _refWallOfPhotos;

const _refPhotoSlider = <PhotoSlider />;

const IPhotoSlider = () => _refPhotoSlider;

/* END FINAL COMPONENTS */

export const Photos: FC<IPhotosProps> = ({
  authUser,
  authLoading,
  //photoState,
  //loadMore,
}) => {
  const {
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
  } = usePhotoContainer();

  //const { photoState, loadMore } = usePhotos();
  //const classes = useStyles();

  /* const onShowEditPhotoForm = (event: any) => {
    // GET PHOTO FROM EVENT TARGET AND PHOTOS STATE

    const photo = Array.from(photoState.photos.entries())[0];

    showEditPhotoForm({ id: photo[0], photo: photo[1] });
  }; */

  const isAuth = authUser && authUser.uid;

  const isEditor = authUser && authUser.isEditor;

  //const isLoading = authLoading || photosLoading;
  const isLoading = authLoading;

  console.log("[RENDER PHOTOS WIDGET]");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/*   {isLoading && <p>...Проверка аккаунта, пожалуйста, подождите.</p>}
      {!isLoading && !isAuth && (
        <p>Пожалуйста войдите в свой Google аккаунт.</p>
      )} */}
      {!isLoading && isAuth && (
        <>
          <>
            {isEditor && (
              <div className={classes.addPhotoButton}>
                <AddButton onClick={showAddPhotoForm} title={"Добавить фото"} />
              </div>
            )}
            <SearchButton onClick={showSearchPhotoForm} />
            {/* if searchState not equal init search state -> show cancel search button */}
          </>

          <IWallOfPhotos />

          <IModal
            open={isShowPhotoSlider}
            type="slider"
            onClose={hidePhotoSlider}
          >
            <IPhotoSlider />
          </IModal>

          <IModal
            open={isShowAddPhotoForm}
            type="form"
            onClose={hideAddPhotoForm}
          >
            <IAddPhotoForm />
          </IModal>

          <IModal
            open={isShowEditPhotoForm}
            type="form"
            onClose={hideEditPhotoForm}
          >
            <IEditPhotoForm />
          </IModal>

          <IModal
            open={isShowSearchPhotoForm}
            type="form"
            onClose={hideSearchPhotoForm}
          >
            <ISearchPhotoForm />
          </IModal>
        </>
      )}
    </div>
  );
};

export default Photos;
