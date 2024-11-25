export default (x: string): number | null => {
  let i = 0;

  do {
    i += 1;
  } while (x[i] !== ']' && i <= x.length);
  if (i > x.length) return null;

  return i + 1;
};
