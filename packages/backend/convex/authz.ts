import type { Id } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { authComponent } from "./auth";
import type { Role } from "./constants";

type AnyCtx = QueryCtx | MutationCtx;

function canWrite(ctx: AnyCtx): ctx is MutationCtx {
  return "insert" in ctx.db;
}

function toHandle(input: string): string {
  const normalized = input
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .replace(/^[._-]+|[._-]+$/g, "");
  return normalized.length > 0 ? normalized : "user";
}

async function makeUniqueHandle(ctx: AnyCtx, rawBase: string): Promise<string> {
  const base = toHandle(rawBase);
  let candidate = base;
  let suffix = 1;
  while (true) {
    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_handle", (q) => q.eq("handle", candidate))
      .unique();
    if (!existing) {
      return candidate;
    }
    candidate = `${base}${suffix}`;
    suffix += 1;
  }
}

function getRoleFromFirstProfile(existingCount: number): Role {
  return existingCount === 0 ? "admin" : "employee";
}

export type Viewer = {
  userId: string;
  name: string;
  email: string;
  role: Role;
  profileId: Id<"profiles"> | null;
  handle: string;
};

export async function getViewer(ctx: AnyCtx): Promise<Viewer> {
  const authUser = await authComponent.getAuthUser(ctx);
  const authUserId = authUser.userId ?? authUser._id;
  const existingProfile = await ctx.db
    .query("profiles")
    .withIndex("by_userId", (q) => q.eq("userId", authUserId))
    .unique();

  if (existingProfile) {
    return {
      userId: existingProfile.userId,
      name: existingProfile.name,
      email: existingProfile.email,
      role: existingProfile.role,
      profileId: existingProfile._id,
      handle: existingProfile.handle,
    };
  }

  const hasAnyProfile = await ctx.db.query("profiles").take(1);
  const role = getRoleFromFirstProfile(hasAnyProfile.length);
  const rawBase = authUser.email.split("@")[0] ?? authUser.name;
  const handle = await makeUniqueHandle(ctx, rawBase);

  if (canWrite(ctx)) {
    const now = Date.now();
    const profileId = await ctx.db.insert("profiles", {
      userId: authUserId,
      role,
      handle,
      name: authUser.name,
      email: authUser.email,
      image: authUser.image ?? null,
      createdAt: now,
      updatedAt: now,
    });
    return {
      userId: authUserId,
      name: authUser.name,
      email: authUser.email,
      role,
      profileId,
      handle,
    };
  }

  return {
    userId: authUserId,
    name: authUser.name,
    email: authUser.email,
    role,
    profileId: null,
    handle,
  };
}

export function assertAdmin(viewer: Viewer): void {
  if (viewer.role !== "admin") {
    throw new Error("FORBIDDEN");
  }
}

export async function requireProjectAccess(
  ctx: AnyCtx,
  projectId: Id<"projects">,
): Promise<{
  viewer: Viewer;
  project: {
    _id: Id<"projects">;
    ownerId: string;
    status: "active" | "archived";
  };
}> {
  const viewer = await getViewer(ctx);
  const project = await ctx.db.get(projectId);
  if (!project) {
    throw new Error("NOT_FOUND");
  }

  if (viewer.role === "admin" || project.ownerId === viewer.userId) {
    return {
      viewer,
      project: {
        _id: project._id,
        ownerId: project.ownerId,
        status: project.status,
      },
    };
  }

  const membership = await ctx.db
    .query("projectMembers")
    .withIndex("by_projectId_and_userId", (q) =>
      q.eq("projectId", projectId).eq("userId", viewer.userId),
    )
    .unique();

  if (!membership) {
    throw new Error("FORBIDDEN");
  }

  return {
    viewer,
    project: {
      _id: project._id,
      ownerId: project.ownerId,
      status: project.status,
    },
  };
}

export async function requireIssueAccess(
  ctx: AnyCtx,
  issueId: Id<"issues">,
): Promise<{
  viewer: Viewer;
  issue: {
    _id: Id<"issues">;
    projectId: Id<"projects">;
    createdBy: string;
    assigneeId: string | null | undefined;
    status: "backlog" | "todo" | "in_progress" | "done";
    title: string;
    description: string;
    dueDate: number | null | undefined;
    priority: "low" | "medium" | "high" | "urgent" | null | undefined;
    updatedAt: number;
    createdAt: number;
    updatedBy: string;
  };
}> {
  const issue = await ctx.db.get(issueId);
  if (!issue) {
    throw new Error("NOT_FOUND");
  }
  const { viewer } = await requireProjectAccess(ctx, issue.projectId);
  return {
    viewer,
    issue: {
      _id: issue._id,
      projectId: issue.projectId,
      createdBy: issue.createdBy,
      assigneeId: issue.assigneeId,
      status: issue.status,
      title: issue.title,
      description: issue.description,
      dueDate: issue.dueDate,
      priority: issue.priority,
      updatedAt: issue.updatedAt,
      createdAt: issue.createdAt,
      updatedBy: issue.updatedBy,
    },
  };
}

export async function getProjectParticipantUserIds(
  ctx: AnyCtx,
  projectId: Id<"projects">,
): Promise<Set<string>> {
  const project = await ctx.db.get(projectId);
  if (!project) {
    throw new Error("NOT_FOUND");
  }
  const members = await ctx.db
    .query("projectMembers")
    .withIndex("by_projectId_and_userId", (q) => q.eq("projectId", projectId))
    .collect();

  const ids = new Set<string>([project.ownerId]);
  for (const member of members) {
    ids.add(member.userId);
  }
  return ids;
}
