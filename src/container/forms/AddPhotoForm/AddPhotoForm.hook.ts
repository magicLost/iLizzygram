import gql from "graphql-tag";
import { useResetStore } from "../../../hooks/photos/useResetStore";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { IPhoto } from "./../../../types";
import { useEffect } from "react";
import { dateRules, tagsRules } from "./../Photo.rules";
//import { hideAddForm } from "../../../apolloClient/cache.controller";
import { useTags } from "../../../hooks/photos/useTags";

export interface IAddPhotoFormData {
  desc: string;
  date: Date;
  photoFile: FileList;
  tags: { [name: string]: boolean };
}

export interface IUploadPhotoResponseToClient {
  uploadPhoto: IPhoto;
}

//photoUpload(file: Upload!, desc: String!, date: String!, tags: [ID!]!): File!
export const UPLOAD_PHOTO = gql`
  mutation($file: Upload!, $desc: String!, $date: String!, $tags: [ID!]!) {
    photoUpload(file: $file, desc: $desc, date: $date, tags: $tags) {
      srcSet
    }
  }
`;

export const useRegisterFormElements = (
  register: any,
  setValue: any,
  clearError: any,
  watch: any
) => {
  useEffect(() => {
    register({ name: "date", type: "custom" }, dateRules);
    register({ name: "tags", type: "custom" }, tagsRules);
    //register({ name: "date" }, {});
  }, [register]);

  const onDateChange = date => {
    console.log("onDateChange", date);
    setValue("date", date);
    clearError("date");
  };

  const dateValue = watch("date");

  // tagsState = { tag_id: boolean } - in input checkbox we use name={tag._id}
  const tagsState = watch("tags");

  const onTagsCheckboxChange = (event: any) => {
    //console.log("handleDateChange", event.target);
    //const newState = { ...state, [event.target.name]: event.target.checked };
    const newState = {
      ...tagsState,
      [event.target.name]: event.target.checked,
    };
    clearError("tags");
    setValue("tags", newState);
    //setState(newState);
  };

  const {
    data: tagsData,
    loading: tagsLoading,
    error: queryError,
  } = useTags(initState => setValue("tags", initState));

  return {
    onDateChange,
    dateValue,

    onTagsCheckboxChange,
    tagsState,
    tagsData,
    tagsLoading,
    queryError,
  };
};

export const useAddPhoto = (
  onSuccessLogin?: (
    uploadPhotoData: IUploadPhotoResponseToClient
  ) => void | undefined,
  onLoginError?: () => void | undefined,
  defaultTagsIds?: string[]
) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearError,
    watch,
    errors,
  } = useForm<IAddPhotoFormData>();

  //REGISTER FORMS ELEMENTS

  const {
    onDateChange,
    dateValue,

    onTagsCheckboxChange,
    tagsState,
    tagsData,
    tagsLoading,
    queryError,
  } = useRegisterFormElements(register, setValue, clearError, watch);

  /*  useEffect(() => {
    register({ name: "date", type: "custom" }, dateRules);
    register({ name: "tags", type: "custom" }, tagsRules);
    //register({ name: "date" }, {});
  }, [register]);

  const onDateChange = date => {
    console.log("onDateChange", date);
    setValue("date", date);
    clearError("date");
  };

  const dateValue = watch("date");

  // tagsState = { tag_id: boolean } - in input checkbox we use name={tag._id}
  const tagsState = watch("tags");

  const onTagsCheckboxChange = (event: any) => {
    //console.log("handleDateChange", event.target);
    //const newState = { ...state, [event.target.name]: event.target.checked };
    const newState = {
      ...tagsState,
      [event.target.name]: event.target.checked,
    };
    clearError("tags");
    setValue("tags", newState);
    //setState(newState);
  };

  const {
    data: tagsData,
    loading: tagsLoading,
    error: queryError,
  } = useTags(initState => setValue("tags", initState)); */

  //END REGISTER

  const { resetStore } = useResetStore();

  //On success or error we show alert
  const [uploadPhoto, { loading }] = useMutation(UPLOAD_PHOTO, {
    onCompleted: data => {
      /*show success alert*/
      /*whire cache query*/
      resetStore();
      //hide();
      //hideAddForm();
      if (onSuccessLogin) onSuccessLogin(data);
      console.log("[COMPLETE]");
    },
    onError: err => {
      /*show error alert*/
      if (onLoginError) onLoginError();
      console.error("BAD FILE UPLOAD", err);
    },
  });

  const onSubmit = handleSubmit(({ photoFile, desc, date, tags }) => {
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
  };
};
