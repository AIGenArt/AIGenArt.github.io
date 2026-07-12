import { readFile } from "node:fs/promises";

const files = ["profile", "projects", "skills", "experience"];
for (const file of files) {
  JSON.parse(await readFile(new URL(`../data/${file}.json`, import.meta.url), "utf8"));
}
console.log("Portfolio data is valid.");
