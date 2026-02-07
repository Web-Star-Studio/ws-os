import Link from "next/link";
import type { JSX } from "react";
import styles from "./page.module.css";

const variants = [1, 2, 3, 4, 5];

export default function LandingVariantTwo(): JSX.Element {
  return (
    <main className={styles.page}>
      <aside className={styles.sideRail}>
        <p>WS OS</p>
        <p>Project Operating Frame</p>
        <nav aria-label="Landing variants">
          {variants.map((variant) => (
            <Link
              key={variant}
              href={`/${variant}`}
              className={variant === 2 ? styles.activeLink : styles.link}
            >
              {variant}
            </Link>
          ))}
        </nav>
      </aside>

      <section className={styles.main}>
        <p className={styles.index}>02</p>
        <h1>Brutalist precision for delivery teams.</h1>
        <p className={styles.copy}>
          Projects, docs, tasks, due dates. A single operational poster where
          admins and employees align and move work without handoff fog.
        </p>
        <div className={styles.actions}>
          <Link href="/projects" className={styles.primary}>
            Enter Workspace
          </Link>
          <button className={styles.secondary}>Book Walkthrough</button>
        </div>
      </section>

      <section className={styles.cards}>
        <article>
          <h2>Projects</h2>
          <p>Structured records for every initiative.</p>
        </article>
        <article>
          <h2>Issues</h2>
          <p>Linear-like flows in board or table view.</p>
        </article>
        <article>
          <h2>Issue pages</h2>
          <p>Mentions, due dates, files, activity trail.</p>
        </article>
      </section>
    </main>
  );
}
