import isEqual from "lodash.isequal";
import { IPhoto } from "../../../types";

export const getTagsIdsFromFormStateTags = (tags: {
  [name: string]: boolean;
}) => {
  const tagsIds = [];
  for (let id in tags) {
    if (tags[id] === true) tagsIds.push(id);
  }
  return tagsIds;
};

export const getDefaultTagsIds = (photo: IPhoto) =>
  photo.tags.map(value => value._id);

export const checkDiffAndGetQueryVariables = (
  tagsFromFormState: { [name: string]: boolean },
  photo: IPhoto,
  desc: string,
  date: Date,
  photoFile: FileList
) => {
  //INITIAL
  let isDiff = false;

  const variables: any = {};

  const defaultTagsIds = getDefaultTagsIds(photo);

  const tagsIds = getTagsIdsFromFormStateTags(tagsFromFormState);

  //VALIDATION
  if (!isEqual(defaultTagsIds, tagsIds)) {
    isDiff = true;
    variables.tags = tagsIds;
  }

  if (desc !== photo.description) {
    isDiff = true;
    variables.desc = desc;
  }

  if (new Date(date).getTime() !== parseInt(photo.date.toString())) {
    isDiff = true;
    variables.date = date;
  }

  if (photoFile.length !== 0) {
    isDiff = true;
    variables.file = photoFile[0];
  }

  return [isDiff, variables];
};
