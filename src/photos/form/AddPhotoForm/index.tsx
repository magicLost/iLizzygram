import React from "react";
import { useAddPhoto } from "../../store/hook";
import AddPhotoFormWidget, { IAddPhotoFormData } from "./AddPhotoForm";
import { useAddPhotoForm } from "./hook";

export const AddPhotoForm = () => {
  const { tagsData, userUID, showAlert } = useAddPhotoForm();

  const { addPhoto, loading } = useAddPhoto();

  const onSuccess = () => {
    showAlert("Фото успешно загружено.", "success");
  };

  const onError = () => {
    showAlert("Какая-то ошибка. Попробуйте позже.", "error");
  };

  const addPhotoFinal = (formData: IAddPhotoFormData) =>
    addPhoto(formData, userUID, onSuccess, onError);

  console.log("[RENDER ADD FORM]");

  return (
    <AddPhotoFormWidget
      uploadLoading={loading}
      addPhoto={addPhotoFinal}
      tagsData={tagsData}
    />
  );
};

export default AddPhotoForm;
