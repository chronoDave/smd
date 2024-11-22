import test from 'tape';

import scan from './scan';

test('[scan]', t => {
  const tokens = scan('### this is a string!');

  console.log(tokens);

  t.end();
});
