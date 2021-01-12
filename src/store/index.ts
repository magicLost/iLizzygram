// ACTIONS
export {
  //showLoginFormAC,
  //hideLoginFormAC,
  showAddFormAC,
  hideAddFormAC,
  showEditFormAC,
  hideEditFormAC,
  showPhotoSliderAC,
  hidePhotoSliderAC,
  showSearchFormAC,
  hideSearchFormAC, //hideForgetPassFormAC, //showForgetPassFormAC,
} from "./action/modal";

export { showAlertAC, hideAlertAC } from "./action/alert";

//export { fetchTagsAC } from "./action/tags";

// REDUCERs
export { default as modalReducer } from "./reducer/modal";
export { default as alertReducer } from "./reducer/alert";
export { default as tagsReducer } from "./reducer/tags";
