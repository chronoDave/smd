import test from 'tape';

import fcb from './fenced-code-block';

test('[fenced-code-block]', t => {
  const pass = (x: string) => t.true(fcb(x), x);
  const fail = (x: string) => t.false(fcb(x), x);

  pass('```');
  pass('~~~');
  fail('``');
  pass(' ```');
  pass('  ```');
  pass('   ```');
  fail('    ```');
  fail('``` ```');
  pass('```ruby');
  pass('~~~~    ruby startline=3 $%@#$');
  pass('````;');
  fail('``` aa ```');
  pass('~~~ aa ``` ~~~');

  t.end();
});
