import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const SECTIONS = [
  {
    title: "Get started",
    body: "What HRIS covers, how to access it, and how roles and permissions work.",
    to: "/docs/intro",
  },
  {
    title: "Guides",
    body: "Employees, organization structure, leave, attendance, and notifications.",
    to: "/docs/guides/employees",
  },
  {
    title: "API reference",
    body: "Every backend endpoint, published for each release.",
    to: "/docs/api/overview",
  },
  {
    title: "Changelog",
    body: "What changed in every release: features, fixes, and security updates.",
    to: "/changelog",
  },
];

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Guides, API reference, and release history for HRIS by PT Archenix Komputasi Indonesia"
    >
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>HRIS Documentation</h1>
          <p className={styles.subtitle}>
            Guides, API reference, and release history for the HRIS platform of
            PT Archenix Komputasi Indonesia.
          </p>
          <p className={styles.version}>
            Latest release: <Link to="/changelog/v0-7-1">0.7.1</Link>
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Read the docs
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/api/overview"
            >
              API overview
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
