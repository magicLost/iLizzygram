import React from "react";
//import classes from "./AddPhotoForm.module.scss";
import { useForm } from "react-hook-form";
import "date-fns";
//import { MuiPickersUtilsProvider } from "@material-ui/pickers";
//import DateFnsUtils from "@date-io/date-fns";
//import LinearProgress from "@material-ui/core/LinearProgress";
//import Button from "@material-ui/core/Button";
//import TextField from "@material-ui/core/TextField";
//import DatePicker from "../../../component/FormElements/DatePicker/DatePicker";
import { dateRules, descRules, photoFileRules, tagsRules } from "../rules";
//import UploadButton from "../../../component/FormElements/UploadButton/UploadButton";
//import TagsCheckbox from "../../../component/FormElements/TagsCheckbox/TagsCheckbox";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import AddEditPhotoFormWidget from "../../../component/AddEditPhotoFormWidget/AddEditPhotoFormWidget";
import { usePhotosWithSearch } from "../../../hooks/photos/usePhotos";
import { useResetStore } from "../../../hooks/photos/useResetStore";
import { useUploadPhoto } from "./AddPhotoForm.hook";

//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export interface IAddPhotoFormData {
  desc: string;
  date: Date;
  photoFile: FileList;
  tags: { [name: string]: boolean };
}

interface AddPhotoFormProps {
  //hide: () => void | undefined;
}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

//photoUpload(file: Upload!, desc: String!, date: String!, tags: [ID!]!): File!
export const UPLOAD_PHOTO = gql`
  mutation($file: Upload!, $desc: String!, $date: String!, $tags: [ID!]!) {
    photoUpload(file: $file, desc: $desc, date: $date, tags: $tags) {
      srcSet
    }
  }
`;

const AddPhotoForm = ({}: AddPhotoFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearError,
    watch,
    formErrors,
    uploadLoading,
    onSubmit,
  } = useUploadPhoto();

  //const classes = useStyles();
  console.log("[RENDER ADD_PHOTO_FORM]");
  return (
    <AddEditPhotoFormWidget
      title={"Добавить фото"}
      errors={formErrors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      photoFileRules={photoFileRules}
      dateRules={dateRules}
      tagsRules={tagsRules}
      setValue={setValue}
      clearError={clearError}
      watch={watch}
      descRules={descRules}
      loading={uploadLoading}
    />
  );
};

export default AddPhotoForm;

/* const AddPhotoForm = ({}: AddPhotoFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearError,
    watch,
    errors,
  } = useForm<IAddPhotoFormData>();

  //const { resetStore } = usePhotosWithSearch();
  const { resetStore } = useResetStore();

  //On success or error we show alert
  const [uploadPhoto, { loading }] = useMutation(
    UPLOAD_PHOTO,
    {
      onCompleted: () => {
        /*show success alert
        /*whire cache query
        resetStore();
        //hide();
        console.log("[COMPLETE]");
      },
      onError: (err) => {
        /*show error alert
        console.error("BAD FILE UPLOAD", err);
      },
    }
  );

  const onSubmit = ({ photoFile, desc, date, tags }) => {
    const tagsIds = [];
    for (let id in tags) {
      if (tags[id] === true) tagsIds.push(id);
    }

    console.log("SUBMIT", photoFile, desc, date, tagsIds);
    uploadPhoto({
      variables: {
        file: photoFile[0],
        desc,
        date,
        tags: tagsIds,
      },
    });
  };

  //const classes = useStyles();
  return (
    <AddEditPhotoFormWidget
      title={"Добавить фото"}
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      photoFileRules={photoFileRules}
      dateRules={dateRules}
      tagsRules={tagsRules}
      setValue={setValue}
      clearError={clearError}
      watch={watch}
      descRules={descRules}
      loading={loading}
    />
  );
}; */
