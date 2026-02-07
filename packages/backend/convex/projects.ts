import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { logActivity } from "./activity";
import { assertAdmin, getViewer, requireProjectAccess } from "./authz";
import { projectStatusValidator } from "./constants";

const projectSummaryValidator = v.object({
  id: v.id("projects"),
  key: v.string(),
  name: v.string(),
  status: projectStatusValidator,
  ownerId: v.string(),
  ownerName: v.string(),
  updatedAt: v.number(),
});

const projectDetailValidator = v.object({
  id: v.id("projects"),
  key: v.string(),
  name: v.string(),
  description: v.string(),
  status: projectStatusValidator,
  ownerId: v.string(),
  ownerName: v.string(),
  startDate: v.optional(v.union(v.number(), v.null())),
  targetDate: v.optional(v.union(v.number(), v.null())),
  createdAt: v.number(),
  updatedAt: v.number(),
});

function normalizeProjectKey(rawKey: string): string {
  const cleaned = rawKey
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, "")
    .slice(0, 12);
  return cleaned.length > 0 ? cleaned : "PROJECT";
}

async function loadOwnerName(
  ctx: { db: QueryCtx["db"] | MutationCtx["db"] },
  ownerId: string,
): Promise<string> {
  const profile = await ctx.db
    .query("profiles")
    .withIndex("by_userId", (q) => q.eq("userId", ownerId))
    .unique();
  return profile?.name ?? "Unknown owner";
}

