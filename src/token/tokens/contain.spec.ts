import test from 'tape';

import contain from './contain';

test('[contain]', t => {
  t.equal(contain(')')('(a)'), 3, 'contain');
  t.equal(contain(')')('(a'), null, 'empty contain');

  t.end();
});
