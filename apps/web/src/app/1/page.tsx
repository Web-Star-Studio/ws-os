import Link from "next/link";
import type { JSX } from "react";
import styles from "./page.module.css";

const variants = [1, 2, 3, 4, 5];

export default function LandingVariantOne(): JSX.Element {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>WS OS / Operating System 01</p>
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
        <p className={styles.label}>Project Execution Platform</p>
        <h1>Ship complex work without status noise.</h1>
        <p className={styles.description}>
          WS OS gives admins and employees one command surface for project
          context, documents, and issue delivery, so every deadline has an
          owner and every update has proof.
        </p>
        <div className={styles.actions}>
          <Link href="/projects" className={styles.primary}>
            Start in Projects
          </Link>
          <button className={styles.secondary}>Book 15-min Demo</button>
        </div>
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <h2>System layer</h2>
          <ul>
            <li>Project spaces with structured delivery context</li>
            <li>Linear-style issues in board and table views</li>
            <li>Issue pages with mentions, files, and due dates</li>
          </ul>
        </article>
        <article className={styles.panel}>
          <h2>Outcome</h2>
          <p className={styles.number}>2.4x</p>
          <p>
            Higher issue completion velocity after replacing scattered tools
            with one execution surface.
          </p>
        </article>
        <article className={styles.panel}>
          <h2>Cadence</h2>
          <p>Plan project scope in one place</p>
          <p>Execute daily in board or table mode</p>
          <p>Review delivery risk before deadlines slip</p>
        </article>
      </section>
    </main>
  );
}