export const createProject = mutation({
  args: {
    name: v.string(),
    key: v.string(),
    description: v.optional(v.string()),
    startDate: v.optional(v.union(v.number(), v.null())),
    targetDate: v.optional(v.union(v.number(), v.null())),
  },
  returns: projectDetailValidator,
  handler: async (ctx, args) => {
    const viewer = await getViewer(ctx);
    const now = Date.now();
    const key = normalizeProjectKey(args.key);

    const projectId = await ctx.db.insert("projects", {
      key,
      name: args.name.trim(),
      description: args.description?.trim() ?? "",
      status: "active",
      ownerId: viewer.userId,
      startDate: args.startDate ?? null,
      targetDate: args.targetDate ?? null,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("projectMembers", {
      projectId,
      userId: viewer.userId,
      role: "owner",
      createdAt: now,
    });

    await logActivity(ctx, {
      projectId,
      entityType: "project",
      entityId: projectId,
      action: "project.created",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({ name: args.name.trim(), key }),
    });

    const ownerName = await loadOwnerName(ctx, viewer.userId);

    return {
      id: projectId,
      key,
      name: args.name.trim(),
      description: args.description?.trim() ?? "",
      status: "active" as const,
      ownerId: viewer.userId,
      ownerName,
      startDate: args.startDate ?? null,
      targetDate: args.targetDate ?? null,
      createdAt: now,
      updatedAt: now,
    };
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    key: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(projectStatusValidator),
    startDate: v.optional(v.union(v.number(), v.null())),
    targetDate: v.optional(v.union(v.number(), v.null())),
  },
  returns: projectDetailValidator,
  handler: async (ctx, args) => {
    const { viewer, project } = await requireProjectAccess(ctx, args.projectId);
    if (viewer.role !== "admin" && project.ownerId !== viewer.userId) {
      throw new Error("FORBIDDEN");
    }

    const current = await ctx.db.get(args.projectId);
    if (!current) {
      throw new Error("NOT_FOUND");
    }

    const patch: Partial<typeof current> = {
      updatedAt: Date.now(),
    };
    if (args.name !== undefined) {
      patch.name = args.name.trim();
    }
    if (args.key !== undefined) {
      patch.key = normalizeProjectKey(args.key);
    }
    if (args.description !== undefined) {
      patch.description = args.description.trim();
    }
    if (args.status !== undefined) {
      patch.status = args.status;
    }
    if (args.startDate !== undefined) {
      patch.startDate = args.startDate;
    }
    if (args.targetDate !== undefined) {
      patch.targetDate = args.targetDate;
    }

    await ctx.db.patch(args.projectId, patch);
    const updated = await ctx.db.get(args.projectId);
    if (!updated) {
      throw new Error("NOT_FOUND");
    }

    await logActivity(ctx, {
      projectId: updated._id,
      entityType: "project",
      entityId: updated._id,
      action: "project.updated",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({
        name: updated.name,
        key: updated.key,
        status: updated.status,
      }),
    });

    const ownerName = await loadOwnerName(ctx, updated.ownerId);
    return {
      id: updated._id,
      key: updated.key,
      name: updated.name,
      description: updated.description,
      status: updated.status,
      ownerId: updated.ownerId,
      ownerName,
      startDate: updated.startDate ?? null,
      targetDate: updated.targetDate ?? null,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  },
});

export const updateProjectDetails = mutation({
  args: {
    projectId: v.id("projects"),
    description: v.string(),
  },
  returns: projectDetailValidator,
  handler: async (ctx, args) => {
    const { viewer, project } = await requireProjectAccess(ctx, args.projectId);
    if (viewer.role !== "admin" && project.ownerId !== viewer.userId) {
      throw new Error("FORBIDDEN");
    }
    const now = Date.now();
    await ctx.db.patch(args.projectId, {
      description: args.description.trim(),
      updatedAt: now,
    });
    const updated = await ctx.db.get(args.projectId);
    if (!updated) {
      throw new Error("NOT_FOUND");
    }
    await logActivity(ctx, {
      projectId: updated._id,
      entityType: "project",
      entityId: updated._id,
      action: "project.details_updated",
      actorId: viewer.userId,
    });
    const ownerName = await loadOwnerName(ctx, updated.ownerId);
    return {
      id: updated._id,
      key: updated.key,
      name: updated.name,
      description: updated.description,
      status: updated.status,
      ownerId: updated.ownerId,
      ownerName,
      startDate: updated.startDate ?? null,
      targetDate: updated.targetDate ?? null,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  },
});

export const archiveProject = mutation({
  args: { projectId: v.id("projects") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const viewer = await getViewer(ctx);
    assertAdmin(viewer);

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("NOT_FOUND");
    }

    await ctx.db.patch(args.projectId, {
      status: "archived",
      updatedAt: Date.now(),
    });

    await logActivity(ctx, {
      projectId: args.projectId,
      entityType: "project",
      entityId: args.projectId,
      action: "project.archived",
      actorId: viewer.userId,
    });
    return null;
  },
});

export const listProjects = query({
  args: {
    includeArchived: v.optional(v.boolean()),
  },
  returns: v.array(projectSummaryValidator),
  handler: async (ctx, args) => {
    const viewer = await getViewer(ctx);
    const includeArchived = args.includeArchived ?? false;
    const allByViewer: Array<{
      _id: Id<"projects">;
      key: string;
      name: string;
      status: "active" | "archived";
      ownerId: string;
      updatedAt: number;
    }> = [];

    if (viewer.role === "admin") {
      const active = await ctx.db
        .query("projects")
        .withIndex("by_status_and_updatedAt", (q) => q.eq("status", "active"))
        .order("desc")
        .collect();
      allByViewer.push(...active);

      if (includeArchived) {
        const archived = await ctx.db
          .query("projects")
          .withIndex("by_status_and_updatedAt", (q) => q.eq("status", "archived"))
          .order("desc")
          .collect();
        allByViewer.push(...archived);
      }
    } else {
      const owned = await ctx.db
        .query("projects")
        .withIndex("by_ownerId", (q) => q.eq("ownerId", viewer.userId))
        .collect();
      allByViewer.push(...owned);

      const memberships = await ctx.db
        .query("projectMembers")
        .withIndex("by_userId_and_projectId", (q) => q.eq("userId", viewer.userId))
        .collect();
      for (const membership of memberships) {
        const project = await ctx.db.get(membership.projectId);
        if (project) {
          allByViewer.push(project);
        }
      }
    }

    const unique = new Map<Id<"projects">, (typeof allByViewer)[number]>();
    for (const project of allByViewer) {
      if (!includeArchived && project.status === "archived") {
        continue;
      }
      unique.set(project._id, project);
    }

    const rows: Array<{
      id: Id<"projects">;
      key: string;
      name: string;
      status: "active" | "archived";
      ownerId: string;
      ownerName: string;
      updatedAt: number;
    }> = [];

    for (const project of unique.values()) {
      const ownerName = await loadOwnerName(ctx, project.ownerId);
      rows.push({
        id: project._id,
        key: project.key,
        name: project.name,
        status: project.status,
        ownerId: project.ownerId,
        ownerName,
        updatedAt: project.updatedAt,
      });
    }

    rows.sort((a, b) => b.updatedAt - a.updatedAt);
    return rows;
  },
});

export const getProjectById = query({
  args: {
    projectId: v.id("projects"),
  },
  returns: v.union(projectDetailValidator, v.null()),
  handler: async (ctx, args) => {
    try {
      const { project } = await requireProjectAccess(ctx, args.projectId);
      const full = await ctx.db.get(project._id);
      if (!full) {
        return null;
      }
      const ownerName = await loadOwnerName(ctx, full.ownerId);
      return {
        id: full._id,
        key: full.key,
        name: full.name,
        description: full.description,
        status: full.status,
        ownerId: full.ownerId,
        ownerName,
        startDate: full.startDate ?? null,
        targetDate: full.targetDate ?? null,
        createdAt: full.createdAt,
        updatedAt: full.updatedAt,
      };
    } catch {
      return null;
    }
  },
});

export const listProjectMembers = query({
  args: { projectId: v.id("projects") },
  returns: v.array(
    v.object({
      userId: v.string(),
      handle: v.string(),
      name: v.string(),
      email: v.string(),
      role: v.union(v.literal("admin"), v.literal("employee")),
    }),
  ),
  handler: async (ctx, args) => {
    await requireProjectAccess(ctx, args.projectId);
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("NOT_FOUND");
    }

    const members = await ctx.db
      .query("projectMembers")
      .withIndex("by_projectId_and_userId", (q) => q.eq("projectId", args.projectId))
      .collect();
    const userIds = new Set<string>([project.ownerId]);
    for (const member of members) {
      userIds.add(member.userId);
    }

    const rows: Array<{
      userId: string;
      handle: string;
      name: string;
      email: string;
      role: "admin" | "employee";
    }> = [];
    for (const userId of userIds) {
      const profile = await ctx.db
        .query("profiles")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .unique();
      if (!profile) {
        continue;
      }
      rows.push({
        userId: profile.userId,
        handle: profile.handle,
        name: profile.name,
        email: profile.email,
        role: profile.role,
      });
    }

    rows.sort((a, b) => a.name.localeCompare(b.name));
    return rows;
  },
});
