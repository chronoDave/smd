import test from 'tape';

import hr from './hr';

test('[hr]', t => {
  t.equal(hr('_')('_'), 1, '_ 1');
  t.equal(hr('_')('___'), 3, '_ 3');
  t.equal(hr('_')('_ _'), 3, '_ 1-1');
  t.equal(hr('_')('_  _\t_'), 6, '_ 1-1-1');

  t.end();
});
