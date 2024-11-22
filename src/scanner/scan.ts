import type { Type } from './token';

import token from './token';

export type Position = { start: number; line: number; size: number };

export type Token = {
  type: Type | 'word';
  lexeme: string;
  position: Position;
};

export default (x: string): Token[] => {
  const tokens: Token[] = [];
  let i = 0;
  let line = 0;

  const word = () => {
    const last = tokens[tokens.length - 1] as Token | undefined;
    const j = (last?.position.start ?? 0) + (last?.position.size ?? 0);
    
    if (i !== j) {
      const size = i - j;

      tokens.push({
        type: 'word',
        lexeme: x.slice(j, j + size),
        position: { start: j, size, line }
      });
    }
  };

  do {
    const t = token(x.slice(i));

    if (t) {
      word();

      tokens.push({
        type: t.type,
        lexeme: x.slice(i, i + t.size),
        position: { start: i, size: t.size, line }
      });

      if (t.type === 'newline') line += 1;
      i += t.size;
    } else {
      i += 1;
    }
  } while (i <= x.length);

  word();

  return tokens;
};
