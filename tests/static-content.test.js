const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const combined = `${html}\n${script}`;

const requiredContent = [
  "fruitfultutoring@gmail.com",
  "904-834-0489",
  "mailto:fruitfultutoring@gmail.com",
  "If nothing opens",
];

for (const text of requiredContent) {
  assert(combined.includes(text), `Expected site content to include: ${text}`);
}

console.log("Static content checks passed.");
