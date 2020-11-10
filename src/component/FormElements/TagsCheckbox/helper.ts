/* import { useEffect } from "react";
import { ICheckboxItemData } from ".";
import { TTagsData } from "./../../../store/types";

/* export interface ITag extends ICheckboxItemData {}

export interface ITagsResponseData {
  tags: ITag[];
} 

export type TAGS_STATE = { [id: string]: boolean };

export const useTags = (
  setInitState: (initState: TAGS_STATE) => void | undefined,
  tagsData?: TTagsData,
  defaultTagsIds?: string[]
) => {
  useEffect(() => {
    if (tagsData) {
      const initState: TAGS_STATE = {};
      const length = defaultTagsIds ? defaultTagsIds.length : 0;
      let tagsMarked = 0;
      tagsData.forEach((tagData, id) => {
        if (length > 0 && tagsMarked < length) {
          if (defaultTagsIds.includes(id)) {
            initState[id] = true;
            tagsMarked++;
          } else {
            initState[id] = false;
          }
        } else {
          initState[id] = false;
        }
      });
      //console.log("TAGS DEFAULT STATE", initState);
      setInitState(initState);
    }
  }, [tagsData]);
};

export const initTagsState = (
  setInitState: (initState: TAGS_STATE) => void | undefined,
  tagsData?: TTagsData,
  defaultTagsIds?: string[]
) => {
  if (tagsData) {
    const initState: TAGS_STATE = {};
    const length = defaultTagsIds ? defaultTagsIds.length : 0;
    let tagsMarked = 0;
    tagsData.forEach((tagData, id) => {
      if (length > 0 && tagsMarked < length) {
        if (defaultTagsIds.includes(id)) {
          initState[id] = true;
          tagsMarked++;
        } else {
          initState[id] = false;
        }
      } else {
        initState[id] = false;
      }
    });
    //console.log("TAGS DEFAULT STATE", initState);
    setInitState(initState);
  }
};
 */
