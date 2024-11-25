import test from 'tape';

import token from './token';

test('[token.space]', t => {
  t.equal(token(' ')?.type, 'space', 'space (1)');
  t.equal(token('   ')?.type, 'space', 'space (3)');
  t.equal(token('    ')?.type, 'codeblock', 'codeblock (4)');
  t.equal(token('      ')?.type, 'codeblock', 'codeblock (6)');

  t.end();
});

test('[token.tab]', t => {
  t.equal(token('\t')?.type, 'tab', 'tab');

  t.end();
});

test('[token.newline]', t => {
  t.equal(token('\n')?.type, 'newline', 'line feed');
  t.equal(token('\r')?.type, 'newline', 'carriage return');

  t.end();
});

test('[token.backslash]', t => {
  t.equal(token('\\')?.type, 'backslash', 'backslash');
  t.equal(token('\\\\')?.size, 2, 'no doublecount');

  t.end();
});

test('[token.li]', t => {
  t.equal(token('-')?.type, 'li', 'dash (1)');

  t.end();
});

test('[token.hr]', t => {
  t.equal(token('--- -')?.type, 'hr', 'dash (3-1)');

  t.equal(token('***')?.type, 'hr', 'star (3)');
  t.equal(token('*** *')?.type, 'hr', 'star (3-1)');

  t.equal(token('___')?.type, 'hr', 'underline (3)');
  t.equal(token('___ _')?.type, 'hr', 'underline (3-1)');

  t.end();
});

test('[token.atx_heading]', t => {
  t.equal(token('#')?.type, 'h1', '# (1)');
  t.equal(token('######')?.type, 'h6', '# (6)');
  t.equal(token('########'), null, '# (8)');

  t.end();
});

test('[token.setext_heading]', t => {
  t.equal(token('---')?.type, 'setext_heading_underline', 'dash (3)');
  t.equal(token('=')?.type, 'setext_heading_underline', '= (1)');
  t.equal(token('========')?.type, 'setext_heading_underline', '= (8)');

  t.end();
});

test('[token.code_block]', t => {
  t.equal(token('````')?.type, 'codeblock', '` (4)');
  t.equal(token('~~~~')?.type, 'codeblock', '~ (4)');

  t.end();
});

test('[token.blockquote]', t => {
  t.equal(token('>')?.type, 'blockquote', '> (1)');
  t.equal(token('>>>>')?.type, 'blockquote', '> (4)');

  t.end();
});
