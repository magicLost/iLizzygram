import { ISearchState, ISearchAction } from "./../../types";
import { Reducer } from "redux";

export const searchInitialState: ISearchState = {
  tagsIds: [],
  yearsOld: -1,
};

const reducer: Reducer<ISearchState, ISearchAction> = (
  state = searchInitialState,
  action
) => {
  switch (action.type) {
    case "SET_SEARCH_STATE":
      return action.state;
    /* tagsIds: action.tagsIds ? action.tagsIds : [],
        minDate: action.minDate,
        maxDate: action.maxDate,
        orderBy: action.orderBy ? action.orderBy : "", */

    default:
      return state;
  }
};

export default reducer;
