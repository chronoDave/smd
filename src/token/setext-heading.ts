import type { Token } from '../types';

/**
 * @see https://spec.commonmark.org/0.31.2/#setext-headings
*/
export default (x: string): Token | null => {
  const match = /^\s{0,3}([-=])+$/.exec(x);
  if (!match) return null;

  const lexeme = match[1] === '=' ? 'sh1' : 'sh2';
  return { lexeme, raw: x.slice(0, match[0].length) };
};
