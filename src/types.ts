export type Lexeme =
  'hr';

export type Token = {
  lexeme: Lexeme;
  size: number;
  open: string;
  close?: string;
};
