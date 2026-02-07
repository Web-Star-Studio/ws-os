"use client";

import { useMutation, useQuery } from "convex/react";
import type { Id } from "@ws/backend/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useEffect, type JSX, useState } from "react";
import { api } from "@ws/backend/convex/_generated/api";
import { AppShell } from "@/components/AppShell";
import { ProjectDocumentsTab } from "@/components/projects/ProjectDocumentsTab";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectIssuesTab } from "@/components/projects/ProjectIssuesTab";
import { ProjectMembersCard } from "@/components/projects/ProjectMembersCard";
import { ProjectOverviewTab } from "@/components/projects/ProjectOverviewTab";
import type { ProjectTab } from "@/components/projects/project-types";
import { authClient } from "@/lib/auth-client";

type Feedback =
  | {
      kind: "success" | "error";
      text: string;
    }
  | null;

export default function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}): JSX.Element {
  const router = useRouter();
  const projectId = params.projectId as Id<"projects">;
  const { data: session, isPending } = authClient.useSession();
  const ensureProfile = useMutation(api.profiles.ensureViewerProfile);
  const project = useQuery(
    api.projects.getProjectById,
    session ? { projectId } : "skip",
  );
  const members = useQuery(
    api.projects.listProjectMembers,
    session ? { projectId } : "skip",
  );
  const viewerProfile = useQuery(
    api.profiles.getViewerProfile,
    session ? {} : "skip",
  );
  const documents = useQuery(
    api.documents.listProjectDocuments,
    session ? { projectId } : "skip",
  );
  const boardIssues = useQuery(
    api.issues.listIssuesForBoard,
    session ? { projectId } : "skip",
  );
  const tableIssues = useQuery(
    api.issues.listIssuesForTable,
    session ? { projectId } : "skip",
  );

  const updateProjectDetails = useMutation(api.projects.updateProjectDetails);
  const archiveProject = useMutation(api.projects.archiveProject);
  const createIssue = useMutation(api.issues.createIssue);
  const moveIssueStatus = useMutation(api.issues.moveIssueStatus);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const createProjectDocument = useMutation(api.documents.createProjectDocument);
  const renameProjectDocument = useMutation(api.documents.renameProjectDocument);
  const deleteProjectDocument = useMutation(api.documents.deleteProjectDocument);

  const [tab, setTab] = useState<ProjectTab>("overview");
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
      return;
    }
    if (session) {
      void ensureProfile({});
    }
  }, [ensureProfile, isPending, router, session]);

  function setSuccess(text: string): void {
    setFeedback({ kind: "success", text });
  }

  function setError(error: unknown, fallback: string): void {
    setFeedback({
      kind: "error",
      text: error instanceof Error ? error.message : fallback,
    });
  }

  async function handleArchiveProject(): Promise<void> {
    try {
      await archiveProject({ projectId });
      setSuccess("Project archived.");
    } catch (error) {
      setError(error, "Could not archive project.");
    }
  }

  async function handleSaveOverview(description: string): Promise<void> {
    try {
      await updateProjectDetails({ projectId, description });
      setSuccess("Project details saved.");
    } catch (error) {
      setError(error, "Save failed.");
    }
  }

  async function handleUploadProjectDocument(file: File): Promise<void> {
    try {
      const uploadUrl = await generateUploadUrl({});
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file,
      });
      if (!uploadResponse.ok) {
        throw new Error("File upload failed.");
      }
      const uploadResult = (await uploadResponse.json()) as {
        storageId: Id<"_storage">;
      };
      await createProjectDocument({
        projectId,
        filename: file.name,
        storageId: uploadResult.storageId,
        size: file.size,
        contentType: file.type,
      });
      setSuccess("Document uploaded.");
    } catch (error) {
      setError(error, "Upload failed.");
    }
  }

  async function handleRenameDocument(
    documentId: string,
    filename: string,
  ): Promise<void> {
    try {
      await renameProjectDocument({
        documentId: documentId as Id<"projectDocuments">,
        filename,
      });
      setSuccess("Document renamed.");
    } catch (error) {
      setError(error, "Rename failed.");
    }
  }

  async function handleDeleteDocument(documentId: string): Promise<void> {
    try {
      await deleteProjectDocument({
        documentId: documentId as Id<"projectDocuments">,
      });
      setSuccess("Document deleted.");
    } catch (error) {
      setError(error, "Delete failed.");
    }
  }

  async function handleCreateIssue(args: {
    title: string;
    description: string;
    dueDate: number | null;
  }): Promise<void> {
    try {
      await createIssue({
        projectId,
        title: args.title,
        description: args.description,
        dueDate: args.dueDate,
      });
      setSuccess("Issue created.");
    } catch (error) {
      setError(error, "Issue not created.");
    }
  }

  async function handleMoveIssueStatus(
    issueId: string,
    status: "backlog" | "todo" | "in_progress" | "done",
  ): Promise<void> {
    try {
      await moveIssueStatus({
        issueId: issueId as Id<"issues">,
        status,
      });
      setSuccess("Issue moved.");
    } catch (error) {
      setError(error, "Move failed.");
    }
  }

  if (isPending || !session) {
    return (
      <main className="container">
        <p>Loading project...</p>
      </main>
    );
  }

  if (project === null) {
    return (
      <AppShell title="Project">
        <section className="card stack">
          <h1>Project not found</h1>
          <p className="muted">You may not have access to this project.</p>
        </section>
      </AppShell>
    );
  }

  if (!project) {
    return (
      <AppShell title="Project">
        <section className="card">
          <p>Loading project...</p>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell title={`${project.key} · ${project.name}`}>
      <section className="card stack">
        <ProjectHeader
          project={project}
          viewerRole={viewerProfile?.role}
          tab={tab}
          onTabChange={setTab}
          onArchive={handleArchiveProject}
        />

        {feedback ? (
          <p className={feedback.kind === "success" ? "success" : "error"}>
            {feedback.text}
          </p>
        ) : null}

        {tab === "overview" ? (
          <ProjectOverviewTab
            description={project.description}
            onSave={handleSaveOverview}
          />
        ) : null}

        {tab === "documents" ? (
          <ProjectDocumentsTab
            documents={documents}
            onUpload={handleUploadProjectDocument}
            onRename={handleRenameDocument}
            onDelete={handleDeleteDocument}
          />
        ) : null}

        {tab === "issues" ? (
          <ProjectIssuesTab
            projectId={project.id}
            boardIssues={boardIssues}
            tableIssues={tableIssues}
            onCreateIssue={handleCreateIssue}
            onMoveIssueStatus={handleMoveIssueStatus}
          />
        ) : null}
      </section>

      <ProjectMembersCard members={members} />
    </AppShell>
  );
}

