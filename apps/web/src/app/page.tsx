"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import type { JSX } from "react";
import { authClient } from "@/lib/auth-client";

type AuthMode = "sign-in" | "sign-up";

export default function HomePage(): JSX.Element {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const heading = useMemo(() => {
    return mode === "sign-in" ? "Sign in" : "Create account";
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
          setErrorMessage(result.error.message ?? "Sign-up failed");
          return;
        }
        setSuccessMessage("Account created. You can continue to projects.");
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        });
        if (result.error) {
          setErrorMessage(result.error.message ?? "Sign-in failed");
          return;
        }
        router.push("/projects");
        router.refresh();
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <main className="container">
        <p>Loading session...</p>
      </main>
    );
  }

  if (session) {
    return (
      <main className="container">
        <section className="card stack">
          <h1>Welcome back</h1>
          <p className="muted">
            You are signed in as{" "}
            {session.user.email ?? session.user.name ?? "authenticated user"}.
          </p>
          <div className="row">
            <Link className="button primary" href="/projects">
              Open projects
            </Link>
            <button
              className="button"
              onClick={async () => {
                await authClient.signOut();
                router.refresh();
              }}
            >
              Sign out
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="card stack" style={{ maxWidth: 560, margin: "0 auto" }}>
        <h1>Project Work Management</h1>
        <p className="muted">
          Manage projects, documents, issues, and delivery timelines in one
          workspace.
        </p>

        <div className="tab-row">
          <button
            className={`tab-button ${mode === "sign-in" ? "active" : ""}`}
            onClick={() => setMode("sign-in")}
          >
            Sign in
          </button>
          <button
            className={`tab-button ${mode === "sign-up" ? "active" : ""}`}
            onClick={() => setMode("sign-up")}
          >
            Sign up
          </button>
        </div>

        <form className="stack" onSubmit={onSubmit}>
          {mode === "sign-up" ? (
            <label className="stack">
              <span>Name</span>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          ) : null}

          <label className="stack">
            <span>Email</span>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="stack">
            <span>Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="button primary" disabled={loading}>
            {loading ? "Please wait..." : heading}
          </button>
        </form>

        {errorMessage ? <p className="error">{errorMessage}</p> : null}
        {successMessage ? <p className="success">{successMessage}</p> : null}
      </section>
    </main>
  );
}
