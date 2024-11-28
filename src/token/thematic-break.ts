import type { Token } from '../types';

/**
 * @see https://spec.commonmark.org/0.31.2/#thematic-breaks
 */
export default (x: string): Token | null => {
  const match = /^\s{0,3}((\*+\s*){3,}|(_+\s*){3,}|(-+\s*){3,})$/.exec(x);
  if (!match) return null;
  
  return { lexeme: 'hr', raw: x.slice(0, match[0].length) };
};
