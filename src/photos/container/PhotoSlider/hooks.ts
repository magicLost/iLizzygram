import { useSelector } from "react-redux";
import { usePhotos } from "../../store/hook";
import { IGlobalState } from "./../../../store/types";

export const usePhotoSlider = () => {
  const { photoState, loadMore } = usePhotos();

  const initActiveIndex = useSelector<IGlobalState, number>(
    state => state.modal.initActiveIndex
  );

  return {
    photoState,
    loadMore,
    initActiveIndex,
  };
};
