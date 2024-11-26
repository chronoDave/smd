import test from 'tape';

import icb from './indented-code-block';

test('[indented-code-block]', t => {
  const pass = (x: string) => t.true(icb(x), x);

  pass('    a simple');
  pass('      indented code block');

  t.end();
});
