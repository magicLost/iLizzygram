import React from "react";
//import classes from './EditPhotoForm.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import { useUploadPhotoForm, IRegisterInfo } from "../hook";
import IAddEditPhotoFormWidget from "../AddEditPhotoFormWidget";
import { IPhotoData } from "../../../types";
import {
  //photoFileRules,
  descRules,
  dateRules,
  tagsRules,
} from "../Photo.rules";
import { getChangedData, getDefaultTagsIds } from "./helper";
import { connect } from "react-redux";
import { editPhotoToFirestoreAC } from "../../store/action/photos";
import { IGlobalState } from "../../../store/types";
import { TTagsData } from "../../../store/types";
import { Color } from "@material-ui/lab/Alert";
import { showAlertAC } from "../../../store";
import { ISearchState } from "../../types";

export interface IEditPhotoFormData {
  desc?: string;
  date?: Date;
  photoFile?: FileList;
  tags?: { [name: string]: boolean };
}

interface EditPhotoFormProps {
  title?: string;
  prevPhoto?: IPhotoData;
  fetchPhoto?: any;
  searchState?: ISearchState;
  showAlert?: (message: string, type: Color) => void;
  onSuccessUpload?: (
    editPhotoData: any //IEditPhotoResponseToClient
  ) => void | undefined;
  onUploadError?: () => void | undefined;
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

export const EditPhotoForm = ({
  title,
  prevPhoto,
  fetchPhoto,
  searchState,
  showAlert,
  onSuccessUpload,
  onUploadError,
  tagsData,
}: EditPhotoFormProps) => {
  const classes = useStyles();

  const defaultTagsIds = getDefaultTagsIds(prevPhoto.photo);

  const onError = (code: string) => {
    showAlert("Какая-то ошибка. Попробуйте позже.", "error");

    if (onUploadError) onUploadError();
  };

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
      console.log("Nothing to chagne");
      //showAlert();
      return;
    }
    fetchPhoto(
      prevPhoto.id,
      changedData,
      searchState,
      onSuccessUpload,
      onError
    );
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

  console.log("[RENDER EDIT FORM]", prevPhoto);

  return (
    <>
      <div className={classes.wrapper}>
        <img height="150px" width="auto" src={prevPhoto.photo.iconSrc} />
      </div>

      <IAddEditPhotoFormWidget
        title={title}
        photoFileRules={undefined}
        descRules={descRules}
        onSubmit={uploadPhotoFormData.handleSubmit(submit)}
        uploadPhotoFormData={uploadPhotoFormData}
      />
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => {
  return {
    prevPhoto: state.modal.photo,
    tagsData: state.tags.tags,
    searchState: state.search,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAlert: (message: string, type: Color) =>
      dispatch(showAlertAC(message, type)),
    fetchPhoto: (
      photoId: string,
      photoFormData: IEditPhotoFormData,
      searchState: ISearchState,
      onSuccess?: any,
      onError?: any
    ) => {
      dispatch(
        editPhotoToFirestoreAC(
          photoId,
          photoFormData,
          searchState,
          onSuccess,
          onError
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPhotoForm);
