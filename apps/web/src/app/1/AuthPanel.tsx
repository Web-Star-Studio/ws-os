"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { FormEvent, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import styles from "./page.module.css";

type AuthMode = "sign-in" | "sign-up";

export function AuthPanel(): JSX.Element {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => {
    return mode === "sign-in" ? "LOGIN" : "CRIAR CONTA";
  }, [mode]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (mode === "sign-up") {
        const result = await authClient.signUp.email({
          name,
          email,
          password,
        });
        if (result.error) {
          setErrorMessage(result.error.message ?? "Falha ao criar conta.");
          return;
        }
        setSuccessMessage("Conta criada. Faça login para continuar.");
        setMode("sign-in");
        return;
      }

      const result = await authClient.signIn.email({
        email,
        password,
      });
      if (result.error) {
        setErrorMessage(result.error.message ?? "Falha ao entrar.");
        return;
      }
      router.push("/projects");
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <aside className={styles.authPane}>
        <p className={styles.authHint}>Carregando sessão...</p>
      </aside>
    );
  }

  if (session) {
    return (
      <aside className={styles.authPane}>
        <p className={styles.authLabel}>SESSÃO</p>
        <h2 className={styles.authTitle}>VOCÊ JÁ ESTÁ LOGADO</h2>
        <p className={styles.authHint}>Acesse o workspace para continuar.</p>
        <div className={styles.authBottomRow}>
          <Link className={styles.textLink} href="/projects">
            ABRIR PROJETOS
          </Link>
          <button
            className={styles.textLink}
            type="button"
            onClick={async () => {
              await authClient.signOut();
              router.refresh();
            }}
          >
            SAIR
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.authPane}>
      <div className={styles.authTopIcons} aria-hidden>
        <span />
        <span />
      </div>

      <p className={styles.authLabel}>{title}</p>

      <form className={styles.authForm} onSubmit={onSubmit}>
        {mode === "sign-up" ? (
          <label className={styles.lineField}>
            <span>nome</span>
            <input
              className={styles.lineInput}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              required
            />
          </label>
        ) : null}

        <label className={styles.lineField}>
          <span>email</span>
          <input
            className={styles.lineInput}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu@email.com"
            required
          />
          <i className={styles.pinkDot} aria-hidden />
        </label>

        <label className={styles.lineField}>
          <span>senha</span>
          <input
            className={styles.lineInput}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        <p className={styles.authHint}>
          {loading ? "PROCESSANDO..." : "DIGITE E PRESSIONE ENTER ↵"}
        </p>

        <button className={styles.submitButton} type="submit">
          {mode === "sign-in" ? "ENTRAR" : "CRIAR CONTA"}
        </button>
      </form>

      {errorMessage ? <p className={styles.authError}>{errorMessage}</p> : null}
      {successMessage ? (
        <p className={styles.authSuccess}>{successMessage}</p>
      ) : null}

      <footer className={styles.authBottomRow}>
        <span>{`© ${new Date().getFullYear()} Web Star OS`}</span>
        <button className={styles.textLink} type="button">
          ESQUECI A SENHA
        </button>
        <button
          className={styles.textLink}
          type="button"
          onClick={() => {
            setMode((current) => (current === "sign-in" ? "sign-up" : "sign-in"));
            setErrorMessage(null);
            setSuccessMessage(null);
          }}
        >
          {mode === "sign-in" ? "CRIAR CONTA" : "TENHO CONTA"}
        </button>
      </footer>
    </aside>
  );
}
