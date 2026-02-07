import type { JSX } from "react";
import { AuthPanel } from "./AuthPanel";
import styles from "./page.module.css";

export default function LandingVariantOne(): JSX.Element {
  return (
    <main className={styles.page}>
      <section className={styles.splitLayout}>
        <article className={styles.brandPane}>
          <span className={styles.brandLine} aria-hidden />
          <h1 className={styles.brandWord}>WEBSTAROS</h1>
          <p className={styles.brandMeta}>PROJECT MANAGEMENT OS</p>
        </article>

        <AuthPanel />
      </section>
    </main>
  );
}
