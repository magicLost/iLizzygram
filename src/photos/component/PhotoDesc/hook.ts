import { useDispatch, useSelector } from "react-redux";
import { showEditFormAC } from "../../../store";
import { useTags } from "../../../store/hooks";
//import { IGlobalState, ITagsState } from "../../../store/types";
import { TPhotoData } from "../../types";

export const usePhotoDesc = () => {
  const dispatch = useDispatch();

  const { tagsState } = useTags();

  /* const photo = useSelector<IGlobalState, TPhotoData>(
    state => state.modal.photo
  ); */

  const showEditPhotoForm = (photo: TPhotoData) =>
    dispatch(showEditFormAC(photo));

  return {
    //photo,
    tagsState,
    showEditPhotoForm,
  };
};
