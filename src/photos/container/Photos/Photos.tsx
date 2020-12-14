import React, { FC } from "react";
import Button from "@material-ui/core/Button";
import IModal from "../../../component/IModal";
import WallOfPhotos from "../../../container/WallOfPhotos";
import AddPhotoForm from "../../form/AddPhotoForm";
import EditPhotoForm from "../../form/EditPhotoForm";
import SearchPhotoForm from "../../form/SearchPhotoForm";
import { IAuthUser } from "./../../../types";
import { usePhotoContainer } from "./hook";
import { IPhotosState } from "../../types";

export interface IPhotosProps {
  authUser: IAuthUser;
  authLoading: boolean;
  photoState: IPhotosState;
  loadMore: () => void;
}

/* FINAL COMPONENTS */

const _refAddPhotoForm = <AddPhotoForm />;

const IAddPhotoForm = () => _refAddPhotoForm;

const _refEditPhotoForm = <EditPhotoForm />;

const IEditPhotoForm = () => _refEditPhotoForm;

const _refSearchPhotoForm = <SearchPhotoForm />;

const ISearchPhotoForm = () => _refSearchPhotoForm;

const _refWallOfPhotos = <WallOfPhotos />;

const IWallOfPhotos = () => _refWallOfPhotos;

/* END FINAL COMPONENTS */

export const Photos: FC<IPhotosProps> = ({
  authUser,
  authLoading,
  photoState,
  loadMore,
}) => {
  const {
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
  } = usePhotoContainer();

  //const { photoState, loadMore } = usePhotos();

  const onShowEditPhotoForm = (event: any) => {
    // GET PHOTO FROM EVENT TARGET AND PHOTOS STATE

    const photo = Array.from(photoState.photos.entries())[0];

    showEditPhotoForm({ id: photo[0], photo: photo[1] });
  };

  const isAuth = authUser && authUser.uid;

  const isEditor = authUser && authUser.isEditor;

  ///const isLoading = authLoading || photosLoading;
  const isLoading = authLoading;

  console.log("[RENDER PHOTOS WIDGET]", photoState);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {isLoading && <p>...Проверка аккаунта, пожалуйста, подождите.</p>}
      {!isLoading && !isAuth && (
        <p>Пожалуйста войдите в свой Google аккаунт.</p>
      )}
      {!isLoading && isAuth && (
        <>
          <div>
            {isEditor && (
              <>
                <Button onClick={showAddPhotoForm}>Add photo</Button>
                <Button onClick={onShowEditPhotoForm}>Edit photo</Button>
              </>
            )}
            <Button onClick={showSearchPhotoForm}>Search photo</Button>
          </div>

          <IWallOfPhotos />

          <IModal open={isShowAddPhotoForm} onClose={hideAddPhotoForm}>
            <IAddPhotoForm />
          </IModal>

          <IModal open={isShowEditPhotoForm} onClose={hideEditPhotoForm}>
            <IEditPhotoForm />
          </IModal>

          <IModal open={isShowSearchPhotoForm} onClose={hideSearchPhotoForm}>
            <ISearchPhotoForm />
          </IModal>
        </>
      )}
    </div>
  );
};

export default Photos;
