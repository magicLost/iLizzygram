export const calcIncreasedIndex = (index: number, itemsLength: number) => {
  return index < itemsLength - 1 ? index + 1 : itemsLength - 1;
};

export const calcDecreasedIndex = (index: number) => {
  return index > 0 ? index - 1 : 0;
};
