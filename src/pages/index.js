import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const SECTIONS = [
  {
    title: "For employees",
    body: "Request leave, check your balance, and record your attendance.",
    to: "/docs/employee-guide/requesting-leave",
  },
  {
    title: "For managers",
    body: "Approve your team's leave and see their attendance.",
    to: "/docs/manager-guide/approving-leave",
  },
  {
    title: "For HR",
    body: "Manage employees, the organization structure, and leave policies.",
    to: "/docs/hr-guide/managing-employees",
  },
  {
    title: "Release notes",
    body: "See what is new and improved in every release.",
    to: "/release-notes",
  },
];

export default function Home() {
  return (
    <Layout
      title="Home"
      description="User guides and release notes for HRIS by PT Archenix Komputasi Indonesia"
    >
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>HRIS Help Center</h1>
          <p className={styles.subtitle}>
            Guides for employees, managers, and HR at PT Archenix Komputasi
            Indonesia.
          </p>
          <p className={styles.version}>
            Latest release: <Link to="/release-notes/v0-7-1">0.7.1</Link>
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Get started
            </Link>
            <Link
              className="button button--secondary button--lg"
              href="https://hris.click"
            >
              Open HRIS
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
