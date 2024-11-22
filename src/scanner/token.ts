import r from './tokens/repeat';
import h from './tokens/heading';

export type Type =
  'h1' |
  'h2' |
  'h3' |
  'h4' |
  'h5' |
  'h6' |
  'space' |
  'tab' |
  'newline';

export type Token = {
  type: Type;
  size: number;
};

export default (x: string): Token | null => {
  if (x.startsWith(' ')) return { type: 'space', size: r(' ')(x) };
  if (x.startsWith('\t')) return { type: 'tab', size: r('\t')(x) };
  if (x.startsWith('\n')) return { type: 'newline', size: r('\n')(x) };

  if (x.startsWith('#')) {
    const n = h(x);
    if (n !== null) return { type: `h${n}` as Token['type'], size: n };
  }

  return null;
};
