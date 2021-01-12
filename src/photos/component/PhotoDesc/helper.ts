import { IGlobalState, TTagsData } from "../../../store/types";

import { ICheckboxItemData } from "../../../component/FormElements/TagsCheckbox";

interface ITagData extends ICheckboxItemData {
  id: string;
}

export const getPhotoTags = (
  tagsData: TTagsData,
  photoTags: { [id: string]: boolean }
): ITagData[] => {
  const res = [];

  for (let tagId in photoTags) {
    if (photoTags[tagId] === true && tagsData.has(tagId)) {
      const data = tagsData.get(tagId);
      res.push({
        id: tagId,
        ...data,
      });
    }
  }

  return res;
};

export const getMonth = (date: Date) => {
  const month = date.getMonth();
  switch (month) {
    case 0:
      return "января";
    case 1:
      return "февраля";
    case 2:
      return "марта";
    case 3:
      return "апреля";
    case 4:
      return "мая";
    case 5:
      return "июня";
    case 6:
      return "июля";
    case 7:
      return "августа";
    case 8:
      return "сентября";
    case 9:
      return "октября";
    case 10:
      return "ноября";
    case 11:
      return "декабря";

    default:
      throw new Error(`Unknown month number  ${month}`);
  }
};

export const getFormatDate = (date: Date) => {
  const day = date.getDate();
  const month = getMonth(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const getDate = (date: Date | number | string): Date => {
  let resultDate = undefined;

  console.log(
    "GET DATE",
    date.hasOwnProperty("toDate"),
    (date as any).toDate ? true : false
  );

  if (date instanceof Date) return date;

  if ((date as any).toDate) {
    return (date as any).toDate();
  }

  if (typeof date === "string") {
    resultDate = new Date(date);
    if (resultDate.toString() === "Invalid Date")
      resultDate = new Date(parseInt(date));
  } else {
    resultDate = new Date(date);
  }

  if (resultDate.toString() === "Invalid Date")
    throw new Error("Bad date in PhotoDesc");

  return resultDate;
};
