import test from 'tape';

import li from './li';

test('[li]', t => {
  t.equal(li('*'), null, 'no space');
  t.equal(li('* '), 2, '1 space');
  t.equal(li('*    '), 5, '4 spaces');
  t.equal(li('*     '), null, '5 spaces');

  t.end();
});
