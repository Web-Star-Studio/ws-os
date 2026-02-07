"use client";

import { FormEvent, useState, type JSX } from "react";
import { formatDateTime } from "./date-utils";
import type { ProjectDocumentView } from "./project-types";

export function ProjectDocumentsTab({
  documents,
  onUpload,
  onRename,
  onDelete,
}: {
  documents?: Array<ProjectDocumentView>;
  onUpload: (file: File) => Promise<void>;
  onRename: (documentId: string, filename: string) => Promise<void>;
  onDelete: (documentId: string) => Promise<void>;
}): JSX.Element {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) {
      return;
    }
    setUploading(true);
    try {
      await onUpload(selectedFile);
      setSelectedFile(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="stack">
      <form className="row" onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
        />
        <button type="submit" className="button primary" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
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
                    const nextFilename = prompt("Rename document", document.filename);
                    if (!nextFilename) {
                      return;
                    }
                    await onRename(document.id, nextFilename);
                  }}
                >
                  Rename
                </button>
                <button
                  className="button danger"
                  onClick={async () => {
                    await onDelete(document.id);
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
  );
}

