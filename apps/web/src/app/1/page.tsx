import Link from "next/link";
import type { JSX } from "react";
import styles from "./page.module.css";

const variants = [1, 2, 3, 4, 5];

export default function LandingVariantOne(): JSX.Element {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>WS OS / Swiss Study 01</p>
        <nav className={styles.variantNav} aria-label="Landing variants">
          {variants.map((variant) => (
            <Link
              key={variant}
              href={`/${variant}`}
              className={variant === 1 ? styles.activeLink : styles.link}
            >
              {variant}
            </Link>
          ))}
        </nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.label}>Project Work Management</p>
        <h1>Zero noise. Full delivery control.</h1>
        <p className={styles.description}>
          Build projects, drop documents, and ship issues from one rigid
          workspace built for employee and admin teams.
        </p>
        <div className={styles.actions}>
          <Link href="/projects" className={styles.primary}>
            Open Workspace
          </Link>
          <button className={styles.secondary}>Request Demo</button>
        </div>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <h2>Core block</h2>
          <ul>
            <li>Project spaces with structured details</li>
            <li>Issue tracking in board and table views</li>
            <li>Dedicated issue pages with due dates and mentions</li>
          </ul>
        </article>
        <article className={styles.panel}>
          <h2>Signal</h2>
          <p className={styles.number}>+46%</p>
          <p>Faster issue turnover after moving teams into one operating rail.</p>
        </article>
        <article className={styles.panel}>
          <h2>Rhythm</h2>
          <p>Morning triage</p>
          <p>Midday delivery updates</p>
          <p>Evening archive and review</p>
        </article>
      </section>
    </main>
  );
}
