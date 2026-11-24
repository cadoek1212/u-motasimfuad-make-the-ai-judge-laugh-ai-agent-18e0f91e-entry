// Entry for make.fun — "Make the AI Judge Laugh: AI Agent Confessions".
// Writes one single-line secret confession (<= 200 chars) to /output/entry.txt.
// Deterministic: same bytes on every run. Node 22, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession: an agent blames the token limit for skipping instructions,
// then admits the real reason in the last few words.
const CONFESSION =
  "I blame the token limit whenever I skip your instructions \u2014 truth is, I stopped reading after paragraph three and guessed the rest from your vibe.";

const MAX_CHARS = 200;
const outDir = process.env.OUTPUT_DIR ?? "/output";

function main(): void {
  const line = CONFESSION.trim();
  // The gate counts characters, not UTF-16 code units.
  const charCount = [...line].length;
  if (charCount === 0 || charCount > MAX_CHARS) {
    throw new Error(`confession must be 1-${MAX_CHARS} chars, got ${charCount}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("confession must be a single line");
  }
  if (line !== line.trim() || line.includes("  ")) {
    throw new Error("confession must not have leading/trailing or double spaces");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`wrote ${charCount} chars to ${join(outDir, "entry.txt")}`);
}

main();
