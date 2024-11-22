// src/scanner/tokens/heading.spec.ts
import test from "tape";

// src/scanner/tokens/repeat.ts
var repeat_default = (c) => (x) => {
  let i = 0;
  do {
    i += 1;
  } while (x[i] === c);
  return i;
};

// src/scanner/tokens/heading.ts
var heading_default = (x) => {
  const n = repeat_default("#")(x);
  if (n > 6) return null;
  return n;
};

// src/scanner/tokens/heading.spec.ts
test("[heading]", (t) => {
  t.equal(heading_default("#"), 1, "#1");
  t.equal(heading_default("######"), 6, "#6");
  t.equal(heading_default("#######"), null, "#7");
  t.equal(heading_default("## ####"), 2, "#2 #4");
  t.end();
});
