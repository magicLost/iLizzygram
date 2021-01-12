import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const SearchButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <SearchIcon />
    </IconButton>
  );
};

export default SearchButton;
