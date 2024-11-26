import test from 'tape';

import bq from './block-quote';

test('[block-quote]', t => {
  const pass = (x: string) => t.true(bq(x), x);
  const fail = (x: string) => t.false(bq(x), x);

  pass('> # Foo');
  pass('># Foo');
  pass('>bar');
  pass('   > # Foo');
  pass('   > bar');
  pass(' > baz');
  fail('    > # Foo');

  t.end();
});
