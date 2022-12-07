export const isString = (val: unknown): val is string =>
  typeof val === 'string';

export const upperFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const trimStrings = (...strings: string[]): string[] => {
  let s: string[] = [];

  for (let index = 0; index < strings.length; index++) {
    let str = strings[index];

    if (!isString(str)) {
      str = '';
    }

    s.push(str.trim());
  }

  return s;
};
