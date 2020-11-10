import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//import { tagsRules } from "../Photo.rules";
import { ISearchFormData } from "../../types";
//import { registerTags } from "./../AddPhotoForm/hook";
//import { searchVar } from "../../../apolloClient/cache";
import {
  //createDatePickerDependencies,
  makeTagsFormProps,
} from "../helper";
import { getInitTagsState } from "../../../helper";
import { TTagsData } from "../../../store/types";
//import { TTagsFormState } from "./../../../types";
import { ISearchState } from "../../types";
//import { fromStateToFormData } from "./helper";

export const useSearch = (state: ISearchState, tagsData: TTagsData) => {
  // GET INIT FORM STATE VALUES
  /* const [defaultValues] = useState(() => {
    return fromStateToFormData(state);
  });  */

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    errors,
  } = useForm<ISearchFormData>({
    defaultValues: {
      ages: state.yearsOld,
    } as any,
  });

  // REGISTER
  useEffect(() => {
    //register({ name: "isSortDesc", type: "custom" });
    register({ name: "tags", type: "custom" });
    register({ name: "ages", type: "custom" });
  }, [register]);

  // SET INIT TAGS STATE
  useEffect(() => {
    if (tagsData) {
      const tagsState = getInitTagsState(tagsData, state.tagsIds);
      setValue("tags", tagsState as any);
    }
  }, [tagsData]);

  const tagsProps = makeTagsFormProps(setValue, clearErrors, watch);

  //const isSortDescValue = watch("isSortDesc");

  const agesValue = watch("ages");

  /* const handleCheckboxChange = (event: any) => {
    //console.log("handleDateChange", event.target);
    //clearError("tags");
    setValue(event.target.name, event.target.checked);
  }; */

  const onAgeSelectChange = (event: any) => {
    setValue("ages", event.target.value);
  };

  /* const onSubmit = handleSubmit(({ isSortDesc, tags }) => {
    const tagsIds = [];
    for (let id in tags) {
      if (tags[id] === true) tagsIds.push(id);
    }

    isSortDesc = isSortDesc === true ? true : false;

    const isSearch = tagsIds.length > 0 || !isSortDesc;

    //searchVar({ ...searchVar(), isSortDesc, tagsIds, isSearch });

    if (onSetSearchState) onSetSearchState();
  }); */

  return {
    tagsProps,

    //handleCheckboxChange,
    onAgeSelectChange,

    //isSortDescValue,
    agesValue,

    handleSubmit,
    formErrors: errors,
  };
};
