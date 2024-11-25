import { WHITESPACES } from '../characters';

export default (c: string) => (x: string): number | null => {
  let i = 0;
  let j = 1;

  do {
    i += 1;
    if (x[i] === c) j += 1;
  } while (x[i] === c || WHITESPACES.includes(x[i]));

  if (j < 3) return null;
  return i;
};
