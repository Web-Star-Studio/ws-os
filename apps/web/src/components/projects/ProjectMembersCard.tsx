"use client";

import type { JSX } from "react";
import type { ProjectMemberView } from "./project-types";

export function ProjectMembersCard({
  members,
}: {
  members?: Array<ProjectMemberView>;
}): JSX.Element {
  return (
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
  );
}

