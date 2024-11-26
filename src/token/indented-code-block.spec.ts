import test from 'tape';

import idc from './indented-code-block';

test('[indented-code-block]', t => {
  const pass = (x: string) => t.true(idc(x), x);
  const fail = (x: string) => t.false(idc(x), x);

  pass('    a simple');
  pass('      indented code block');

  t.end();
});
