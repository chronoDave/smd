import test from 'tape';

import hr from './hr';

test('[hr]', t => {
  t.equal(hr('-')('-'), null, '- 1');
  t.equal(hr('-')('---'), 3, '- 3');
  t.equal(hr('-')('- -'), null, '- 1-1');
  t.equal(hr('-')('- - \t-'), 6, '- 1-1-1');

  t.end();
});
