import { ISearchState, ISearchAction } from "../../types";

export const setSearchStateAC = (state: ISearchState): ISearchAction => {
  return {
    type: "SET_SEARCH_STATE",
    state,
  };
};
