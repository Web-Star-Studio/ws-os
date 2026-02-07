import Link from "next/link";
import type { JSX } from "react";
import styles from "./page.module.css";

const variants = [1, 2, 3, 4, 5];

const points = [
  "Project detail spaces for operational context",
  "Issues managed as board or table without duplication",
  "Issue detail pages with mentions, files, and due dates",
];

export default function LandingVariantFive(): JSX.Element {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p>WS OS / Variant 05</p>
        <nav aria-label="Landing variants">
          {variants.map((variant) => (
            <Link
              key={variant}
              href={`/${variant}`}
              className={variant === 5 ? styles.activeLink : styles.link}
            >
              {variant}
            </Link>
          ))}
        </nav>
      </header>

      <section className={styles.hero}>
        <h1>Ship work from one severe, readable interface.</h1>
        <p>
          A minimal Swiss frame with a brutal edge. Built to keep project teams
          moving in straight lines.
        </p>
      </section>

      <section className={styles.rail}>
        {points.map((point, index) => (
          <article key={point} style={{ animationDelay: `${index * 0.1}s` }}>
            <span>{`0${index + 1}`}</span>
            <p>{point}</p>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <Link href="/projects" className={styles.primary}>
          Start with projects
        </Link>
        <button className={styles.secondary}>Talk to sales</button>
      </footer>
    </main>
  );
}
