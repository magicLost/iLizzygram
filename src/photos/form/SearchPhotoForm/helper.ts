import { lizzyYearsOld } from "../../../config";
import { ISearchFormData, ISearchState } from "./../../types";
import { millisecondsToYears } from "./../../../utils";

let birthday = new Date(2018, 7, 8);

export const fromFormDataToState = (
  formData: ISearchFormData
): ISearchState => {
  // get tagsIds
  const tagsIds = [];

  for (let id in formData.tags) {
    if (formData.tags[id] === true) {
      tagsIds.push(id);
    }
  }

  const state: ISearchState = {
    tagsIds,
    yearsOld: formData.ages,
  };

  return state;
};

/* export const fromFormDataToState = (
  formData: ISearchFormData
): ISearchState => {
  // get tagsIds
  const tagsIds = [];

  for (let id in formData.tags) {
    if (formData.tags[id] === true) {
      tagsIds.push(id);
    }
  }

  // get minDate
  let minDate = undefined;
  if (formData.ages[0] === 0) minDate = undefined;
  else {
    minDate = new Date(birthday);
    minDate = new Date(
      minDate.setFullYear(minDate.getFullYear() + formData.ages[0])
    );
  }

  // get maxDate
  let maxDate = undefined;
  if (formData.ages[1] === lizzyYearsOld) maxDate = undefined;
  else {
    maxDate = new Date(birthday);
    maxDate = new Date(
      maxDate.setFullYear(maxDate.getFullYear() + formData.ages[1] + 1)
    );
  }

  const state: ISearchState = {
    tagsIds,
    minDate,
    maxDate,
    orderBy: formData.isSortDesc ? "desc" : "",
  };

  return state;
};

export const fromStateToFormData = (
  state: ISearchState
): { ages: number[]; isSortDesc: boolean } => {
  // get minAge
  let minAge = 0;
  if (state.minDate === undefined) minAge = 0;
  else {
    minAge = millisecondsToYears(state.minDate.getTime() - birthday.getTime());
  }

  // get maxAge
  let maxAge = 0;
  if (state.maxDate === undefined) maxAge = lizzyYearsOld;
  else {
    maxAge =
      millisecondsToYears(state.maxDate.getTime() - birthday.getTime()) - 1;
  }

  if (minAge > maxAge || maxAge > lizzyYearsOld)
    throw new Error(`Bad ages - ${minAge}, ${maxAge}`);

  return {
    ages: [minAge, maxAge],
    isSortDesc: state.orderBy === "desc" ? true : false,
  };
};
 */
