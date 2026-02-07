import Link from "next/link";
import type { JSX } from "react";
import styles from "./page.module.css";

const variants = [1, 2, 3, 4, 5];

export default function LandingVariantFour(): JSX.Element {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.tag}>Swiss / Brutalist / 04</p>
          <h1>Work clarity without ornamental UI.</h1>
        </div>
        <nav aria-label="Landing variants">
          {variants.map((variant) => (
            <Link
              key={variant}
              href={`/${variant}`}
              className={variant === 4 ? styles.activeLink : styles.link}
            >
              {variant}
            </Link>
          ))}
        </nav>
      </header>

      <section className={styles.split}>
        <article className={styles.primaryBlock}>
          <h2>For admins and employees</h2>
          <p>
            Every project gets one source of truth for context, files, issues,
            and deadlines. No scatter, no hidden state.
          </p>
          <div className={styles.actions}>
            <Link href="/projects" className={styles.cta}>
              Launch System
            </Link>
            <button className={styles.alt}>View Pricing</button>
          </div>
        </article>

        <aside className={styles.secondaryBlock}>
          <p className={styles.blockLabel}>Feature matrix</p>
          <p>Projects + details + docs</p>
          <p>Board + table issue views</p>
          <p>Issue pages with mentions</p>
          <p>Due-date delivery management</p>
        </aside>
      </section>
    </main>
  );
}
