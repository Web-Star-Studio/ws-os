"use client";

import { FormEvent, useEffect, useState, type JSX } from "react";

export function ProjectOverviewTab({
  description,
  onSave,
}: {
  description: string;
  onSave: (description: string) => Promise<void>;
}): JSX.Element {
  const [draft, setDraft] = useState(description);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(description);
  }, [description]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      await onSave(draft);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <label className="stack">
        <span>Project details</span>
        <textarea
          className="textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </label>
      <button className="button primary" type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save details"}
      </button>
    </form>
  );
}

