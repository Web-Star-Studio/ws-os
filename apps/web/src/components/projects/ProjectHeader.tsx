"use client";

import { useState, type JSX } from "react";
import type { ProjectDetailView, ProjectTab } from "./project-types";

export function ProjectHeader({
  project,
  viewerRole,
  tab,
  onTabChange,
  onArchive,
}: {
  project: ProjectDetailView;
  viewerRole?: "admin" | "employee";
  tab: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
  onArchive: () => Promise<void>;
}): JSX.Element {
  const [archiving, setArchiving] = useState(false);

  return (
    <>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0 }}>{project.name}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {project.key} · Owner {project.ownerName}
          </p>
        </div>
        <div className="row">
          <span className="status-pill">{project.status}</span>
          {viewerRole === "admin" && project.status !== "archived" ? (
            <button
              className="button danger"
              disabled={archiving}
              onClick={async () => {
                setArchiving(true);
                try {
                  await onArchive();
                } finally {
                  setArchiving(false);
                }
              }}
            >
              {archiving ? "Archiving..." : "Archive project"}
            </button>
          ) : null}
        </div>
      </div>

      <div className="tab-row">
        <button
          className={`tab-button ${tab === "overview" ? "active" : ""}`}
          onClick={() => onTabChange("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-button ${tab === "documents" ? "active" : ""}`}
          onClick={() => onTabChange("documents")}
        >
          Documents
        </button>
        <button
          className={`tab-button ${tab === "issues" ? "active" : ""}`}
          onClick={() => onTabChange("issues")}
        >
          Issues
        </button>
      </div>
    </>
  );
}

