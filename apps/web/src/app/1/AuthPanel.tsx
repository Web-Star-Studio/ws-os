"use client";

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

  const submitLabel = useMemo(() => {
    return mode === "sign-in" ? "Entrar" : "Criar conta";
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
          setErrorMessage(result.error.message ?? "Falha ao criar conta");
          return;
        }

        setSuccessMessage("Conta criada com sucesso. Agora é só entrar.");
        return;
      }

      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setErrorMessage(result.error.message ?? "Falha ao entrar");
        return;
      }

      router.push("/projects");
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <aside className={styles.authPanel}>
        <p className={styles.authInfo}>Carregando sessão...</p>
      </aside>
    );
  }

  if (session) {
    return (
      <aside className={styles.authPanel}>
        <p className={styles.authLabel}>Sessão ativa</p>
        <h2 className={styles.authHeading}>Você já está autenticado.</h2>
        <p className={styles.authInfo}>
          Continue para seus projetos com seu perfil atual.
        </p>
        <div className={styles.authActions}>
          <button
            className={styles.authPrimary}
            onClick={() => {
              router.push("/projects");
            }}
          >
            Abrir projetos
          </button>
          <button
            className={styles.authSecondary}
            onClick={async () => {
              await authClient.signOut();
              router.refresh();
            }}
          >
            Sair
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.authPanel}>
      <p className={styles.authLabel}>Acesso da plataforma</p>
      <h2 className={styles.authHeading}>Entrar ou criar conta</h2>

      <div className={styles.authTabs}>
        <button
          className={`${styles.authTab} ${mode === "sign-in" ? styles.authTabActive : ""}`}
          onClick={() => setMode("sign-in")}
          type="button"
        >
          Entrar
        </button>
        <button
          className={`${styles.authTab} ${mode === "sign-up" ? styles.authTabActive : ""}`}
          onClick={() => setMode("sign-up")}
          type="button"
        >
          Criar conta
        </button>
      </div>

      <form className={styles.authForm} onSubmit={onSubmit}>
        {mode === "sign-up" ? (
          <label className={styles.authField}>
            <span>Nome</span>
            <input
              className={styles.authInput}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        ) : null}

        <label className={styles.authField}>
          <span>Email</span>
          <input
            className={styles.authInput}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className={styles.authField}>
          <span>Senha</span>
          <input
            className={styles.authInput}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button type="submit" className={styles.authPrimary} disabled={loading}>
          {loading ? "Processando..." : submitLabel}
        </button>
      </form>

      {errorMessage ? <p className={styles.authError}>{errorMessage}</p> : null}
      {successMessage ? (
        <p className={styles.authSuccess}>{successMessage}</p>
      ) : null}
    </aside>
  );
}
