"use client";

import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { JSX } from "react";
import { api } from "@ws/backend/convex/_generated/api";
import { AppShell } from "@/components/AppShell";
import { authClient } from "@/lib/auth-client";

export default function ProjectsPage(): JSX.Element {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const ensureProfile = useMutation(api.profiles.ensureViewerProfile);
  const createProject = useMutation(api.projects.createProject);
  const projects = useQuery(
    api.projects.listProjects,
    session ? { includeArchived: false } : "skip",
  );

  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
      return;
    }
    if (session) {
      void ensureProfile({});
    }
  }, [ensureProfile, isPending, router, session]);

  const isReady = useMemo(() => !isPending && !!session, [isPending, session]);

  async function onCreateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const created = await createProject({
        name,
        key,
        description,
      });
      setName("");
      setKey("");
      setDescription("");
      setMessage(`Project ${created.key} created.`);
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : "Could not create",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!isReady) {
    return (
      <main className="container">
        <p>Loading workspace...</p>
      </main>
    );
  }

  return (
    <AppShell title="Projects">
      <section className="grid-2" style={{ alignItems: "start" }}>
        <article className="card stack">
          <h1>Projects</h1>
          <p className="muted">
            Create and manage your project workspaces and delivery plans.
          </p>
          {!projects ? <p>Loading projects...</p> : null}
          {projects ? (
            <div className="project-grid">
              {projects.length === 0 ? (
                <p className="muted">No projects yet.</p>
              ) : null}
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="card project-tile stack"
                >
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <strong>{project.key}</strong>
                    <span className="status-pill">{project.status}</span>
                  </div>
                  <div>{project.name}</div>
                  <small className="muted">Owner: {project.ownerName}</small>
                </Link>
              ))}
            </div>
          ) : null}
        </article>

        <article className="card stack">
          <h2>Create project</h2>
          <form className="stack" onSubmit={onCreateProject}>
            <label className="stack">
              <span>Name</span>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="stack">
              <span>Key</span>
              <input
                className="input"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="OPS"
                required
              />
            </label>
            <label className="stack">
              <span>Description</span>
              <textarea
                className="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <button className="button primary" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create project"}
            </button>
          </form>
          {message ? <p className="success">{message}</p> : null}
          {error ? <p className="error">{error}</p> : null}
        </article>
      </section>
    </AppShell>
  );
}
