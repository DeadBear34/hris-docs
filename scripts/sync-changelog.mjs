// Membuat halaman Catatan Rilis (folder rilis/) dari CHANGELOG.md backend.
// CHANGELOG.md tetap satu-satunya sumber; halaman yang sudah ada ditimpa,
// jadi jangan mengedit berkas di rilis/ dengan tangan.
//
//   node scripts/sync-changelog.mjs ../hris-backend/CHANGELOG.md
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const source = resolve(process.argv[2] ?? "../hris-backend/CHANGELOG.md");
const outDir = resolve("rilis");

const HEADINGS = {
  Added: "Ditambahkan",
  Changed: "Diubah",
  Fixed: "Diperbaiki",
  Security: "Keamanan",
  Deprecated: "Akan dihapus",
  Removed: "Dihapus",
  Migration: "Migrasi database",
};

const TAG_FOR = {
  Added: "fitur",
  Fixed: "perbaikan",
  Security: "keamanan",
  Migration: "migrasi",
};

const KIND_LABEL = {
  major: "MAYOR: perubahan yang merusak cara pakai lama",
  minor: "MINOR: fitur baru",
  patch: "PATCH: perbaikan bug dan keamanan",
};

const text = readFileSync(source, "utf8").replace(/\r\n/g, "\n");

// ## [0.7.1] - 2026-10-26
const releases = [];
const sectionRe = /^## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})\n([\s\S]*?)(?=^## \[|^\[\d|\Z)/gm;
for (const match of text.matchAll(sectionRe)) {
  const [, version, date, body] = match;
  const groups = [];
  for (const part of body.split(/^### /m).slice(1)) {
    const [heading, ...lines] = part.split("\n");
    const items = lines.join("\n").trim();
    if (items) groups.push({ heading: heading.trim(), items });
  }
  releases.push({ version, date, groups });
}

if (releases.length === 0) {
  console.error(`Tidak ada rilis yang terbaca dari ${source}`);
  process.exit(1);
}

// urut dari yang terlama, supaya jenis rilis dibandingkan dengan sebelumnya
releases.sort((a, b) => compare(a.version, b.version));

function compare(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

function kindOf(previous, current) {
  if (!previous) return "minor";
  const [pMaj, pMin] = previous.split(".").map(Number);
  const [cMaj, cMin] = current.split(".").map(Number);
  if (cMaj !== pMaj) return "major";
  if (cMin !== pMin) return "minor";
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
  const docsVersion = release.version.split(".").slice(0, 2).join(".");

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
    `**Jenis rilis:** ${KIND_LABEL[kind]}${breaking ? " (berisi perubahan yang merusak)" : ""}`,
    "",
  ];

  if (previous) {
    lines.push(`Versi sebelumnya: ${previous}`, "");
  }

  lines.push("<!-- truncate -->", "");

  for (const group of release.groups) {
    lines.push(`## ${HEADINGS[group.heading] ?? group.heading}`, "", group.items, "");
  }

  const links = [];
  if (apiVersions.includes(release.version)) {
    links.push(`[Referensi API ${release.version}](pathname:///api/?v=${release.version})`);
  }
  if (["0.6", "0.7"].includes(docsVersion) || index === releases.length - 1) {
    links.push(`[Dokumentasi ${docsVersion}.x](pathname:///docs/${docsVersion === "0.7" ? "" : `${docsVersion}/`}intro)`);
  }
  if (links.length > 0) {
    lines.push("## Tautan", "", ...links.map((l) => `- ${l}`), "");
  }

  writeFileSync(join(outDir, `${release.date}-${slug}.md`), lines.join("\n"));
});

console.log(`${releases.length} catatan rilis ditulis ke ${outDir}`);
