import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const SECTIONS = [
  {
    title: "Panduan fitur",
    body: "Karyawan, struktur organisasi, cuti, absensi, dan notifikasi: alur dan aturannya.",
    to: "/docs/intro",
  },
  {
    title: "Catatan rilis",
    body: "Apa yang berubah di setiap versi: fitur baru, perbaikan, dan keamanan.",
    to: "/rilis",
  },
  {
    title: "Referensi API",
    body: "Setiap endpoint backend, disimpan satu salinan per versi rilis.",
    to: "/docs/api/referensi-api",
  },
  {
    title: "Kebijakan versi",
    body: "Arti MAYOR.MINOR.PATCH dan kapan setiap angka naik.",
    to: "/kebijakan-versi",
  },
];

export default function Home() {
  return (
    <Layout
      title="Beranda"
      description="Dokumentasi dan riwayat versi HRIS PT Archenix Komputasi Indonesia"
    >
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>HRIS Docs</h1>
          <p className={styles.subtitle}>
            Dokumentasi, panduan fitur, dan riwayat versi HRIS PT Archenix
            Komputasi Indonesia.
          </p>
          <p className={styles.version}>
            Versi terbaru: <strong>0.7.1</strong>
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Mulai membaca
            </Link>
            <Link className="button button--secondary button--lg" to="/rilis">
              Catatan rilis
            </Link>
          </div>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className={styles.grid}>
          {SECTIONS.map((section) => (
            <Link key={section.to} to={section.to} className={styles.card}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
