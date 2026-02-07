import type { Role } from "./project";

export type PermissionAction =
  | "project:create"
  | "project:archive"
  | "project:edit"
  | "issue:create"
  | "issue:edit"
  | "document:manage";

export function canPerform(action: PermissionAction, role: Role): boolean {
  if (role === "admin") {
    return true;
  }

  switch (action) {
    case "project:archive":
      return false;
    default:
      return true;
  }
}

