// @ts-check

// Sidebar for the next version (docs/ folder). Sidebars of released versions
// are frozen into versioned_sidebars/ by `npm run docs:version`.
// This site is public: user guides only, no API or QA content.

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "intro",
        "getting-started/signing-in",
        "getting-started/roles-and-access",
      ],
    },
    {
      type: "category",
      label: "For Employees",
      collapsed: false,
      items: [
        "employee-guide/requesting-leave",
        "employee-guide/attendance",
        "employee-guide/notifications",
      ],
    },
    {
      type: "category",
      label: "For Managers",
      collapsed: false,
      items: ["manager-guide/approving-leave", "manager-guide/team-attendance"],
    },
    {
      type: "category",
      label: "For HR",
      collapsed: false,
      items: [
        "hr-guide/managing-employees",
        "hr-guide/organization-structure",
        "hr-guide/leave-policies",
        "hr-guide/account-approval",
      ],
    },
    "faq",
  ],
};

export default sidebars;
