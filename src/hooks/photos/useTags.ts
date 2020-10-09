import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { ICheckboxItemData } from "./../../component/FormElements/TagsCheckbox";

export interface ITag extends ICheckboxItemData {}

export interface ITagsResponseData {
  tags: ITag[];
}

export const TAGS = gql`
  {
    tags {
      _id
      name
      title
    }
  }
`;

export type TAGS_STATE = { [name: string]: boolean };

export const useTags = (
  setInitState: (initState: TAGS_STATE) => void | undefined,
  defaultTagsIds?: string[]
) => {
  const { data, loading, error } = useQuery<ITagsResponseData>(TAGS, {
    onCompleted: data => {
      const initState: TAGS_STATE = {};
      const length = defaultTagsIds ? defaultTagsIds.length : 0;
      let tagsMarked = 0;
      data.tags.forEach(tag => {
        if (length > 0 && tagsMarked < length) {
          if (defaultTagsIds.includes(tag._id)) {
            initState[tag._id] = true;
            tagsMarked++;
          } else {
            initState[tag._id] = false;
          }
        } else {
          initState[tag._id] = false;
        }
      });
      //console.log("TAGS DEFAULT STATE", initState);
      setInitState(initState);
      //setState(initState);
    },
  });

  return {
    data,
    loading,
    error,
  };
};
