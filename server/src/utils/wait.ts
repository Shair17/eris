export const wait = (timeout: number = 1000) =>
  new Promise(resolve => setTimeout(resolve, timeout));
