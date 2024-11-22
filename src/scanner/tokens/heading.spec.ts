import test from 'tape';

import h from './heading';

test('[heading]', t => {
  t.equal(h('#'), 1, '#1');
  t.equal(h('######'), 6, '#6');
  t.equal(h('#######'), null, '#7');
  t.equal(h('## ####'), 2, '#2 #4');

  t.end();
});
