"use client";

import { useMutation, useQuery } from "convex/react";
import type { Id } from "@ws/backend/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { FormEvent, type JSX, useEffect, useMemo, useState } from "react";
import { api } from "@ws/backend/convex/_generated/api";
import { ISSUE_PRIORITY_VALUES, ISSUE_STATUS_ORDER } from "@ws/shared";
import { AppShell } from "@/components/AppShell";
import { authClient } from "@/lib/auth-client";

function toDateInputValue(timestamp: number | null | undefined): string {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseMentionHandles(text: string): Array<string> {
  const regex = /@([a-zA-Z0-9._-]+)/g;
  const found = new Set<string>();
  let match: RegExpExecArray | null = regex.exec(text);
  while (match) {
    found.add(match[1].toLowerCase());
    match = regex.exec(text);
  }
  return Array.from(found);
}

export default function IssueDetailPage({
  params,
}: {
  params: { projectId: string; issueId: string };
}): JSX.Element {
  const router = useRouter();
  const projectId = params.projectId as Id<"projects">;
  const issueId = params.issueId as Id<"issues">;

  const { data: session, isPending } = authClient.useSession();
  const ensureProfile = useMutation(api.profiles.ensureViewerProfile);
  const issue = useQuery(api.issues.getIssueById, session ? { issueId } : "skip");
  const members = useQuery(
    api.projects.listProjectMembers,
    session ? { projectId } : "skip",
  );
  const mentions = useQuery(
    api.mentions.listIssueMentions,
    session ? { issueId } : "skip",
  );
  const activity = useQuery(
    api.activity.listIssueActivity,
    session ? { issueId } : "skip",
  );
  const attachments = useQuery(
    api.documents.listIssueAttachments,
    session ? { issueId } : "skip",
  );

  const updateIssue = useMutation(api.issues.updateIssue);
  const deleteIssue = useMutation(api.issues.deleteIssue);
  const upsertIssueMentions = useMutation(api.mentions.upsertIssueMentions);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const createIssueAttachment = useMutation(api.documents.createIssueAttachment);
  const deleteIssueAttachment = useMutation(api.documents.deleteIssueAttachment);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<(typeof ISSUE_STATUS_ORDER)[number]>("todo");
  const [priority, setPriority] = useState<(typeof ISSUE_PRIORITY_VALUES)[number] | "">(
    "",
  );
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    if (!issue) {
      return;
    }
    setTitle(issue.title);
    setDescription(issue.description);
    setStatus(issue.status);
    setPriority((issue.priority as (typeof ISSUE_PRIORITY_VALUES)[number]) ?? "");
    setAssigneeId(issue.assigneeId ?? "");
    setDueDate(toDateInputValue(issue.dueDate));
  }, [issue]);

  const memberHandleMap = useMemo(() => {
    const mapping = new Map<string, string>();
    for (const member of members ?? []) {
      mapping.set(member.handle.toLowerCase(), member.userId);
    }
    return mapping;
  }, [members]);

  if (isPending || !session) {
    return (
      <main className="container">
        <p>Loading issue...</p>
      </main>
    );
  }

  if (!issue) {
    return (
      <AppShell title="Issue">
        <section className="card stack">
          <h1>Issue not found</h1>
          <p className="muted">This issue may not exist or is restricted.</p>
        </section>
      </AppShell>
    );
  }

  async function onSaveIssue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await updateIssue({
        issueId,
        title,
        description,
        status,
        priority: priority || null,
        assigneeId: assigneeId || null,
        dueDate: dueDate ? new Date(`${dueDate}T00:00:00`).getTime() : null,
      });

      const handles = parseMentionHandles(description);
      const mentionIds = handles
        .map((handle) => memberHandleMap.get(handle))
        .filter((value): value is string => !!value);
      await upsertIssueMentions({
        issueId,
        mentionedUserIds: mentionIds,
      });

      setMessage("Issue updated.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Update failed");
    }
  }

  async function onUploadAttachment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) {
      setError("Choose a file first.");
      return;
    }
    setError(null);
    setMessage(null);
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
        throw new Error("Upload failed");
      }
      const uploadResult = (await uploadResponse.json()) as {
        storageId: Id<"_storage">;
      };
      await createIssueAttachment({
        issueId,
        filename: selectedFile.name,
        storageId: uploadResult.storageId,
        size: selectedFile.size,
        contentType: selectedFile.type,
      });
      setSelectedFile(null);
      setMessage("Attachment uploaded.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    }
  }

  return (
    <AppShell title={`Issue · ${issue.title}`}>
      <section className="stack">
        <article className="card stack">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <h1 style={{ margin: 0 }}>{issue.title}</h1>
            <button
              className="button danger"
              onClick={async () => {
                await deleteIssue({ issueId });
                router.push(`/projects/${projectId}`);
                router.refresh();
              }}
            >
              Delete issue
            </button>
          </div>

          <form className="stack" onSubmit={onSaveIssue}>
            <label className="stack">
              <span>Title</span>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              <small className="muted">
                Mention team members with <code>@handle</code>.
              </small>
            </label>

            <div className="grid-3">
              <label className="stack">
                <span>Status</span>
                <select
                  className="select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as (typeof ISSUE_STATUS_ORDER)[number])
                  }
                >
                  {ISSUE_STATUS_ORDER.map((statusValue) => (
                    <option key={statusValue} value={statusValue}>
                      {statusValue}
                    </option>
                  ))}
                </select>
              </label>

              <label className="stack">
                <span>Priority</span>
                <select
                  className="select"
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value as (typeof ISSUE_PRIORITY_VALUES)[number] | "",
                    )
                  }
                >
                  <option value="">None</option>
                  {ISSUE_PRIORITY_VALUES.map((priorityValue) => (
                    <option key={priorityValue} value={priorityValue}>
                      {priorityValue}
                    </option>
                  ))}
                </select>
              </label>

              <label className="stack">
                <span>Assignee</span>
                <select
                  className="select"
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                >
                  <option value="">Unassigned</option>
                  {(members ?? []).map((member) => (
                    <option key={member.userId} value={member.userId}>
                      {member.name} (@{member.handle})
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="stack">
              <span>Due date</span>
              <input
                className="input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>

            <button className="button primary" type="submit">
              Save issue
            </button>
          </form>
          {message ? <p className="success">{message}</p> : null}
          {error ? <p className="error">{error}</p> : null}
        </article>

        <article className="card stack">
          <h2 style={{ margin: 0 }}>Attachments</h2>
          <form className="row" onSubmit={onUploadAttachment}>
            <input
              type="file"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            />
            <button type="submit" className="button primary">
              Upload attachment
            </button>
          </form>

          {(attachments ?? []).map((attachment) => (
            <div
              key={attachment.id}
              className="row"
              style={{ justifyContent: "space-between" }}
            >
              <span>{attachment.filename}</span>
              <div className="row">
                {attachment.fileUrl ? (
                  <a className="button" href={attachment.fileUrl} target="_blank">
                    Open
                  </a>
                ) : null}
                <button
                  className="button danger"
                  onClick={async () => {
                    await deleteIssueAttachment({ attachmentId: attachment.id });
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </article>

        <article className="card stack">
          <h2 style={{ margin: 0 }}>Mentions</h2>
          {mentions?.length ? (
            <div className="row" style={{ flexWrap: "wrap" }}>
              {mentions.map((mention) => (
                <span key={mention.id} className="status-pill">
                  @{mention.mentionedHandle} · {mention.mentionedName}
                </span>
              ))}
            </div>
          ) : (
            <p className="muted">No mentions in this issue.</p>
          )}
        </article>

        <article className="card stack">
          <h2 style={{ margin: 0 }}>Activity</h2>
          {activity?.length ? (
            activity.map((entry) => (
              <div key={entry.id} className="stack" style={{ gap: 2 }}>
                <strong>{entry.action}</strong>
                <small className="muted">
                  {entry.actorName} ·{" "}
                  {new Date(entry.createdAt).toLocaleString("en-US")}
                </small>
              </div>
            ))
          ) : (
            <p className="muted">No activity yet.</p>
          )}
        </article>
      </section>
    </AppShell>
  );
}
