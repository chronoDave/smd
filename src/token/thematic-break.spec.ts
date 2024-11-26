import test from 'tape';

import hr from './thematic-break';

test('[thematic-break]', t => {
  const pass = (x: string) => t.true(hr(x), x);
  const fail = (x: string) => t.false(hr(x), x);

  pass('***');
  pass('---');
  pass('___');
  fail('+++');
  fail('===');
  fail('**');
  fail('--');
  fail('__');
  pass(' ***');
  pass('  ***');
  pass('   ***');
  fail('    ***');
  pass('_____________________________________');
  pass(' - - -');
  pass(' **  * ** * ** * **');
  pass('-     -      -      -');
  pass('-\t\t\t--');
  pass('- - - -    ');
  fail('_ _ _ _ a');
  fail('a------');
  fail('---a---');
  fail(' *-*');

  t.end();
});
