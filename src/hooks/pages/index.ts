import { useRef } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH, MODAL } from "../../apolloClient/queries";
import {
  IModalState,
  ISearchState,
  searchVar,
  modalVar,
} from "../../apolloClient/cache";
import { IPhoto } from "../../../server/api/entity/Photo/Photo.model";

/* interface IHomeController {
  modalState: IModalState;
  isSearch: boolean;
  limit: number;

  onImageClick: (index: number) => void | undefined;

  onStartSearch: () => void | undefined;

  onClearSearchResults: () => void | undefined;

  onShowSearchForm: () => void | undefined;

  onHideSearchForm: () => void | undefined;

  onShowAddForm: () => void | undefined;

  onHideAddForm: () => void | undefined;

  onShowEditForm: (photo: IPhoto) => void | undefined;

  onHideEditForm: () => void | undefined;

  onHidePhotoSlider: () => void | undefined;

  onSuccessAddPhoto: () => void | undefined;
}

class HomeController {
  modalState: IModalState;
  isSearch: boolean;
  limit: number;

  onImageClick = (index: number) => {
    /* setModalState((prevState) => ({
          ...prevState,
          openSlider: true,
          initActiveIndex: index,
        })); 
    console.log("ON IMAGE CLICK", index, modalVar());
    modalVar({
      ...this.modalState,
      openSlider: true,
      initActiveIndex: index,
    });
  };

  onStartSearch = () => {
    //const isSearchLocal = tagsIds.length > 0 || !isSortDesc;
    /* setModalState((prevState) => ({
          ...prevState,
          openSearch: false,
        }));
        setSearchState((prevState) => ({
          ...prevState,
          isSearch,
          isSortDesc,
          tagsIds,
        })); 
    modalVar({
      ...this.modalState,
      openSearch: false,
    });
  };

  onClearSearchResults = () => {
    /* setSearchState((prevState) => ({
          ...prevState,
          isSearch: false,
          isSortDesc: true,
          tagsIds: [],
        })); 

    searchVar({
      isSortDesc: true,
      tagsIds: [],
      limit: this.limit,
      isSearch: false,
    });
  };

  onShowSearchForm = () => {
    modalVar({
      ...this.modalState,
      openSearch: true,
    });
  };

  onHideSearchForm = () => {
    modalVar({
      ...this.modalState,
      openSearch: false,
    });
  };

  onShowAddForm = () => {
    modalVar({
      ...this.modalState,
      openAddForm: true,
    });
  };

  onHideAddForm = () => {
    modalVar({
      ...this.modalState,
      openAddForm: false,
    });
  };

  onShowEditForm = (photo: IPhoto) => {
    modalVar({
      ...this.modalState,
      openEditForm: true,
      photo,
    });
  };

  onHideEditForm = () => {
    modalVar({
      ...this.modalState,
      openEditForm: false,
      photo: undefined,
    });
  };

  onHidePhotoSlider = () => {
    modalVar({
      ...this.modalState,
      openSlider: false,
    });
  };

  onSuccessAddPhoto = () => {
    //close add form
    //reset search state
    //clear apollo cache
  };
} */

export const useHome = () => {
  /*  const controllerRef = useRef<IHomeController>(undefined);
  const initRef = useRef<boolean>(false);

  if (initRef.current === false) {
    controllerRef.current = new HomeController();
    initRef.current = true;
  } */

  const {
    data: {
      //search: { isSortDesc, tagsIds, limit, isSearch },
      search: searchState,
    },
  } = useQuery<{ search: ISearchState }>(SEARCH);

  const {
    data: { modal: modalState },
  } = useQuery<{ modal: IModalState }>(MODAL);

  /*  controllerRef.current.modalState = modalState;
  controllerRef.current.limit = limit;
  controllerRef.current.isSearch = isSearch; */

  return {
    modalState,
    searchState,
    //isSearch,
    //controller: controllerRef.current,
  };
};
