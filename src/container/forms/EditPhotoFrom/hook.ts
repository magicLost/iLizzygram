import gql from "graphql-tag";
import { useResetStore } from "../../../hooks/photos/useResetStore";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { IPhoto } from "../../../types";
import { useRef } from "react";
import { tagsRules } from "../Photo.rules";
//import { hideAddForm } from "../../../apolloClient/cache.controller";
//import { useTags } from "../../../hooks/photos/useTags";
import { PHOTO_FIELDS_FRAGMENT } from "../../../hooks/photos/usePhotos";
import { useRegisterFormElements } from "../AddPhotoForm/hook";
import { modalVar } from "../../../apolloClient/cache";
import {
  getTagsIdsFromFormStateTags,
  getDefaultTagsIds,
  checkDiffAndGetQueryVariables,
} from "./helper";

export interface IEditPhotoFormData {
  desc?: string;
  date?: Date;
  photoFile?: FileList;
  tags?: { [name: string]: boolean };
}

export interface IEditPhotoResponseToClient {
  photoEdit: IPhoto;
}

export const EDIT_PHOTO = gql`
  mutation(
    $id: ID!
    $file: Upload
    $desc: String
    $date: String
    $tags: [ID!]
  ) {
    photoEdit(id: $id, file: $file, desc: $desc, date: $date, tags: $tags) {
      ...PhotoFields
    }
  }
  ${PHOTO_FIELDS_FRAGMENT}
`;

export const useEditPhoto = (
  onSuccessUpload?: (
    editPhotoData: IEditPhotoResponseToClient
  ) => void | undefined,
  onUploadError?: () => void | undefined
) => {
  // SET INIT FORM STATE
  const isInitRef = useRef(false);

  const { photo } = modalVar();

  if (!photo) throw new Error("No photo in modal state");

  let defaultDate = null;

  let defaultTagsIds = [];

  if (isInitRef.current === false) {
    defaultTagsIds = getDefaultTagsIds(photo);
    defaultDate = parseInt(photo.date.toString());

    isInitRef.current = true;
  }

  const {
    register,
    handleSubmit,
    setValue,
    clearError,
    watch,
    errors,
  } = useForm<IEditPhotoFormData>({
    defaultValues: {
      date: defaultDate,
      desc: photo.description,
    },
  });

  //REGISTER FORMS ELEMENTS

  const {
    onDateChange,
    dateValue,

    onTagsCheckboxChange,
    tagsState,
    tagsData,
    tagsLoading,
    queryError,
  } = useRegisterFormElements(
    register,
    setValue,
    clearError,
    watch,
    undefined,
    tagsRules,
    defaultTagsIds
  );

  const [editPhoto, { data, loading }] = useMutation(EDIT_PHOTO, {
    onCompleted: data => {
      /*show success alert*/
      /*whire cache query*/
      console.log("[COMPLETE] EDIT PHOTO UPLOAD", data);
      if (onSuccessUpload) onSuccessUpload(data);
    },
    onError: err => {
      /*show error alert*/
      console.error("BAD EDIT FILE UPLOAD", err);
      if (onUploadError) onUploadError();
    },
  });

  const onSubmit = handleSubmit(({ photoFile, desc, date, tags }) => {
    //we check if desc or date is equal original we make it undefined
    const [isDiff, variables] = checkDiffAndGetQueryVariables(
      tags,
      photo,
      desc,
      date,
      photoFile
    );

    console.log("SUBMIT", isDiff, variables, photo._id);

    if (!isDiff) {
      //show alert with message nothing to change
      return;
    }

    editPhoto({
      variables: {
        ...variables,
        id: photo._id,
      },
    });
  });

  return {
    register,
    onSubmit,

    formErrors: errors,
    uploadLoading: loading,

    onDateChange,
    dateValue,

    onTagsCheckboxChange,
    tagsState,
    tagsData,
    tagsLoading,
    tagsQueryError: queryError,
    photo,
  };
};
