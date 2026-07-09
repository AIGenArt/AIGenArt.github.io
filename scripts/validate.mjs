import { readFileSync } from "node:fs";

const requiredFiles = [
  "data/profile.json",
  "data/projects.json",
  "data/competencies.json",
  "data/experience.json",
  "data/principles.json"
];

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    throw new Error(`${path}: ${error.message}`);
  }
}

for (const file of requiredFiles) {
  readJson(file);
}

const profile = readJson("data/profile.json");
const projects = readJson("data/projects.json");
const competencies = readJson("data/competencies.json");

if (!profile.name || !profile.headline || !Array.isArray(profile.focus)) {
  throw new Error("data/profile.json must include name, headline and focus[].");
}

if (!Array.isArray(projects) || projects.length === 0) {
  throw new Error("data/projects.json must contain at least one project.");
}

for (const project of projects) {
  for (const key of ["name", "type", "role", "summary", "impact", "tags"]) {
    if (!project[key]) throw new Error(`Project is missing required field: ${key}`);
  }
}

if (!Array.isArray(competencies) || competencies.length === 0) {
  throw new Error("data/competencies.json must contain at least one competency.");
}

console.log("Portfolio data validated successfully.");
