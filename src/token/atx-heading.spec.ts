import test from 'tape';

import h from './atx-heading';

test('[atx-heading]', t => {
  const pass = (x: string) => t.true(h(x), x);
  const fail = (x: string) => t.false(h(x), x);

  pass('# foo');
  pass('## foo');
  pass('### foo');
  pass('#### foo');
  pass('##### foo');
  pass('###### foo');
  fail('####### foo');
  fail('#5 bolt');
  fail('#hashtag');
  fail('\\## foo');
  pass('# foo *bar* \*baz\*');
  pass('#                  foo                     ');
  pass(' ### foo');
  pass('  ## foo');
  pass('   # foo');
  fail('    # foo');
  pass('## foo ##');
  pass('  ###   bar    ###');
  pass('# foo ##################################');
  pass('##### foo ##');
  pass('### foo ###     ');
  pass('### foo ### b');
  pass('# foo#');
  pass('### foo \\###');
  pass('## foo #\\##');
  pass('# foo \\#');
  pass('## ');
  pass('#');
  pass('### ###');

  t.equal(h('# foo')?.lexeme, 'h1', 'h1');
  t.equal(h('###### foo')?.lexeme, 'h6', 'h6');

  t.end();
});
