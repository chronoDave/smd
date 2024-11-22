import r from './repeat';

export default (x: string): number | null => {
  const n = r('#')(x);

  if (n > 6) return null;
  return n;
};
