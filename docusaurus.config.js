// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

// Versi dokumentasi:
// - "0.7"  : versi yang sedang berjalan di production, tampil di /docs
// - "0.6"  : versi sebelumnya, tampil di /docs/0.6
// - current: isi folder docs/, yaitu versi berikutnya yang belum rilis,
//            tampil di /docs/next
// Cara membekukan versi baru ada di /proses-rilis
const LATEST = "0.7";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "HRIS Docs",
  tagline:
    "Dokumentasi, panduan fitur, dan riwayat versi HRIS PT Archenix Komputasi Indonesia",
  favicon: "img/favicon.svg",

  url: "https://docs.hris.click",
  baseUrl: "/",
  // menghasilkan halaman.html, sesuai aturan try_files di nginx/default.conf
  trailingSlash: false,

  organizationName: "DeadBear34",
  projectName: "hris-docs",

  onBrokenLinks: "throw",
  onBrokenAnchors: "warn",
  markdown: {
    hooks: { onBrokenMarkdownLinks: "throw" },
  },

  i18n: {
    defaultLocale: "id",
    locales: ["id"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          lastVersion: LATEST,
          versions: {
            current: {
              label: "Next (belum rilis)",
              path: "next",
              banner: "unreleased",
            },
            "0.7": { label: "0.7.x (terbaru)", banner: "none" },
            "0.6": { label: "0.6.x", banner: "unmaintained" },
          },
          showLastUpdateTime: false,
        },
        blog: {
          path: "rilis",
          routeBasePath: "rilis",
          blogTitle: "Catatan Rilis",
          blogDescription: "Perubahan HRIS di setiap versi",
          blogSidebarTitle: "Semua rilis",
          blogSidebarCount: "ALL",
          postsPerPage: 10,
          showReadingTime: false,
          onInlineTags: "throw",
          onInlineAuthors: "ignore",
          onUntruncatedBlogPosts: "ignore",
          feedOptions: { type: null },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: { respectPrefersColorScheme: true },
      navbar: {
        title: "HRIS Docs",
        logo: { alt: "HRIS", src: "img/logo.svg" },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docs",
            position: "left",
            label: "Dokumentasi",
          },
          { to: "/rilis", label: "Catatan Rilis", position: "left" },
          { to: "/kebijakan-versi", label: "Kebijakan Versi", position: "left" },
          { to: "/kompatibilitas", label: "Kompatibilitas", position: "left" },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Dokumentasi",
            items: [
              { label: "Pengantar", to: "/docs/intro" },
              { label: "Referensi API", to: "/docs/api/referensi-api" },
              { label: "Panduan QA", to: "/docs/qa/panduan-qa" },
            ],
          },
          {
            title: "Versi",
            items: [
              { label: "Catatan Rilis", to: "/rilis" },
              { label: "Kebijakan Versi", to: "/kebijakan-versi" },
              { label: "Proses Rilis", to: "/proses-rilis" },
            ],
          },
          {
            title: "Aplikasi",
            items: [
              { label: "HRIS", href: "https://hris.click" },
              { label: "API", href: "https://api.hris.click/health" },
            ],
          },
        ],
        copyright: `HRIS · PT Archenix Komputasi Indonesia · Program Magang Awanio ${new Date().getFullYear()}`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "json", "sql"],
      },
    }),
};

export default config;
