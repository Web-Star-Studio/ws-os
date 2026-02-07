import Link from "next/link";
import type { JSX } from "react";
import styles from "./page.module.css";

const variants = [1, 2, 3, 4, 5];

const timeline = [
  "Create project context",
  "Attach documents and references",
  "Break execution into issues",
  "Deliver in table or board mode",
];

export default function LandingVariantThree(): JSX.Element {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <p>WS OS / Study 03</p>
        <nav aria-label="Landing variants">
          {variants.map((variant) => (
            <Link
              key={variant}
              href={`/${variant}`}
              className={variant === 3 ? styles.activeLink : styles.link}
            >
              {variant}
            </Link>
          ))}
        </nav>
      </header>

      <section className={styles.hero}>
        <h1>One operating surface for projects and issues.</h1>
        <p>
          Brutalist shell. Swiss hierarchy. Clear lanes from planning to
          delivery.
        </p>
      </section>

      <section className={styles.body}>
        <article className={styles.left}>
          <p className={styles.mono}>Mode / Real-time team alignment</p>
          <ul>
            {timeline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href="/projects" className={styles.cta}>
            Open Projects
          </Link>
        </article>
        <aside className={styles.right}>
          <p className={styles.metricLabel}>Current throughput</p>
          <p className={styles.metric}>312</p>
          <p className={styles.metricCopy}>issues moved in the last 30 days</p>
        </aside>
      </section>
    </main>
  );
}
