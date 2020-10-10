import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { tagsRules } from "../Photo.rules";
import { registerTags } from "./../AddPhotoForm/hook";
import { searchVar } from "../../../apolloClient/cache";

export interface ISearchPhotoFormData {
  isSortDesc: boolean;
  tags: { [name: string]: boolean };
}

export const useSearchPhoto = (onSetSearchState?: () => void | undefined) => {
  const {
    register,
    handleSubmit,
    setValue,
    clearError,
    watch,
    errors,
  } = useForm<ISearchPhotoFormData>();

  useEffect(() => {
    register({ name: "isSortDesc", type: "custom" });
    register({ name: "tags", type: "custom" }, tagsRules);
  }, [register]);

  const {
    onTagsCheckboxChange,
    tagsState,
    tagsData,
    tagsLoading,
    queryError,
  } = registerTags(setValue, clearError, watch);

  const isSortDescValue = watch("isSortDesc");

  const handleChange = (event: any) => {
    //console.log("handleDateChange", event.target);
    //clearError("tags");
    setValue(event.target.name, event.target.checked);
  };

  const onSubmit = handleSubmit(({ isSortDesc, tags }) => {
    const tagsIds = [];
    for (let id in tags) {
      if (tags[id] === true) tagsIds.push(id);
    }

    isSortDesc = isSortDesc === true ? true : false;

    const isSearch = tagsIds.length > 0 || !isSortDesc;

    searchVar({ ...searchVar(), isSortDesc, tagsIds, isSearch });

    if (onSetSearchState) onSetSearchState();
  });

  return {
    onTagsCheckboxChange,
    tagsState,
    tagsData,
    tagsLoading,
    queryError,

    handleChange,
    isSortDescValue,

    onSubmit,
    formErrors: errors,
  };
};
