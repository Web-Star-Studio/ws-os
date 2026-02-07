"use client";

import { useMutation, useQuery } from "convex/react";
import type { Id } from "@ws/backend/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import {
  DragEvent,
  FormEvent,
  useEffect,
  type JSX,
  useMemo,
  useState,
} from "react";
import { api } from "@ws/backend/convex/_generated/api";
import type { IssueStatus } from "@ws/shared";
import { ISSUE_STATUS_LABELS, ISSUE_STATUS_ORDER } from "@ws/shared";
import { AppShell } from "@/components/AppShell";
import { authClient } from "@/lib/auth-client";

type ProjectTab = "overview" | "documents" | "issues";
type IssueView = "kanban" | "table";

function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

function formatDate(timestamp: number | null | undefined): string {
  if (!timestamp) {
    return "-";
  }
  return new Date(timestamp).toLocaleDateString();
}

export default function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}): JSX.Element {
  const router = useRouter();
  const projectId = params.projectId as Id<"projects">;
  const { data: session, isPending } = authClient.useSession();
  const ensureProfile = useMutation(api.profiles.ensureViewerProfile);
  const project = useQuery(
    api.projects.getProjectById,
    session ? { projectId } : "skip",
  );
  const members = useQuery(
    api.projects.listProjectMembers,
    session ? { projectId } : "skip",
  );
  const viewerProfile = useQuery(
    api.profiles.getViewerProfile,
    session ? {} : "skip",
  );
  const documents = useQuery(
    api.documents.listProjectDocuments,
    session ? { projectId } : "skip",
  );
  const boardIssues = useQuery(
    api.issues.listIssuesForBoard,
    session ? { projectId } : "skip",
  );
  const tableIssues = useQuery(
    api.issues.listIssuesForTable,
    session ? { projectId } : "skip",
  );

  const updateProjectDetails = useMutation(api.projects.updateProjectDetails);
  const archiveProject = useMutation(api.projects.archiveProject);
  const createIssue = useMutation(api.issues.createIssue);
  const moveIssueStatus = useMutation(api.issues.moveIssueStatus);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const createProjectDocument = useMutation(api.documents.createProjectDocument);
  const renameProjectDocument = useMutation(api.documents.renameProjectDocument);
  const deleteProjectDocument = useMutation(api.documents.deleteProjectDocument);

  const [tab, setTab] = useState<ProjectTab>("overview");
  const [issueView, setIssueView] = useState<IssueView>("kanban");
  const [description, setDescription] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [issueDueDate, setIssueDueDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [projectMessage, setProjectMessage] = useState<string | null>(null);
  const [docMessage, setDocMessage] = useState<string | null>(null);
  const [issueMessage, setIssueMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tableSortBy, setTableSortBy] = useState<
    "title" | "status" | "dueDate" | "updatedAt"
  >("updatedAt");
  const [tableSortDirection, setTableSortDirection] = useState<"asc" | "desc">(
    "desc",
  );

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
      return;
    }
    if (session) {
      void ensureProfile({});
    }
  }, [ensureProfile, isPending, router, session]);

  useEffect(() => {
    if (project) {
      setDescription(project.description);
    }
  }, [project]);

  useEffect(() => {
    const stored = localStorage.getItem(`issue-view-${projectId}`);
    if (stored === "kanban" || stored === "table") {
      setIssueView(stored);
    }
  }, [projectId]);

  useEffect(() => {
    localStorage.setItem(`issue-view-${projectId}`, issueView);
  }, [issueView, projectId]);

  const issuesForTable = useMemo(() => {
    if (!tableIssues) {
      return [];
    }
    const rows = [...tableIssues];
    rows.sort((a, b) => {
      const direction = tableSortDirection === "asc" ? 1 : -1;
      if (tableSortBy === "title") {
        return a.title.localeCompare(b.title) * direction;
      }
      if (tableSortBy === "status") {
        return a.status.localeCompare(b.status) * direction;
      }
      if (tableSortBy === "dueDate") {
        return ((a.dueDate ?? 0) - (b.dueDate ?? 0)) * direction;
      }
      return (a.updatedAt - b.updatedAt) * direction;
    });
    return rows;
  }, [tableIssues, tableSortBy, tableSortDirection]);

  if (isPending || !session) {
    return (
      <main className="container">
        <p>Loading project...</p>
      </main>
    );
  }

  if (project === null) {
    return (
      <AppShell title="Project">
        <section className="card stack">
          <h1>Project not found</h1>
          <p className="muted">You may not have access to this project.</p>
        </section>
      </AppShell>
    );
  }

  if (!project) {
    return (
      <AppShell title="Project">
        <section className="card">
          <p>Loading project...</p>
        </section>
      </AppShell>
    );
  }

  async function onSaveOverview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setProjectMessage(null);
    try {
      await updateProjectDetails({
        projectId,
        description,
      });
      setProjectMessage("Project details saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Save failed");
    }
  }

  async function onUploadProjectDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setDocMessage(null);
    if (!selectedFile) {
      setError("Choose a file first.");
      return;
    }
    try {
      const uploadUrl = await generateUploadUrl({});
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": selectedFile.type || "application/octet-stream",
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed.");
      }

      const uploadResult = (await uploadResponse.json()) as {
        storageId: Id<"_storage">;
      };

      await createProjectDocument({
        projectId,
        filename: selectedFile.name,
        storageId: uploadResult.storageId,
        size: selectedFile.size,
        contentType: selectedFile.type,
      });

      setSelectedFile(null);
      setDocMessage("Document uploaded.");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed",
      );
    }
  }

  async function onCreateIssue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIssueMessage(null);
    setError(null);
    try {
      await createIssue({
        projectId,
        title: issueTitle,
        description: issueDescription,
        dueDate: issueDueDate
          ? new Date(`${issueDueDate}T00:00:00`).getTime()
          : null,
      });
      setIssueTitle("");
      setIssueDescription("");
      setIssueDueDate("");
      setIssueMessage("Issue created.");
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : "Issue not created",
      );
    }
  }

  async function onDropToStatus(event: DragEvent<HTMLElement>, status: IssueStatus) {
    event.preventDefault();
    const issueId = event.dataTransfer.getData("text/plain") as Id<"issues">;
    if (!issueId) {
      return;
    }
    try {
      await moveIssueStatus({ issueId, status });
    } catch (dropError) {
      setError(dropError instanceof Error ? dropError.message : "Move failed");
    }
  }

  return (
    <AppShell title={`${project.key} · ${project.name}`}>
      <section className="card stack">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0 }}>{project.name}</h1>
            <p className="muted" style={{ margin: 0 }}>
              {project.key} · Owner {project.ownerName}
            </p>
          </div>
          <div className="row">
            <span className="status-pill">{project.status}</span>
            {viewerProfile?.role === "admin" && project.status !== "archived" ? (
              <button
                className="button danger"
                onClick={async () => {
                  await archiveProject({ projectId });
                  setProjectMessage("Project archived.");
                }}
              >
                Archive project
              </button>
            ) : null}
          </div>
        </div>

        <div className="tab-row">
          <button
            className={`tab-button ${tab === "overview" ? "active" : ""}`}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>
          <button
            className={`tab-button ${tab === "documents" ? "active" : ""}`}
            onClick={() => setTab("documents")}
          >
            Documents
          </button>
          <button
            className={`tab-button ${tab === "issues" ? "active" : ""}`}
            onClick={() => setTab("issues")}
          >
            Issues
          </button>
        </div>

        {error ? <p className="error">{error}</p> : null}
        {projectMessage ? <p className="success">{projectMessage}</p> : null}
        {docMessage ? <p className="success">{docMessage}</p> : null}
        {issueMessage ? <p className="success">{issueMessage}</p> : null}

        {tab === "overview" ? (
          <form className="stack" onSubmit={onSaveOverview}>
            <label className="stack">
              <span>Project details</span>
              <textarea
                className="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <button className="button primary" type="submit">
              Save details
            </button>
          </form>
        ) : null}

        {tab === "documents" ? (
          <div className="stack">
            <form className="row" onSubmit={onUploadProjectDocument}>
              <input
                type="file"
                onChange={(event) =>
                  setSelectedFile(event.target.files?.[0] ?? null)
                }
              />
              <button type="submit" className="button primary">
                Upload
              </button>
            </form>
            {!documents ? <p>Loading documents...</p> : null}
            {documents ? (
              <div className="stack">
                {documents.length === 0 ? (
                  <p className="muted">No documents yet.</p>
                ) : null}
                {documents.map((document) => (
                  <article
                    key={document.id}
                    className="card row"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="stack" style={{ gap: 4 }}>
                      <strong>{document.filename}</strong>
                      <small className="muted">
                        {Math.round(document.size / 1024)} KB ·{" "}
                        {formatDateTime(document.uploadedAt)}
                      </small>
                    </div>
                    <div className="row">
                      {document.fileUrl ? (
                        <a
                          className="button"
                          href={document.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open
                        </a>
                      ) : null}
                      <button
                        className="button"
                        onClick={async () => {
                          const nextFilename = prompt(
                            "Rename document",
                            document.filename,
                          );
                          if (!nextFilename) {
                            return;
                          }
                          await renameProjectDocument({
                            documentId: document.id,
                            filename: nextFilename,
                          });
                        }}
                      >
                        Rename
                      </button>
                      <button
                        className="button danger"
                        onClick={async () => {
                          await deleteProjectDocument({
                            documentId: document.id,
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {tab === "issues" ? (
          <div className="stack">
            <form className="card stack" onSubmit={onCreateIssue}>
              <h2 style={{ margin: 0 }}>Create issue</h2>
              <label className="stack">
                <span>Title</span>
                <input
                  className="input"
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  required
                />
              </label>
              <label className="stack">
                <span>Description</span>
                <textarea
                  className="textarea"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                />
              </label>
              <label className="stack">
                <span>Due date</span>
                <input
                  className="input"
                  type="date"
                  value={issueDueDate}
                  onChange={(e) => setIssueDueDate(e.target.value)}
                />
              </label>
              <button className="button primary" type="submit">
                Add issue
              </button>
            </form>

            <div className="row" style={{ justifyContent: "space-between" }}>
              <h2 style={{ margin: 0 }}>Issues</h2>
              <div className="tab-row">
                <button
                  className={`tab-button ${
                    issueView === "kanban" ? "active" : ""
                  }`}
                  onClick={() => setIssueView("kanban")}
                >
                  Kanban
                </button>
                <button
                  className={`tab-button ${
                    issueView === "table" ? "active" : ""
                  }`}
                  onClick={() => setIssueView("table")}
                >
                  Table
                </button>
              </div>
            </div>

            {issueView === "kanban" ? (
              <div className="kanban">
                {ISSUE_STATUS_ORDER.map((status) => (
                  <section
                    key={status}
                    className="kanban-column"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => onDropToStatus(event, status)}
                  >
                    <strong>{ISSUE_STATUS_LABELS[status]}</strong>
                    {(boardIssues ?? [])
                      .filter((issue) => issue.status === status)
                      .map((issue) => (
                        <article
                          key={issue.id}
                          className="kanban-card stack"
                          draggable
                          onDragStart={(event) =>
                            event.dataTransfer.setData("text/plain", issue.id)
                          }
                        >
                          <strong>{issue.title}</strong>
                          <small className="muted">
                            Due: {formatDate(issue.dueDate)}
                          </small>
                          <a href={`/projects/${project.id}/issues/${issue.id}`}>
                            Open issue
                          </a>
                        </article>
                      ))}
                  </section>
                ))}
              </div>
            ) : null}

            {issueView === "table" ? (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <button
                          className="button"
                          onClick={() => {
                            setTableSortBy("title");
                            setTableSortDirection(
                              tableSortDirection === "asc" ? "desc" : "asc",
                            );
                          }}
                        >
                          Title
                        </button>
                      </th>
                      <th>
                        <button
                          className="button"
                          onClick={() => {
                            setTableSortBy("status");
                            setTableSortDirection(
                              tableSortDirection === "asc" ? "desc" : "asc",
                            );
                          }}
                        >
                          Status
                        </button>
                      </th>
                      <th>
                        <button
                          className="button"
                          onClick={() => {
                            setTableSortBy("dueDate");
                            setTableSortDirection(
                              tableSortDirection === "asc" ? "desc" : "asc",
                            );
                          }}
                        >
                          Due
                        </button>
                      </th>
                      <th>
                        <button
                          className="button"
                          onClick={() => {
                            setTableSortBy("updatedAt");
                            setTableSortDirection(
                              tableSortDirection === "asc" ? "desc" : "asc",
                            );
                          }}
                        >
                          Updated
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuesForTable.map((issue) => (
                      <tr key={issue.id}>
                        <td>
                          <a href={`/projects/${project.id}/issues/${issue.id}`}>
                            {issue.title}
                          </a>
                        </td>
                        <td>{ISSUE_STATUS_LABELS[issue.status]}</td>
                        <td>{formatDate(issue.dueDate)}</td>
                        <td>{formatDateTime(issue.updatedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="card stack" style={{ marginTop: 16 }}>
        <h2 style={{ margin: 0 }}>Project members</h2>
        <div className="row" style={{ flexWrap: "wrap" }}>
          {(members ?? []).map((member) => (
            <span key={member.userId} className="status-pill">
              @{member.handle} · {member.name}
            </span>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
