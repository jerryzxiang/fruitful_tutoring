const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const combined = `${html}\n${script}\n${styles}`;

const requiredContent = [
  "fruitfultutoring@gmail.com",
  "904-834-0489",
  "Ming",
  "Joanne",
  "Weekdays 6-10pm",
  "weekends by appointment",
  "1-hour sessions",
  "K-12",
  "ACT",
  "SAT",
  "Ph.D., Plant Biology",
  "M.S., Computer Science",
  "Florida Certified Teacher",
  "mailto:fruitfultutoring@gmail.com",
];

const removedContent = [
  "Chinese",
  "Mandarin",
  "Demo Website",
  "demo inquiry",
  "future email",
  "front-end only",
  "xxx-xxx-xxxx",
  'href="#results"',
  'id="results"',
  "Results-Focused Support",
  "testimonial-grid",
  "Warm support. Strong results.",
  "steady academic growth",
  "serious teaching experience",
];

for (const text of requiredContent) {
  assert(
    combined.includes(text),
    `Expected site content to include required text: ${text}`
  );
}

for (const text of removedContent) {
  assert(
    !combined.toLowerCase().includes(text.toLowerCase()),
    `Expected site content to remove old text: ${text}`
  );
}

console.log("Static content checks passed.");
