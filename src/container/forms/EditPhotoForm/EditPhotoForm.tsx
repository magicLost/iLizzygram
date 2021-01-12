import React, { useRef } from "react";
//import classes from './EditPhotoForm.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import AddEditPhotoFormWidget from "../../../component/AddEditPhotoFormWidget/AddEditPhotoFormWidget";
import { PHOTO_FIELDS_FRAGMENT } from "../../../hooks/photos/usePhotos";
import { modalVar } from "../../../apolloClient/cache";
import isEqual from "lodash.isequal";
import { IPhoto } from "../../../../server/api/entity/Photo/Photo.model";

interface EditPhotoFormProps {
  hide: () => void | undefined;
}

export interface IEditPhotoFormData {
  desc?: string;
  date?: Date;
  photoFile?: FileList;
  tags?: { [name: string]: boolean };
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

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

export const getTagsIdsFromFormStateTags = (tags: {
  [name: string]: boolean;
}) => {
  const tagsIds = [];
  for (let id in tags) {
    if (tags[id] === true) tagsIds.push(id);
  }
  return tagsIds;
};

export const getDefaultTagsIds = (photo: IPhoto) =>
  photo.tags.map((value) => value._id);

export const checkDiffAndGetQueryVariables = (
  tagsFromFormState: { [name: string]: boolean },
  photo: IPhoto,
  desc: string,
  date: Date,
  photoFile: FileList
) => {
  //INITIAL
  let isDiff = false;

  const variables: any = {};

  const defaultTagsIds = getDefaultTagsIds(photo);

  const tagsIds = getTagsIdsFromFormStateTags(tagsFromFormState);

  //VALIDATION
  if (!isEqual(defaultTagsIds, tagsIds)) {
    isDiff = true;
    variables.tags = tagsIds;
  }

  if (desc !== photo.description) {
    isDiff = true;
    variables.desc = desc;
  }

  if (new Date(date).getTime() !== parseInt(photo.date.toString())) {
    isDiff = true;
    variables.date = date;
  }

  if (photoFile.length !== 0) {
    isDiff = true;
    variables.file = photoFile[0];
  }

  return [isDiff, variables];
};

const EditPhotoForm = ({ hide }: EditPhotoFormProps) => {
  //const classes = useStyles();
  const isInitRef = useRef(false);

  const { photo } = modalVar();

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

  if (!photo) throw new Error("No photo in modal state");

  /* const { data: photoData } = useQuery(PHOTO, {
    variables: {
      id: photoId,
    },
  }); */

  //On success or error we show alert
  const [editPhoto, { data, loading }] = useMutation(EDIT_PHOTO, {
    onCompleted: (data) => {
      /*show success alert*/
      /*whire cache query*/
      console.log("[COMPLETE]", data);
      hide();
    },
    onError: (err) => {
      /*show error alert*/
      console.error("BAD FILE UPLOAD", err);
    },
  });

  const onSubmit = ({ photoFile, desc, date, tags }) => {
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
  };

  console.log("[RENDER EDIT FORM]", defaultTagsIds, defaultDate);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img height="150px" width="auto" src={photo.iconSrc} />
      </div>
      <AddEditPhotoFormWidget
        title={"Изменить фото"}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        photoFileRules={undefined}
        dateRules={undefined}
        tagsRules={undefined}
        setValue={setValue}
        clearError={clearError}
        watch={watch}
        descRules={undefined}
        loading={loading}
        defaultTagsIds={defaultTagsIds}
      />
    </>
  );
};

export default EditPhotoForm;
