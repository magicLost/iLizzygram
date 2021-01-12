import * as faker from "faker";
import { getId, fillArrayWithUniqueNumbers } from "../helper";

let timestamp = Date.now();

export const getPhoto = (
  //_id: string,
  _timestamp: number,
  tagsNumbers: number[],
  tagsIds: string[]
) => {
  const tags = tagsNumbers.map((val) => {
    return tagsIds[val];
  });

  return {
    //_id,
    name: `${faker.lorem.word()}-${faker.lorem.word()}-${faker.random.number({
      min: 1,
      max: 305,
    })}.jpg`,
    description: faker.lorem.paragraph(),
    _timestamp,
    tags,
  };
};

export const createPhotos = (numberOfPhotos: number, tagsIds: string[]) => {
  const photos = [];
  const maxNumbers = tagsIds.length - 1;

  for (let i = 0; i < numberOfPhotos; i++) {
    //const id = getId();

    const uniqueNumbers: number[] = [];

    fillArrayWithUniqueNumbers(
      uniqueNumbers,
      maxNumbers,
      faker.random.number({ min: 1, max: 4 })
    );

    photos.push(getPhoto(timestamp, uniqueNumbers, tagsIds));

    timestamp++;
  }

  return photos;
};
