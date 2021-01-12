import { ISearchState } from "./../../types";
import intersection from "lodash.intersection";

export const isEqualSearchState = (
  prevState: ISearchState,
  state: ISearchState
) => {
  if (prevState.yearsOld !== state.yearsOld) return false;

  if (!isSameArrayValues(prevState.tagsIds, state.tagsIds)) return false;

  return true;
};

export const isSameArrayValues = (arr1: string[], arr2: string[]) => {
  const resIntersection = intersection(arr1, arr2);
  if (
    resIntersection.length !== arr1.length ||
    resIntersection.length !== arr2.length
  ) {
    return false;
  }

  return true;
};
