import * as faker from "faker";
import { generateUniqueTagsIds, setTagsFirestoreObj } from "./tags";
import random from "lodash.random";
import { millisecondsToYears } from "../../../utils";

type TPhoto = {
  description: string;
  _timestamp: Date;
  date: Date;
  yearsOld: number;
  tags: { [tagId: string]: boolean };
};

//const tagsIds = getTagsIds();

export const generatePhotos = (
  numberOfPhotos: number,
  tagsIds: string[]
): Map<string, TPhoto> => {
  const photos: Map<string, TPhoto> = new Map();

  for (let i = 0; i < numberOfPhotos; i++) {
    const desc = faker.lorem.sentence();
    const date = faker.date.between(
      new Date(2018, 7, 8),
      new Date(2020, 11, 23)
    );

    const uniqueTagsIds = generateUniqueTagsIds(
      tagsIds,
      faker.random.number({ min: 1, max: 3 })
    );

    const yearsOld = millisecondsToYears(
      date.getTime() - new Date(2018, 7, 8).getTime()
    );

    const tags = setTagsFirestoreObj(uniqueTagsIds);

    const id = (date.getTime() + random(69999)).toString();

    const _timestamp = new Date(new Date().getTime() + i * 10000);

    photos.set(id, {
      description: desc,
      _timestamp,
      yearsOld,
      date,
      tags,
    });
  }

  return photos;
};
