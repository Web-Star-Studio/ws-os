export type ProjectTab = "overview" | "documents" | "issues";
export type IssueView = "kanban" | "table";
export type TableSortBy = "title" | "status" | "dueDate" | "updatedAt";

export type ProjectDetailView = {
  id: string;
  key: string;
  name: string;
  description: string;
  status: "active" | "archived";
  ownerId: string;
  ownerName: string;
  startDate?: number | null;
  targetDate?: number | null;
  createdAt: number;
  updatedAt: number;
};

export type ProjectMemberView = {
  userId: string;
  handle: string;
  name: string;
  email: string;
  role: "admin" | "employee";
};

export type ProjectDocumentView = {
  id: string;
  projectId: string;
  filename: string;
  storageId: string;
  size: number;
  contentType?: string;
  uploadedBy: string;
  uploadedAt: number;
  updatedAt: number;
  fileUrl?: string | null;
};

export type IssueViewRow = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "backlog" | "todo" | "in_progress" | "done";
  priority?: "low" | "medium" | "high" | "urgent" | null;
  assigneeId?: string | null;
  dueDate?: number | null;
  createdBy: string;
  updatedBy: string;
  createdAt: number;
  updatedAt: number;
};

