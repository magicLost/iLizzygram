export const asyncFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello");
    }, 500);
  });
};

export const superFunc = async () => {
  return await asyncFunc();
};
