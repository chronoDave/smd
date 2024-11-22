import test from 'tape';

import r from './repeat';

test('[repeat]', t => {
  t.equal(r('#')('#'), 1, '#1');
  t.equal(r('#')('#######'), 7, '#7');
  t.equal(r('#')('## ####'), 2, '#2 #4');

  t.end();
});
