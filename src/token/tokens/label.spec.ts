import test from 'tape';

import label from './label';

test('[label]', t => {
  t.equal(label('[a]'), 3, 'label');
  t.equal(label('[a'), null, 'empty label');

  t.end();
});
