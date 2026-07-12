import { readFile } from "node:fs/promises";

const files = [
  "data/profile.json",
  "data/projects.json",
  "data/competencies.json",
  "data/experience.json",
  "data/principles.json"
];

for (const file of files) {
  const raw = await readFile(file, "utf8");
  JSON.parse(raw);
  console.log(`OK: ${file}`);
}

console.log("Portfolio data is valid.");
