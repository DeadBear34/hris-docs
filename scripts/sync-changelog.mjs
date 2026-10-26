// Generates the changelog pages (changelog/) from the backend CHANGELOG.md.
// CHANGELOG.md stays the single source of truth: generated pages are
// overwritten on every run, so never edit the files in changelog/ by hand.
//
//   node scripts/sync-changelog.mjs ../hris-backend/CHANGELOG.md
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const source = resolve(process.argv[2] ?? "../hris-backend/CHANGELOG.md");
const outDir = resolve("changelog");

// Keep a Changelog section → tag
const TAG_FOR = {
  Added: "feature",
  Fixed: "fix",
  Security: "security",
  Migration: "migration",
};

const KIND_LABEL = {
  major: "Major release with breaking changes",
  minor: "Minor release with new features",
  patch: "Patch release with fixes",
};

// Documentation versions that exist on the site; the first one is the latest
const DOC_VERSIONS = JSON.parse(readFileSync("versions.json", "utf8"));

const text = readFileSync(source, "utf8").replace(/\r\n/g, "\n");

// ## [0.7.1] - 2026-10-26
const releases = [];
const sectionRe = /^## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})\n([\s\S]*?)(?=^## \[|^\[\d)/gm;
for (const [, version, date, body] of text.matchAll(sectionRe)) {
  const groups = [];
  for (const part of body.split(/^### /m).slice(1)) {
    const [heading, ...lines] = part.split("\n");
    const items = lines.join("\n").trim();
    if (items) groups.push({ heading: heading.trim(), items });
  }
  releases.push({ version, date, groups });
}

if (releases.length === 0) {
  console.error(`No releases found in ${source}`);
  process.exit(1);
}

const compare = (a, b) => {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
};

// oldest first, so each release is compared with the one before it
releases.sort((a, b) => compare(a.version, b.version));

function kindOf(previous, current) {
  if (!previous) return "minor";
  const [pMajor, pMinor] = previous.split(".").map(Number);
  const [cMajor, cMinor] = current.split(".").map(Number);
  if (cMajor !== pMajor) return "major";
  if (cMinor !== pMinor) return "minor";
  return "patch";
}

const apiVersions = existsSync("static/openapi/versions.json")
  ? JSON.parse(readFileSync("static/openapi/versions.json", "utf8"))
  : [];

for (const file of readdirSync(outDir)) {
  if (/^\d{4}-\d{2}-\d{2}-v[\d-]+\.md$/.test(file)) unlinkSync(join(outDir, file));
}

releases.forEach((release, index) => {
  const previous = releases[index - 1]?.version;
  const kind = kindOf(previous, release.version);
  const breaking = release.groups.some((g) => g.items.includes("BREAKING"));
  const docVersion = release.version.split(".").slice(0, 2).join(".");

  const tags = new Set([kind]);
  for (const group of release.groups) {
    if (TAG_FOR[group.heading]) tags.add(TAG_FOR[group.heading]);
  }
  if (breaking) tags.add("breaking");

  const slug = `v${release.version.replaceAll(".", "-")}`;
  const lines = [
    "---",
    `title: HRIS ${release.version}`,
    `slug: ${slug}`,
    `date: ${release.date}`,
    `tags: [${[...tags].join(", ")}]`,
    "---",
    "",
    `**${KIND_LABEL[kind]}${breaking ? ", including breaking changes" : ""}.**${previous ? ` Previous version: ${previous}.` : ""}`,
    "",
    "<!-- truncate -->",
    "",
  ];

  for (const group of release.groups) {
    lines.push(`## ${group.heading}`, "", group.items, "");
  }

  const links = [];
  if (apiVersions.includes(release.version)) {
    links.push(`[API reference ${release.version}](pathname:///api/?v=${release.version})`);
  }
  if (DOC_VERSIONS.includes(docVersion)) {
    const path = docVersion === DOC_VERSIONS[0] ? "intro" : `${docVersion}/intro`;
    links.push(`[Documentation ${docVersion}.x](pathname:///docs/${path})`);
  }
  if (links.length > 0) {
    lines.push("## Resources", "", ...links.map((link) => `- ${link}`), "");
  }

  writeFileSync(join(outDir, `${release.date}-${slug}.md`), lines.join("\n"));
});

console.log(`Wrote ${releases.length} changelog pages to ${outDir}`);
