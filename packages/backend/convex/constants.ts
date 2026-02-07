import { v } from "convex/values";

export const ROLE_VALUES = ["admin", "employee"] as const;
export const PROJECT_STATUS_VALUES = ["active", "archived"] as const;
export const PROJECT_MEMBER_ROLE_VALUES = ["owner", "member"] as const;
export const ISSUE_STATUS_VALUES = [
  "backlog",
  "todo",
  "in_progress",
  "done",
] as const;
export const ISSUE_PRIORITY_VALUES = [
  "low",
  "medium",
  "high",
  "urgent",
] as const;

export type Role = (typeof ROLE_VALUES)[number];
export type ProjectStatus = (typeof PROJECT_STATUS_VALUES)[number];
export type ProjectMemberRole = (typeof PROJECT_MEMBER_ROLE_VALUES)[number];
export type IssueStatus = (typeof ISSUE_STATUS_VALUES)[number];
export type IssuePriority = (typeof ISSUE_PRIORITY_VALUES)[number];

export const roleValidator = v.union(v.literal("admin"), v.literal("employee"));
export const projectStatusValidator = v.union(
  v.literal("active"),
  v.literal("archived"),
);
export const projectMemberRoleValidator = v.union(
  v.literal("owner"),
  v.literal("member"),
);
export const issueStatusValidator = v.union(
  v.literal("backlog"),
  v.literal("todo"),
  v.literal("in_progress"),
  v.literal("done"),
);
export const issuePriorityValidator = v.union(
  v.literal("low"),
  v.literal("medium"),
  v.literal("high"),
  v.literal("urgent"),
);

export const DEFAULT_MAX_FILE_SIZE = 25 * 1024 * 1024;
export const ALLOWED_FILE_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "png",
  "jpg",
  "jpeg",
  "txt",
] as const;

