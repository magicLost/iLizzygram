export { regex } from "./formValidators";

export const millisecondsToYears = (mSeconds: number) => {
  return Math.floor(mSeconds / 31536000000);
};

export const getLizzyYearsOld = () => {
  const birthday = new Date(2018, 7, 8);

  const now = new Date();

  const mSeconds = now.getTime() - birthday.getTime();

  return millisecondsToYears(mSeconds);
};

export const getYearsOld = (date: Date) => {
  const birthday = new Date(2018, 7, 8);

  const mSeconds = date.getTime() - birthday.getTime();

  return millisecondsToYears(mSeconds);
};
