// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

// Documentation versions:
// - "0.7"  : the version running in production, served at /docs
// - "0.6"  : the previous version, served at /docs/0.6
// - current: the docs/ folder, i.e. the next unreleased version, served at /docs/next
// How to cut a new version: /release-process
const LATEST = "0.7";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "HRIS Documentation",
  tagline:
    "Guides, API reference, and release history for HRIS by PT Archenix Komputasi Indonesia",
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
          path: "changelog",
          routeBasePath: "changelog",
          blogTitle: "Changelog",
          blogDescription: "Every HRIS release and what changed",
          blogSidebarTitle: "All releases",
          blogSidebarCount: "ALL",
          postsPerPage: 10,
          showReadingTime: false,
          onInlineTags: "throw",
          onInlineAuthors: "ignore",
          onUntruncatedBlogPosts: "ignore",
          feedOptions: {
            type: ["rss", "atom"],
            title: "HRIS Changelog",
            description: "Every HRIS release and what changed",
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
          'HRIS 0.7.1 is out with security fixes. <a href="/changelog/v0-7-1">Read the release notes</a>.',
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
          {
            href: "pathname:///api/",
            label: "API Reference",
            position: "left",
            target: "_self",
          },
          { to: "/changelog", label: "Changelog", position: "left" },
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
            title: "Documentation",
            items: [
              { label: "Introduction", to: "/docs/intro" },
              { label: "Guides", to: "/docs/guides/employees" },
              { label: "API overview", to: "/docs/api/overview" },
            ],
          },
          {
            title: "Releases",
            items: [
              { label: "Changelog", to: "/changelog" },
              { label: "Versioning policy", to: "/versioning" },
              { label: "Compatibility", to: "/compatibility" },
              { label: "Release process", to: "/release-process" },
            ],
          },
          {
            title: "Product",
            items: [
              { label: "HRIS app", href: "https://hris.click" },
              { label: "API status", href: "https://api.hris.click/health" },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} PT Archenix Komputasi Indonesia. Built during the Awanio internship program.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "json", "http"],
      },
    }),
};

export default config;
