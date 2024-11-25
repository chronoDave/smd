import r from './tokens/repeat';
import c from './tokens/contain';
import heading from './tokens/heading';
import hr from './tokens/hr';
import li from './tokens/li';

import { TAB, SPACE, LINE_FEED, CARRIAGE_RETURN } from './characters';

export type Type =
  'h1' |
  'h2' |
  'h3' |
  'h4' |
  'h5' |
  'h6' |
  'li-number' |
  'li-plus' |
  'li-star' |
  'li-dash' |
  'em' |
  'strong' |
  'strike' | 
  'blockquote' |
  'bold' |
  'setext_heading_underline' |
  'backslash' |
  'title' |
  'text' |
  'uri' |
  'img' |
  'hr' |
  'dash' |
  'space' |
  'tab' |
  'newline' |
  'code' |
  'codeblock';

export type Token = {
  type: Type;
  size: number;
};

export default (x: string): Token | null => {
  // Whitespace
  if (x.startsWith(SPACE)) {
    const size = r(SPACE)(x);
    if (size >= 4) return { type: 'codeblock', size };
    return { type: 'space', size };
  }

  if (x.startsWith(TAB)) return { type: 'tab', size: r(TAB)(x) };
  if (x.startsWith(LINE_FEED)) return { type: 'newline', size: r(LINE_FEED)(x) };
  if (x.startsWith(CARRIAGE_RETURN)) return { type: 'newline', size: r(CARRIAGE_RETURN)(x) };
  if (x.startsWith('>')) return { type: 'blockquote', size: r('>')(x) };

  // Escape
  if (x.startsWith('\\')) return { type: 'backslash', size: r('\\')(x) };

  // Thematic break
  if (x.startsWith('-')) {
    const size = hr('-')(x);
    if (size !== null) return { type: 'hr', size };
  }

  if (x.startsWith('_')) {
    const size = hr('_')(x);
    if (size !== null) return { type: 'hr', size };
  }

  if (x.startsWith('*')) {
    const size = hr('*')(x);
    if (size !== null) return { type: 'hr', size };
  }

  // List item
  if (x.startsWith('-')) {
    const size = li(x);
    if (size !== null) return { type: 'li-dash', size };
  }

  if (x.startsWith('*')) {
    const size = li(x);
    if (size !== null) return { type: 'li-star', size };
  }

  if (x.startsWith('+')) {
    const size = li(x);
    if (size !== null) return { type: 'li-plus', size };
  }

  if (/[0-9a-zA-Z](\)|\.)/.test(x.slice(0, 2))) return { type: 'li-number', size: 2 };

  // ATX headings
  if (x.startsWith('#')) {
    const size = heading(x);
    if (size !== null) return { type: `h${size}` as Token['type'], size };
  }

  // Setext headings
  if (x.startsWith('=')) return { type: 'setext_heading_underline', size: r('=')(x) };

  // Code block
  if (x.startsWith('`')) {
    const size = r('`')(x);
    if (size === 1) return { type: 'code', size };
    if (size > 3) return { type: 'codeblock', size };
  }

  if (x.startsWith('~')) {
    const size = r('~')(x);
    if (size === 1) return { type: 'strike', size };
    if (size > 3) return { type: 'codeblock', size };
  }

  // Emphasis
  if (x.startsWith('_')) {
    const size = r('_')(x);
    if (size === 1) return { type: 'em', size };
  }

  // Strong
  if (x.startsWith('*')) {
    const size = r('*')(x);
    if (size === 1) return { type: 'bold', size };
  }

  // Label
  if (x.startsWith('[')) {
    const size = c(']')(x);
    if (size !== null) return { type: 'text', size };
  }

  if (x.startsWith('(')) {
    const size = c(')')(x);
    if (size !== null) return { type: 'uri', size };
  }

  if (x.startsWith('"')) {
    const size = c('"')(x);
    if (size !== null) return { type: 'title', size };
  }

  if (x.startsWith('!') && x[1] === '[') {
    const size = c(']')(x.slice(1));
    if (size !== null) return { type: 'img', size };
  }

  return null;
};
