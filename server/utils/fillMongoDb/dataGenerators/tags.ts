import * as faker from "faker";
import { getId } from "../helper";

export const tags = [
  {
    _id: "5f124c61d5c5ee37918cde82",
    name: "nature",
    title: "на природе",
  },
  {
    _id: "5f124c61d5c5ee37918cde81",
    name: "street",
    title: "на улице",
  },
  {
    _id: "5f124c61d5c5ee37918cde7f",
    name: "pets",
    title: "с петами",
  },
  {
    _id: "5f124c61d5c5ee37918cde7c",
    name: "smile",
    title: "улыбка",
  },
  {
    _id: "5f124c61d5c5ee37918cde7d",
    name: "zuganov",
    title: "зюганов",
  },
  {
    _id: "5f124c61d5c5ee37918cde7e",
    name: "home",
    title: "дома",
  },
  {
    _id: "5f124c61d5c5ee37918cde80",
    name: "family",
    title: "с родными",
  },
];

const getTag = (_id: string) => ({
  _id,
  name: `${faker.lorem.word()}-${faker.random.number({ min: 12, max: 105 })}`,
  title: faker.lorem.word(),
});

export const createTags = (numberOfTags: number) => {
  const tags = [];
  const tagsId = [];

  for (let i = 0; i < numberOfTags; i++) {
    const id = getId();

    tagsId.push(id);
    tags.push(getTag(id));
  }

  return { tags, tagsId };
};
