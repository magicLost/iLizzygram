import {
  modalVar,
  alertVar,
  searchVar,
  searchInitialState,
} from "../../apolloClient/cache";
import { IPhoto } from "../../../server/api/entity/Photo/Photo.model";
import { Color } from "@material-ui/lab/Alert";

export const hideLoginForm = () => {
  modalVar({
    ...modalVar(),
    openLoginForm: false,
  });
};

export const showLoginForm = () => {
  modalVar({
    ...modalVar(),
    openLoginForm: true,
  });
};

export const showAlert = (type: Color, message: string) => {
  alertVar({
    type,
    message,
    isShow: true,
  });
};

export const hideAlert = () => {
  alertVar({
    ...alertVar(),
    isShow: false,
  });
};

export const showPhotoSlider = (index: number) => {
  console.log("ON IMAGE CLICK", index, modalVar());
  modalVar({
    ...modalVar(),
    openSlider: true,
    initActiveIndex: index,
  });
};

export const hidePhotoSlider = () => {
  modalVar({
    ...modalVar(),
    openSlider: false,
  });
};

export const hideSearchFilterForm = () => {
  modalVar({
    ...modalVar(),
    openSearch: false,
  });
};

export const showSearchFilterForm = () => {
  modalVar({
    ...modalVar(),
    openSearch: true,
  });
};

export const clearSearchResult = () => {
  searchVar({
    ...searchInitialState,
  });
};

export const showAddForm = () => {
  modalVar({
    ...modalVar(),
    openAddForm: true,
  });
};

export const hideAddForm = () => {
  modalVar({
    ...modalVar(),
    openAddForm: false,
  });
};

export const showEditForm = (photo: IPhoto) => {
  modalVar({
    ...modalVar(),
    openEditForm: true,
    photo,
  });
};

export const hideEditForm = () => {
  modalVar({
    ...modalVar(),
    openEditForm: false,
    photo: undefined,
  });
};

/* 
onImageClick = (index: number) => {
    
    
     
    
     
    
    
    
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

*/
