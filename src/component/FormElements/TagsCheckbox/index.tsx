import React, { FC } from "react";
import TagsCheckboxWidget, { ITagsCheckboxProps } from "./TagsCheckbox";
import { useTags } from "../../../store/hooks";

//import gql from "graphql-tag";
//import { ApolloError } from "";

export interface ICheckboxItemData {
  //_id: string;
  title: string;
  name: string;
}

export const TagsCheckbox: FC<ITagsCheckboxProps> = props => {
  const { tagsState } = useTags();

  //loading, data, queryError, tagsState
  console.log("[RENDER TAGS CHECKBOX] ");

  return <TagsCheckboxWidget tagsState={tagsState} {...props} />;
};

export default TagsCheckbox;
