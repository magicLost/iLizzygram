import React, { FC } from "react";
//import classes from './EditPhotoForm.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import { useUploadPhotoForm, IRegisterInfo } from "../hook";
import IAddEditPhotoFormWidget from "../AddEditPhotoFormWidget";
import { TPhotoData } from "../../types";
import {
  //photoFileRules,
  descRules,
  dateRules,
  tagsRules,
} from "../Photo.rules";
import { getChangedData, getDefaultTagsIds } from "./helper";
import { connect } from "react-redux";
//import { saveEditedPhoto } from "../../controller";
import { IGlobalState } from "../../../store/types";
import { TTagsData } from "../../../store/types";
import { Color } from "@material-ui/lab/Alert";
import { showAlertAC } from "../../../store";
import { ISearchState } from "../../types";
import { useEditPhoto } from "../../store/hook";
import { editPhotoFormTitle } from "../../../config";

export interface IEditPhotoFormData {
  desc?: string;
  date?: Date;
  photoFile?: FileList;
  tags?: { [name: string]: boolean };
}

interface EditPhotoFormProps {
  prevPhoto: TPhotoData;
  //userUID: string;
  //editPhotoLoading?: boolean;

  //searchState?: ISearchState;
  uploadLoading: boolean;
  editPhoto: (photoId: string, formData: IEditPhotoFormData) => void;
  showAlert: (message: string, type: Color) => void;
  /* onSuccessUpload?: (
    editPhotoData: any //IEditPhotoResponseToClient
  ) => void | undefined;
  onUploadError?: () => void | undefined; */
  tagsData?: TTagsData;
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
});

const registerInfo = [
  { name: "tags", rules: tagsRules },
  { name: "date", rules: { validate: dateRules.validate } },
];

export const EditPhotoForm: FC<EditPhotoFormProps> = ({
  prevPhoto,
  //fetchPhoto,
  //searchState,
  ///userUID,
  editPhoto,
  uploadLoading,
  showAlert,
  /*  onSuccessUpload,
  onUploadError, */
  tagsData,
}) => {
  const classes = useStyles();

  const defaultTagsIds = getDefaultTagsIds(prevPhoto.photo);

  const submit = (formData: IEditPhotoFormData) => {
    const { photoFile, desc, date, tags } = formData;

    //we check if desc or date is equal original we make it undefined
    const changedData = getChangedData(
      tags,
      prevPhoto.photo,
      desc,
      date,
      photoFile
    );

    console.log("SUBMIT", changedData, prevPhoto.id);

    if (!changedData) {
      //show alert with message nothing to change
      showAlert("Вы ничего не изменили.", "error");
      console.log("Nothing to change");
      //showAlert();
      return;
    }
    editPhoto(prevPhoto.id, changedData);
  };

  const uploadPhotoFormData = useUploadPhotoForm<IEditPhotoFormData>(
    tagsData,
    registerInfo,
    defaultTagsIds,
    {
      defaultValues: {
        date: (prevPhoto.photo.date as any).toDate(),
        desc: prevPhoto.photo.description,
      },
    }
  );

  console.log("[RENDER EDIT FORM WIDGET]", prevPhoto);

  return (
    <>
      <div className={classes.wrapper}>
        <img height="150px" width="auto" src={prevPhoto.photo.iconSrc} />
      </div>

      <IAddEditPhotoFormWidget
        title={editPhotoFormTitle}
        photoFileRules={undefined}
        descRules={descRules}
        uploadLoading={uploadLoading}
        onSubmit={uploadPhotoFormData.handleSubmit(submit)}
        uploadPhotoFormData={uploadPhotoFormData}
      />
    </>
  );
};

/* const mapStateToProps = (state: IGlobalState) => {
  return {
    prevPhoto: state.modal.photo,
    tagsData: state.tags.tags,
    //editPhotoLoading: state.photos.editLoading,
    userUid: state.auth.user.uid,
    //searchState: state.search,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAlert: (message: string, type: Color) =>
      dispatch(showAlertAC(message, type)),
  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPhotoForm); */

export default EditPhotoForm;
