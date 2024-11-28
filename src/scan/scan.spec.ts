import test from 'tape';

import scan from './scan';

test('[scan] hr', t => {
  const tokens = scan(`
***
---
___
  `);

  t.equal(tokens.filter(x => x.lexeme === 'hr').length, 3);

  t.end();
});
