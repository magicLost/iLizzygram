import * as faker from "faker";
import { ObjectId } from "mongodb";

export const getId = () => {
  return new ObjectId().toHexString();
};

export const setUniqueNumber = (
  numbers: number[],
  maxNumbers: number,
  count: number = 0
) => {
  const n = faker.random.number({ min: 1, max: maxNumbers });
  count++;
  //console.log(count);
  if (numbers.includes(n)) {
    setUniqueNumber(numbers, maxNumbers, count);
  }
  if (numbers.includes(n)) return;
  numbers.push(n);
};

export const fillArrayWithUniqueNumbers = (
  numbers: number[],
  maxNumbers: number,
  length: number
) => {
  if (length >= maxNumbers)
    throw new Error("max numbers must be more than length");

  for (let i = 0; i < length; i++) {
    setUniqueNumber(numbers, maxNumbers);
  }
};
