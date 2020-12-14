import React from "react";
import EditPhotoFormWidget, { IEditPhotoFormData } from "./EditPhotoForm";
import { useEditPhotoForm } from "./hook";
import { useEditPhoto } from "../../store/hook";

export const EditPhotoForm = () => {
  const {
    prevPhoto,
    tagsData,
    userUID,
    showAlert,
    hideEditPhotoForm,
  } = useEditPhotoForm();

  const { editPhoto, loading } = useEditPhoto();

  const onSuccess = () => {
    hideEditPhotoForm();

    showAlert("Фото успешно отредактировано.", "success");
  };

  const onError = () => {
    showAlert("Какая-то ошибка. Попробуйте позже.", "error");
  };

  const editPhotoFinal = (photoId: string, formData: IEditPhotoFormData) =>
    editPhoto(photoId, formData, userUID, onSuccess, onError);

  console.log("[RENDER EDIT FORM]");

  return (
    <EditPhotoFormWidget
      showAlert={showAlert}
      prevPhoto={prevPhoto}
      uploadLoading={loading}
      editPhoto={editPhotoFinal}
      tagsData={tagsData}
    />
  );
};

export default EditPhotoForm;
