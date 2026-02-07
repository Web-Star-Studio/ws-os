export type IssueStatus = "backlog" | "todo" | "in_progress" | "done";
export type IssuePriority = "low" | "medium" | "high" | "urgent";

export const ISSUE_PRIORITY_VALUES: Array<IssuePriority> = [
  "low",
  "medium",
  "high",
  "urgent",
];

export type IssueBase = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority?: IssuePriority | null;
  assigneeId?: string | null;
  dueDate?: number | null;
  createdBy: string;
  updatedBy: string;
  createdAt: number;
  updatedAt: number;
};

export type IssueBoardItem = IssueBase;
export type IssueTableRow = IssueBase;
export type IssueDetail = IssueBase;

export type IssueAttachmentRef = {
  id: string;
  issueId: string;
  filename: string;
  storageId: string;
  size: number;
  contentType?: string;
  uploadedBy: string;
  uploadedAt: number;
  fileUrl?: string | null;
};

export type Mention = {
  id: string;
  issueId: string;
  mentionedUserId: string;
  mentionedBy: string;
  mentionedName: string;
  mentionedHandle: string;
  createdAt: number;
};

export type ActivityLog = {
  id: string;
  action: string;
  actorId: string;
  actorName: string;
  payloadJson?: string | null;
  createdAt: number;
};

export const ISSUE_STATUS_ORDER: Array<IssueStatus> = [
  "backlog",
  "todo",
  "in_progress",
  "done",
];

export const ISSUE_STATUS_LABELS: Record<IssueStatus, string> = {
  backlog: "Backlog",
  todo: "Todo",
  in_progress: "In Progress",
  done: "Done",
};
