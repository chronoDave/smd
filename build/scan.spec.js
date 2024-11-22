// src/scanner/scan.spec.ts
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

// src/scanner/token.ts
var token_default = (x) => {
  if (x.startsWith(" ")) return { type: "space", size: repeat_default(" ")(x) };
  if (x.startsWith("	")) return { type: "tab", size: repeat_default("	")(x) };
  if (x.startsWith("\n")) return { type: "newline", size: repeat_default("\n")(x) };
  if (x.startsWith("#")) {
    const n = heading_default(x);
    if (n !== null) return { type: `h${n}`, size: n };
  }
  return null;
};

// src/scanner/scan.ts
var scan_default = (x) => {
  const tokens = [];
  let i = 0;
  let line = 0;
  const word = () => {
    const last = tokens[tokens.length - 1];
    const j = (last?.position.start ?? 0) + (last?.position.size ?? 0);
    if (i !== j) {
      const size = i - j;
      tokens.push({
        type: "word",
        lexeme: x.slice(j, j + size),
        position: { start: j, size, line }
      });
    }
  };
  do {
    const t = token_default(x.slice(i));
    if (t) {
      word();
      tokens.push({
        type: t.type,
        lexeme: x.slice(i, i + t.size),
        position: { start: i, size: t.size, line }
      });
      if (t.type === "newline") line += 1;
      i += t.size;
    } else {
      i += 1;
    }
  } while (i <= x.length);
  word();
  return tokens;
};

// src/scanner/scan.spec.ts
test("[scan]", (t) => {
  const tokens = scan_default("### this is a string!");
  console.log(tokens);
  t.end();
});
