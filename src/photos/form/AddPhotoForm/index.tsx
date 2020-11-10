import React from "react";
import classes from "./AddPhotoForm.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
//import { Typography } from "@material-ui/core";
import { useUploadPhotoForm, IRegisterInfo } from "../hook";
import {
  photoFileRules,
  descRules,
  dateRules,
  tagsRules,
} from "../Photo.rules";
import AddEditPhotoFormWidget from "../AddEditPhotoFormWidget";
import { connect } from "react-redux";
import { addPhotoToFirestoreAC } from "../../store/action/photos";
import { IGlobalState } from "../../../store/types";
import { TTagsData } from "../../../store/types";
import { Color } from "@material-ui/lab/Alert";
import { showAlertAC } from "../../../store";

interface IAddPhotoFormProps {
  title?: string;
  fetchPhoto?: (
    photoFormData: IAddPhotoFormData,
    onSuccess?: any,
    onError?: any
  ) => void;
  showAlert?: (message: string, type: Color) => void;
  onSuccessUpload?: (
    uploadPhotoData: any //IUploadPhotoResponseToClient
  ) => void | undefined;
  onUploadError?: () => void | undefined;
  tagsData?: TTagsData;
}

export interface IAddPhotoFormData {
  desc: string;
  date: Date;
  photoFile: FileList;
  tags: { [name: string]: boolean };
}

export const registerInfo = [
  { name: "tags", rules: tagsRules },
  { name: "date", rules: dateRules },
];

export const AddPhotoForm = ({
  title,
  fetchPhoto,
  showAlert,
  onSuccessUpload,
  onUploadError,
  tagsData,
}: IAddPhotoFormProps) => {
  const onError = (code: string) => {
    showAlert("Какая-то ошибка. Попробуйте позже.", "error");

    if (onUploadError) onUploadError();
  };

  const submit = (formData: IAddPhotoFormData) => {
    fetchPhoto(formData, onSuccessUpload, onError);
  };

  const uploadPhotoFormData = useUploadPhotoForm<IAddPhotoFormData>(
    tagsData,
    registerInfo
  );

  return (
    <AddEditPhotoFormWidget
      title={title}
      photoFileRules={photoFileRules}
      descRules={descRules}
      onSubmit={uploadPhotoFormData.handleSubmit(submit)}
      uploadPhotoFormData={uploadPhotoFormData}
    />
  );
};

const mapStateToProps = (state: IGlobalState) => {
  return {
    tagsData: state.tags.tags,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAlert: (message: string, type: Color) =>
      dispatch(showAlertAC(message, type)),
    fetchPhoto: (
      photoFormData: IAddPhotoFormData,
      onSuccess?: any,
      onError?: any
    ) => {
      dispatch(addPhotoToFirestoreAC(photoFormData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhotoForm);
