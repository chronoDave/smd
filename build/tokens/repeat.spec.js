// src/scanner/tokens/repeat.spec.ts
import test from "tape";

// src/scanner/tokens/repeat.ts
var repeat_default = (c) => (x) => {
  let i = 0;
  do {
    i += 1;
  } while (x[i] === c);
  return i;
};

// src/scanner/tokens/repeat.spec.ts
test("[repeat]", (t) => {
  t.equal(repeat_default("#")("#"), 1, "#1");
  t.equal(repeat_default("#")("#######"), 7, "#7");
  t.equal(repeat_default("#")("## ####"), 2, "#2 #4");
  t.end();
});
