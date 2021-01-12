import gql from "graphql-tag";
import { useResetStore } from "../../../hooks/photos/useResetStore";
import { useForm } from "react-hook-form";
import { useMutation, MutationTuple } from "@apollo/client";
import { IAddPhotoFormData, UPLOAD_PHOTO } from "./AddPhotoForm";
import { hideAddForm } from "../../../hooks/cache/cache.controller";

/* class AddPhotoFormController {
  uploadPhoto: any;

  onSubmit = ({ photoFile, desc, date, tags }) => {
    const tagsIds = [];
    for (let id in tags) {
      if (tags[id] === true) tagsIds.push(id);
    }

    console.log("SUBMIT", photoFile, desc, date, tagsIds);
    if (!this.uploadPhoto) throw new Error("No uploadPhoto in controller");
    this.uploadPhoto({
      variables: {
        file: photoFile[0],
        desc,
        date,
        tags: tagsIds,
      },
    });
  };
} */

export const useUploadPhoto = () => {
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
  const [uploadPhoto, { loading }] = useMutation(UPLOAD_PHOTO, {
    onCompleted: () => {
      /*show success alert*/
      /*whire cache query*/
      resetStore();
      //hide();
      hideAddForm();
      console.log("[COMPLETE]");
    },
    onError: (err) => {
      /*show error alert*/
      console.error("BAD FILE UPLOAD", err);
    },
  });

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

  return {
    register,
    handleSubmit,
    setValue,
    clearError,
    watch,
    formErrors: errors,
    onSubmit,
    uploadLoading: loading,
  };
};
