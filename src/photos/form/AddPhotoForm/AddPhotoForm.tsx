import React from "react";
//import classes from "./AddPhotoForm.module.scss";
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
//import { connect } from "react-redux";
//import { saveNewPhoto } from "../../controller";
//import { IGlobalState } from "../../../store/types";
import { TTagsData } from "../../../store/types";
import { Color } from "@material-ui/lab/Alert";
//import { showAlertAC } from "../../../store";
import { useAddPhoto } from "../../store/hook";
import { addPhotoFormTitle } from "../../../config";

interface IAddPhotoFormProps {
  //userUID: string;
  /* savePhoto?: (
    photoFormData: IAddPhotoFormData,
    userUID: string,
    onSuccess?: any,
    onError?: any
  ) => void; */
  //addPhotoLoading?: boolean;
  /* showAlert: (message: string, type: Color) => void;
  onSuccessUpload?: (
    uploadPhotoData: any //IUploadPhotoResponseToClient
  ) => void | undefined;
  onUploadError?: () => void | undefined; */
  uploadLoading: boolean;
  tagsData: TTagsData;
  addPhoto: (formData: IAddPhotoFormData) => void;
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
  /* userUID,
  //savePhoto,
  showAlert,
  onSuccessUpload,
  onUploadError, */
  uploadLoading,
  addPhoto,
  tagsData,
}: IAddPhotoFormProps) => {
  //const { addPhoto, loading } = useAddPhoto();

  const uploadPhotoFormData = useUploadPhotoForm<IAddPhotoFormData>(
    tagsData,
    registerInfo
  );

  const submit = (formData: IAddPhotoFormData) => {
    console.log("SUBMIT", formData);
    addPhoto(formData);
  };

  console.log("[RENDER ADD FORM WIDGET]");

  return (
    <AddEditPhotoFormWidget
      title={addPhotoFormTitle}
      photoFileRules={photoFileRules}
      descRules={descRules}
      onSubmit={uploadPhotoFormData.handleSubmit(submit)}
      uploadLoading={uploadLoading}
      uploadPhotoFormData={uploadPhotoFormData}
    />
  );
};

/* const mapStateToProps = (state: IGlobalState) => {
  return {
    tagsData: state.tags.tags,
    //addPhotoLoading: state.photos.addLoading,
    userUID: state.auth.user.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAlert: (message: string, type: Color) =>
      dispatch(showAlertAC(message, type)),
    /* savePhoto: (
      photoFormData: IAddPhotoFormData,
      userUID: string,
      onSuccess?: any,
      onError?: any
    ) => {
      dispatch(saveNewPhoto(photoFormData, userUID, onSuccess, onError));
    }, /
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhotoForm); */

export default AddPhotoForm;
