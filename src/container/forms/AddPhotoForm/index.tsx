import React from "react";
import classes from "./AddPhotoForm.module.scss";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
/* import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

import UploadButton from "../../../component/FormElements/UploadButton";
import TagsCheckbox from "../../../component/FormElements/TagsCheckbox";
 */
import { Typography } from "@material-ui/core";

/* import TextField from "@material-ui/core/TextField";
import DatePicker from "../../../component/FormElements/DatePicker";
 */
import { useAddPhoto } from "./hook";

import { photoFileRules, descRules } from "./../Photo.rules";
import { IUploadPhotoResponseToClient } from "./hook";
import AddEditPhotoFormWidget from "../../../component/AddEditPhotoFormWidget";

interface AddPhotoFormProps {
  title?: string;
  onSuccessUpload?: (
    uploadPhotoData: IUploadPhotoResponseToClient
  ) => void | undefined;
  onUploadError?: () => void | undefined;
}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const getTitle = (title?: string) => {
  if (!title) return null;

  return (
    <div className={classes.title}>
      <Typography variant="h5">{title}</Typography>
    </div>
  );
};

const AddPhotoForm = ({
  title,
  onSuccessUpload,
  onUploadError,
}: AddPhotoFormProps) => {
  //const classes = useStyles();
  const titleElement = getTitle(title);

  //useAddPhoto return - onSubmit, formErrors,
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
  } = useAddPhoto(onSuccessUpload, onUploadError);

  return (
    <AddEditPhotoFormWidget
      title={title}
      formErrors={formErrors}
      register={register}
      onSubmit={onSubmit}
      photoFileRules={photoFileRules}
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
  );
};

export default AddPhotoForm;
