import { Reducer } from "redux";
import { ITagsState, ITagsAction } from "./../types";

const tagsInitialState: ITagsState = {
  tags: undefined,
  loading: false,
  error: false,
};

const reducer: Reducer<ITagsState, ITagsAction> = (
  state = tagsInitialState,
  action: ITagsAction
) => {
  switch (action.type) {
    case "TAGS_REQUEST":
      return {
        tags: undefined,
        loading: true,
        error: false,
      };
    case "TAGS_REQUEST_SUCCESS":
      return {
        tags: action.tags,
        loading: false,
        error: false,
      };
    case "TAGS_REQUEST_ERROR":
      return {
        tags: undefined,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
