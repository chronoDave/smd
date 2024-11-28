import type { Token } from '../types';

/**
 * @see https://spec.commonmark.org/0.31.2/#indented-code-blocks
*/
export default (x: string): Token | null => {
  const match = /^\s{4,}/.exec(x);
  if (!match) return null;

  return { lexeme: 'codeblock', raw: x.slice(0, match[0].length) };
};
