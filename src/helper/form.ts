import { TTagsFormState } from "./../types";
import { TTagsData } from "./../store/types";

export const getInitTagsState = (
  //setInitState: (initState: TTagsFormState) => void | undefined,
  tagsData?: TTagsData,
  defaultTagsIds?: string[]
) => {
  if (tagsData) {
    const initState: TTagsFormState = {};
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
    //setInitState(initState);
    return initState;
  }
};
