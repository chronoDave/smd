import type { Token } from '../types';

/**
 * @see https://spec.commonmark.org/0.31.2/#indented-code-blocks
*/
export default (x: string): Token | null => {
  const match = /^\s{0,3}((`{3,}(.*[^`])?)|(~{3,}.*))$/.exec(x);
  if (!match) return null;

  return { lexeme: 'codeblock', size: match[0].length };
};