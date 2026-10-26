// @ts-check

// Sidebar versi berikutnya (folder docs/). Sidebar versi yang sudah rilis
// dibekukan otomatis ke versioned_sidebars/ oleh `npm run docs:version`

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Fitur",
      collapsed: false,
      items: [
        "fitur/karyawan",
        "fitur/struktur-organisasi",
        "fitur/cuti",
        "fitur/absensi",
        "fitur/notifikasi",
      ],
    },
    {
      type: "category",
      label: "API",
      items: ["api/referensi-api", "api/autentikasi-dan-error"],
    },
    {
      type: "category",
      label: "QA",
      items: ["qa/panduan-qa"],
    },
  ],
};

export default sidebars;
