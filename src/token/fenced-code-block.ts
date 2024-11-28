import type { Token } from '../types';

/**
 * @see https://spec.commonmark.org/0.31.2/#fenced-code-blocks
*/
export default (x: string): Token | null => {
  const match = /^\s{0,3}((`{3,}(.*[^`])?)|(~{3,}.*))$/.exec(x);
  if (!match) return null;

  return { lexeme: 'codeblock', raw: x.slice(0, match[0].length) };
};
