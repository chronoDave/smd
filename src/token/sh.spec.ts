import test from 'tape';

import sh from './sh';

test('[sh]', t => {
  const pass = (x: string) => t.true(sh(x), x);
  const fail = (x: string) => t.false(sh(x), x);

  pass('=========');
  pass('---------');
  pass('-------------------------');
  pass('=');
  pass('  ===');
  fail('    ---');
  fail('= =');
  fail('--- -');

  t.equal(sh('=')?.lexeme, 'sh1');
  t.equal(sh('-')?.lexeme, 'sh2');

  t.end();
});
