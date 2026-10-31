// Sanity checks for the built-in question bank. Run: npm run check:bank
import { readFileSync } from "node:fs";
const files = ["lib/bank/rw.ts", "lib/bank/math.ts"];
let problems = 0;
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const items = src.split(/\n  \{\n/).slice(1);
  for (const it of items) {
    const skill = it.match(/skill: "(\w+)"/)?.[1];
    const choices = it.match(/choices: \[([\s\S]*?)\],\n/);
    const answer = it.match(/answer: (\d)/);
    const accepted = it.match(/accepted: \[/);
    if (!choices && !accepted) { console.log("No choices/accepted:", skill); problems++; }
    if (choices && !answer) { console.log("No answer:", skill); problems++; }
    if (choices) {
      const n = (choices[1].match(/^\s*"(?:[^"\\]|\\.)*",?\s*$/gm) || choices[1].match(/"(?:[^"\\]|\\.)*"/g) || []).length;
      if (n !== 4) { console.log(`Expected 4 choices, got ${n}:`, skill, it.slice(0, 80)); problems++; }
    }
  }
  console.log(`${f}: ${items.length} items`);
}
process.exit(problems ? 1 : 0);
