import React from "react";
//import classes from './SearchPhotoForm.module.scss';
import { makeStyles } from "@material-ui/core/styles";
import { useSearch, useSearchForm } from "./hook";
import { fromFormDataToState } from "./helper";
import SearchPhotoFormWidget from "./SearchPhotoForm";

export const SearchPhotoForm = () => {
  //close form on set state
  const { searchState, tagsData, setSearchState } = useSearch();

  return (
    <SearchPhotoFormWidget
      state={searchState}
      tagsData={tagsData}
      setSearchState={setSearchState}
    />
  );
};

export default SearchPhotoForm;
