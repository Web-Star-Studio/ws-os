"use client";

import { FormEvent, useEffect, useMemo, useState, type DragEvent, type JSX } from "react";
import { ISSUE_STATUS_LABELS, ISSUE_STATUS_ORDER } from "@ws/shared";
import type { IssueStatus } from "@ws/shared";
import { formatDate, formatDateTime } from "./date-utils";
import type { IssueView, IssueViewRow, TableSortBy } from "./project-types";

const SORTABLE_COLUMNS: Array<{
  key: TableSortBy;
  label: string;
}> = [
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "dueDate", label: "Due" },
  { key: "updatedAt", label: "Updated" },
];

export function ProjectIssuesTab({
  projectId,
  boardIssues,
  tableIssues,
  onCreateIssue,
  onMoveIssueStatus,
}: {
  projectId: string;
  boardIssues?: Array<IssueViewRow>;
  tableIssues?: Array<IssueViewRow>;
  onCreateIssue: (args: {
    title: string;
    description: string;
    dueDate: number | null;
  }) => Promise<void>;
  onMoveIssueStatus: (issueId: string, status: IssueStatus) => Promise<void>;
}): JSX.Element {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [issueDueDate, setIssueDueDate] = useState("");
  const [issueView, setIssueView] = useState<IssueView>("kanban");
  const [tableSortBy, setTableSortBy] = useState<TableSortBy>("updatedAt");
  const [tableSortDirection, setTableSortDirection] = useState<"asc" | "desc">(
    "desc",
  );
  const [creating, setCreating] = useState(false);

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

  async function handleCreateIssue(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    try {
      await onCreateIssue({
        title: issueTitle,
        description: issueDescription,
        dueDate: issueDueDate ? new Date(`${issueDueDate}T00:00:00`).getTime() : null,
      });
      setIssueTitle("");
      setIssueDescription("");
      setIssueDueDate("");
    } finally {
      setCreating(false);
    }
  }

  async function handleDrop(event: DragEvent<HTMLElement>, status: IssueStatus) {
    event.preventDefault();
    const issueId = event.dataTransfer.getData("text/plain");
    if (!issueId) {
      return;
    }
    await onMoveIssueStatus(issueId, status);
  }

  return (
    <div className="stack">
      <form className="card stack" onSubmit={handleCreateIssue}>
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
        <button className="button primary" type="submit" disabled={creating}>
          {creating ? "Adding..." : "Add issue"}
        </button>
      </form>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>Issues</h2>
        <div className="tab-row">
          <button
            className={`tab-button ${issueView === "kanban" ? "active" : ""}`}
            onClick={() => setIssueView("kanban")}
          >
            Kanban
          </button>
          <button
            className={`tab-button ${issueView === "table" ? "active" : ""}`}
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
              onDrop={(event) => void handleDrop(event, status)}
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
                    <small className="muted">Due: {formatDate(issue.dueDate)}</small>
                    <a href={`/projects/${projectId}/issues/${issue.id}`}>Open issue</a>
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
                {SORTABLE_COLUMNS.map((column) => (
                  <th key={column.key}>
                    <button
                      className="button"
                      onClick={() => {
                        setTableSortBy(column.key);
                        setTableSortDirection(
                          tableSortDirection === "asc" ? "desc" : "asc",
                        );
                      }}
                    >
                      {column.label}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {issuesForTable.map((issue) => (
                <tr key={issue.id}>
                  <td>
                    <a href={`/projects/${projectId}/issues/${issue.id}`}>{issue.title}</a>
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
  );
}

