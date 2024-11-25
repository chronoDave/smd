import type { Token } from '../types';

export default (x: string): Token | null => {
  const match = /^\s{0,3}(#{1,6})(\s.*)?$/.exec(x);
  if (!match) return null;

  const lexeme = `h${match[1].length}` as Token['lexeme'];
  return {
    lexeme,
    size: match[0].length,
    open: `<${lexeme}>`,
    close: `</${lexeme}>`
  };
};
