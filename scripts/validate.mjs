import { access, readFile } from "node:fs/promises";

const required = [
  "index.html",
  "assets/styles.css",
  "assets/app.js",
  "assets/images/planitnu-dashboard.png",
  "assets/images/planitnu-templates.png",
  "assets/images/planitnu-login.png",
  "data/overview.json",
  "data/features.json",
  "data/work.json",
  "data/skills.json",
  "data/experience.json"
];

for (const path of required) await access(path);
for (const path of required.filter((path) => path.endsWith(".json"))) JSON.parse(await readFile(path, "utf8"));
console.log("Portfolio files validated.");
