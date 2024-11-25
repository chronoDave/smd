import type { Token } from '../types';

/**
 * @see https://spec.commonmark.org/0.31.2/#thematic-breaks
 */
export default (x: string): Token | null => {
  const size = /^\s{0,3}((\*+\s*){3,}|(_+\s*){3,}|(-+\s*){3,})$/.exec(x)?.[0].length;
  
  if (typeof size !== 'number') return null;
  return { lexeme: 'hr', size, open: '<hr />' };
};
