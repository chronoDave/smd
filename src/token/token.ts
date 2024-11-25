import r from './tokens/repeat';
import heading from './tokens/heading';
import hr from './tokens/hr';
import label from './tokens/label';

import { TAB, SPACE, LINE_FEED, CARRIAGE_RETURN } from './characters';

export type Type =
  'h1' |
  'h2' |
  'h3' |
  'h4' |
  'h5' |
  'h6' |
  'uli' |
  'oli' |
  'label' |
  'blockquote' |
  'bold' |
  'setext_heading_underline' |
  'backslash' |
  'link_label' |
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
  if (/[0-9](\)|\.)/.test(x.slice(0, 2))) return { type: 'oli', size: 2 };

  // Escape
  if (x.startsWith('\\')) return { type: 'backslash', size: r('\\')(x) };

  // Thematic break / list item
  if (x.startsWith('-')) {
    const dash = r('-')(x);
    const thematicBreak = hr('-')(x);

    if (thematicBreak > dash) {
      return { type: 'hr', size: thematicBreak };
    } else {
      if (dash === 1) return { type: 'uli', size: dash };
      return { type: 'setext_heading_underline', size: dash };
    }
  }

  if (x.startsWith('*')) {
    const size = hr('*')(x);
    if (size === 1) return { type: 'uli', size };
    if (size >= 3) return { type: 'hr', size };
  }

  if (x.startsWith('_')) {
    const size = hr('_')(x);
    if (size === 1) return { type: 'uli', size };
    if (size >= 3) return { type: 'hr', size };
  }

  if (x.startsWith('+')) {
    const size = r('+')(x);
    if (size === 1) return { type: 'uli', size };
  }

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
    if (size > 3) return { type: 'codeblock', size };
  }

  // Label
  if (x.startsWith('[')) {
    const size = label(x);
    if (size !== null) return { type: 'label', size };
  }

  return null;
};
