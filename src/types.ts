export type Lexeme =
  'hr' |
  'h1' |
  'h2' |
  'h3' |
  'h4' |
  'h5' |
  'h6' |
  'sh1' |
  'sh2' |
  'codeblock';

export type Token = {
  lexeme: Lexeme;
  size: number;
};
