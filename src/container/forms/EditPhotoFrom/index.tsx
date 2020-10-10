import React from "react";
//import classes from './EditPhotoForm.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import { useEditPhoto, IEditPhotoResponseToClient } from "./hook";
import { descRules } from "./../Photo.rules";
import AddEditPhotoFormWidget from "../../../component/AddEditPhotoFormWidget";

interface EditPhotoFormProps {
  title?: string;
  onSuccessUpload?: (
    editPhotoData: IEditPhotoResponseToClient
  ) => void | undefined;
  onUploadError?: () => void | undefined;
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
});

const EditPhotoForm = ({
  title,
  onSuccessUpload,
  onUploadError,
}: EditPhotoFormProps) => {
  const classes = useStyles();

  const {
    register,
    onSubmit,
    formErrors,
    uploadLoading,
    onDateChange,
    dateValue,
    onTagsCheckboxChange,
    tagsState,
    tagsData,
    tagsLoading,
    tagsQueryError,
    photo,
  } = useEditPhoto(onSuccessUpload, onUploadError);

  console.log("[RENDER EDIT FORM]");

  return (
    <>
      <div className={classes.wrapper}>
        <img height="150px" width="auto" src={photo.iconSrc} />
      </div>
      <AddEditPhotoFormWidget
        title={title}
        formErrors={formErrors}
        register={register}
        onSubmit={onSubmit}
        photoFileRules={undefined}
        descRules={descRules}
        uploadLoading={uploadLoading}
        dateValue={dateValue}
        onDateChange={onDateChange}
        onTagsCheckboxChange={onTagsCheckboxChange}
        tagsState={tagsState}
        tagsData={tagsData}
        tagsLoading={tagsLoading}
        tagsQueryError={tagsQueryError}
      />
    </>
  );
};

export default EditPhotoForm;
