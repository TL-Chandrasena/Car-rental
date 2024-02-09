export const sleep = async (time) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
  return promise;
};
