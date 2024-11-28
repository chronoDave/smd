import type { Token } from '../types';

/**
 * @see https://spec.commonmark.org/0.31.2/#atx-headings
 */
export default (x: string): Token | null => {
  const match = /^\s{0,3}(#{1,6})(\s.*)?$/.exec(x);
  if (!match) return null;

  const lexeme = `h${match[1].length}` as Token['lexeme'];
  return { lexeme, raw: x.slice(0, match[0].length) };
};
