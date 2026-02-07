export type Role = "admin" | "employee";

export type ProjectStatus = "active" | "archived";

export type ProjectSummary = {
  id: string;
  key: string;
  name: string;
  status: ProjectStatus;
  ownerId: string;
  ownerName: string;
  updatedAt: number;
};

export type ProjectDetail = ProjectSummary & {
  description: string;
  startDate: number | null;
  targetDate: number | null;
  createdAt: number;
};

export type ProjectDocumentRef = {
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

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: "Active",
  archived: "Archived",
};

