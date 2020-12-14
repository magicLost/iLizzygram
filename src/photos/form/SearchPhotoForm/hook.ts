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
//import { TTagsFormState } from "./../../../types";
import { ISearchState } from "../../types";
//import { fromStateToFormData } from "./helper";
import { useDispatch, useSelector, batch } from "react-redux";
import { IGlobalState, TTagsData } from "../../../store/types";
import { hideSearchFormAC } from "../../../store";
import { setSearchStateAC } from "../../store/action/search";

export const useSearch = () => {
  const dispatch = useDispatch();

  const { tagsData, searchState } = useSelector<
    IGlobalState,
    { tagsData: TTagsData; searchState: ISearchState }
  >(state => ({
    tagsData: state.tags.tags,
    searchState: state.search,
  }));

  const setSearchState = (state: ISearchState) => {
    batch(() => {
      dispatch(setSearchStateAC(state));
      dispatch(hideSearchFormAC());
    });
  };

  return {
    tagsData,
    searchState,
    setSearchState,
  };
};

export const useSearchForm = (state: ISearchState, tagsData: TTagsData) => {
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

  const agesValue = watch("ages");

  const onAgeSelectChange = (event: any) => {
    setValue("ages", event.target.value);
  };

  return {
    tagsProps,
    onAgeSelectChange,
    agesValue,
    handleSubmit,
    formErrors: errors,
  };
};
