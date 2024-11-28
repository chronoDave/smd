import type { Token } from '../types';

import hr from '../token/thematic-break';

export default (x: string) => {
  const lines = x.split(/[\r\n]+/);

  return lines.reduce<Token[]>((acc, cur) => {
    let token = hr(cur);
    if (token) {
      acc.push(token);
      return acc;
    }

    acc.push({ lexeme: 'raw', raw: cur });

    return acc;
  }, []);
};
