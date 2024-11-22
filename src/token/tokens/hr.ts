import { WHITESPACES } from '../characters';

export default (c: string) => (x: string): number => {
  let i = 0;

  do {
    i += 1;
  } while (x[i] === c || WHITESPACES.includes(x[i]));

  return i;
};
