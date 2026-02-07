import type { JSX } from "react";
import Link from "next/link";
import { AuthPanel } from "./AuthPanel";
import styles from "./page.module.css";

export default function LandingVariantOne(): JSX.Element {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Web Star OS</p>
        <Link href="/projects" className={styles.secondary}>
          Entrar no Workspace
        </Link>
      </header>

      <section className={styles.hero}>
        <article className={styles.heroCopy}>
          <p className={styles.label}>Sistema de Gestão de Projetos</p>
          <h1>
            Entregue projetos complexos com clareza, ritmo e dono definido em
            cada tarefa.
          </h1>
          <p className={styles.description}>
            O Web Star OS unifica contexto de projeto, documentos e issues em
            um fluxo único para times de operação. Menos status disperso, mais
            execução real.
          </p>
          <div className={styles.actions}>
            <Link href="/projects" className={styles.primary}>
              Começar agora
            </Link>
            <button className={styles.secondary}>Agendar demonstração</button>
          </div>
        </article>
        <AuthPanel />
      </section>
    </main>
  );
}
