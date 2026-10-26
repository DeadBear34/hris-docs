// @ts-check

// Sidebar for the next version (docs/ folder). Sidebars of released versions
// are frozen into versioned_sidebars/ by `npm run docs:version`.

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "intro",
        "getting-started/accessing-hris",
        "getting-started/roles-and-permissions",
      ],
    },
    {
      type: "category",
      label: "Guides",
      collapsed: false,
      items: [
        "guides/employees",
        "guides/organization-structure",
        "guides/leave-management",
        "guides/attendance",
        "guides/notifications",
      ],
    },
    {
      type: "category",
      label: "API",
      collapsed: false,
      items: [
        "api/overview",
        "api/authentication",
        "api/errors",
        "api/rate-limits",
      ],
    },
    {
      type: "category",
      label: "Testing",
      items: ["testing/registration-testing"],
    },
  ],
};

export default sidebars;
