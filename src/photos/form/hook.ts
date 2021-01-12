import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getInitTagsState } from "../../helper";
import { TTagsData } from "../../store/types";
import { makeDatePickerFormProps, makeTagsFormProps } from "./helper";
//import { TTagsFormState } from "./../../types";

export interface IUseUploadPhotoFormReturn {
  //onSubmit: any;
  handleSubmit: any;
  register: any;
  formErrors: any;
  //tags dependencies
  tagsProps: {
    onTagsCheckboxChange: any;
    tagsState: any;
    //setTagsInitState: any;
  };
  //date picker dependencies
  dateProps: {
    dateValue: any;
    onDateChange: any;
  };
}

export interface IRegisterInfo {
  name: string;
  rules: any;
}

export const useUploadPhotoForm = <T>(
  tagsData: TTagsData,
  registerInfo: IRegisterInfo[],
  defaultTagsIds?: string[],
  //submit: (data: T) => void,
  formHookOptions?: {
    defaultValues: {
      [name: string]: any;
    };
  }
) => {
  //this.useFormValues = useForm<T>(this.useFormOptions);
  const {
    handleSubmit,
    errors: formErrors,
    register,
    setValue,
    clearErrors,
    watch,
    getValues,
  } = useForm<T>(formHookOptions as any);

  //console.log("USE UPLOAD PHOTO", getValues());

  useRegister(registerInfo, register);

  useEffect(() => {
    //console.log("TAGS STATE use effect", tagsData);
    if (tagsData) {
      const tagsState = getInitTagsState(tagsData, defaultTagsIds);
      //console.log("TAGS INIT STATE", tagsState);
      setValue("tags" as any, tagsState as any, { shouldDirty: true }); //, { shouldDirty: true }
      //console.log("TAGS INIT STATE After", getValues());
    }
  }, [tagsData]);

  //console.log("USE UPLOAD PHOTO2", getValues());

  const dateProps = makeDatePickerFormProps(setValue, clearErrors, watch);

  const tagsProps = makeTagsFormProps(setValue, clearErrors, watch);

  //const onSubmit = handleSubmit(submit);

  return {
    handleSubmit,
    register,
    formErrors,
    dateProps,
    tagsProps,
    //onSubmit,
  };
};

export const useRegister = (registerInfo: IRegisterInfo[], register: any) => {
  useEffect(() => {
    if (registerInfo && registerInfo.length > 0)
      for (let i = 0; i < registerInfo.length; i++) {
        register(
          { name: registerInfo[i].name, type: "custom" } as any,
          registerInfo[i].rules
        );
      }
  }, []);
};
