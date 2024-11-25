import { SPACE } from '../characters';

export default (x: string): number | null => {
  let i = 0;

  do {
    i += 1;
  } while (x[i] === SPACE && i <= 5);

  if (i === 1 || i > 5) return null;
  return i;
};
