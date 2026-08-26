const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

test("identifies Lumière as a fictional Spline concept", () => {
  assert.match(html, /Spline concept/i);
  assert.match(html, /fictional/i);
});

test("uses the contact number only for Spline inquiries", () => {
  assert.match(html, /96176300011/);
  assert.doesNotMatch(html, /96170123456|96181300288/);
});

test("provides an accessible user-controlled dental model comparison", () => {
  assert.match(html, /type="range"/);
  assert.match(html, /aria-label="Compare illustrative dental study models"/);
  assert.match(html, /Generated models · no patient data/);
  assert.match(html, /dental-model-planned-v2\.webp/);
});

test("uses no fictional clinician portrait", () => {
  assert.doesNotMatch(html, /doctor-ambient|fictional profile|Illustrative clinician portrait/i);
});

test("provides a continuous proof ribbon without playback controls", () => {
  assert.match(html, /aria-roledescription="carousel"/);
  assert.match(html, /class="proof-sequence" aria-hidden="true"/);
  assert.doesNotMatch(html, /proof-controls|proof-prev|proof-next|proof-toggle|Pause proof ribbon/);
});

test("contains no unsupported social proof", () => {
  assert.doesNotMatch(html, /Since 2008|years of focused care|smiles treated|average patient rating|Google ·|★★★★★/i);
});
