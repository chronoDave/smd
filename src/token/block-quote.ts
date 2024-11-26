import type { Token } from '../types';

/**
 * @see https://spec.commonmark.org/0.31.2/#block-quotes
 */
export default (x: string): Token | null => {
  const match = /^\s{0,3}>.*$/.exec(x);
  if (!match) return null;

  return { lexeme: 'blockquote', size: match[0].length };
};
