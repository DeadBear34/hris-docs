// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

// Documentation versions:
// - "0.7"  : the version running in production, served at /docs
// - "0.6"  : the previous version, served at /docs/0.6
// - current: the docs/ folder, i.e. the next unreleased version, served at /docs/next
// How to cut a new version: RELEASING.md
//
// This site is public. It only contains end-user guides and release notes.
// API references, QA procedures, and infrastructure details stay internal.
const LATEST = "0.7";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "HRIS Documentation",
  tagline:
    "User guides and release notes for HRIS by PT Archenix Komputasi Indonesia",
  favicon: "img/favicon.svg",

  url: "https://docs.hris.click",
  baseUrl: "/",
  // generates page.html files, matching try_files in nginx/default.conf
  trailingSlash: false,

  organizationName: "DeadBear34",
  projectName: "hris-docs",

  onBrokenLinks: "throw",
  onBrokenAnchors: "warn",
  markdown: {
    hooks: { onBrokenMarkdownLinks: "throw" },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
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
              label: "Next (unreleased)",
              path: "next",
              banner: "unreleased",
            },
            "0.7": { label: "0.7.x (latest)", banner: "none" },
            "0.6": { label: "0.6.x", banner: "unmaintained" },
          },
        },
        blog: {
          path: "release-notes",
          routeBasePath: "release-notes",
          blogTitle: "Release Notes",
          blogDescription: "What is new in every HRIS release",
          blogSidebarTitle: "All releases",
          blogSidebarCount: "ALL",
          postsPerPage: 10,
          showReadingTime: false,
          onInlineTags: "throw",
          onInlineAuthors: "ignore",
          onUntruncatedBlogPosts: "ignore",
          feedOptions: {
            type: ["rss", "atom"],
            title: "HRIS Release Notes",
            description: "What is new in every HRIS release",
          },
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
      announcementBar: {
        id: "release-0-7-1",
        content:
          'HRIS 0.7.1 is here with security and reliability improvements. <a href="/release-notes/v0-7-1">See what is new</a>.',
        isCloseable: true,
      },
      navbar: {
        title: "HRIS Docs",
        logo: { alt: "HRIS", src: "img/logo.svg" },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docs",
            position: "left",
            label: "Docs",
          },
          { to: "/release-notes", label: "Release Notes", position: "left" },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
              { type: "html", value: '<hr class="dropdown__divider">' },
              { to: "/versioning", label: "Versioning policy" },
            ],
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Guides",
            items: [
              { label: "Introduction", to: "/docs/intro" },
              { label: "For employees", to: "/docs/employee-guide/requesting-leave" },
              { label: "For managers", to: "/docs/manager-guide/approving-leave" },
              { label: "For HR", to: "/docs/hr-guide/managing-employees" },
            ],
          },
          {
            title: "Releases",
            items: [
              { label: "Release notes", to: "/release-notes" },
              { label: "Versioning policy", to: "/versioning" },
            ],
          },
          {
            title: "Product",
            items: [
              { label: "Open HRIS", href: "https://hris.click" },
              { label: "FAQ", to: "/docs/faq" },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} PT Archenix Komputasi Indonesia. Built during the Awanio internship program.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash"],
      },
    }),
};

export default config;
