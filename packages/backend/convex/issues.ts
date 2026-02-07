import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { logActivity } from "./activity";
import { getViewer, requireIssueAccess, requireProjectAccess } from "./authz";
import { issuePriorityValidator, issueStatusValidator } from "./constants";

const issueViewValidator = v.object({
  id: v.id("issues"),
  projectId: v.id("projects"),
  title: v.string(),
  description: v.string(),
  status: issueStatusValidator,
  priority: v.optional(v.union(issuePriorityValidator, v.null())),
  assigneeId: v.optional(v.union(v.string(), v.null())),
  dueDate: v.optional(v.union(v.number(), v.null())),
  createdBy: v.string(),
  updatedBy: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const createIssue = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.optional(issueStatusValidator),
    priority: v.optional(v.union(issuePriorityValidator, v.null())),
    assigneeId: v.optional(v.union(v.string(), v.null())),
    dueDate: v.optional(v.union(v.number(), v.null())),
  },
  returns: issueViewValidator,
  handler: async (ctx, args) => {
    const { viewer, project } = await requireProjectAccess(ctx, args.projectId);
    const now = Date.now();
    const issueId = await ctx.db.insert("issues", {
      projectId: args.projectId,
      title: args.title.trim(),
      description: args.description?.trim() ?? "",
      status: args.status ?? "todo",
      priority: args.priority ?? null,
      assigneeId: args.assigneeId ?? null,
      dueDate: args.dueDate ?? null,
      createdBy: viewer.userId,
      updatedBy: viewer.userId,
      createdAt: now,
      updatedAt: now,
    });

    await logActivity(ctx, {
      projectId: project._id,
      entityType: "issue",
      entityId: issueId,
      action: "issue.created",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({
        title: args.title.trim(),
        status: args.status ?? "todo",
      }),
    });

    const created = await ctx.db.get(issueId);
    if (!created) {
      throw new Error("NOT_FOUND");
    }
    return {
      id: created._id,
      projectId: created.projectId,
      title: created.title,
      description: created.description,
      status: created.status,
      priority: created.priority ?? null,
      assigneeId: created.assigneeId ?? null,
      dueDate: created.dueDate ?? null,
      createdBy: created.createdBy,
      updatedBy: created.updatedBy,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  },
});

export const updateIssue = mutation({
  args: {
    issueId: v.id("issues"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(issueStatusValidator),
    priority: v.optional(v.union(issuePriorityValidator, v.null())),
    assigneeId: v.optional(v.union(v.string(), v.null())),
    dueDate: v.optional(v.union(v.number(), v.null())),
  },
  returns: issueViewValidator,
  handler: async (ctx, args) => {
    const { viewer, issue } = await requireIssueAccess(ctx, args.issueId);
    const patch: Partial<{
      title: string;
      description: string;
      status: "backlog" | "todo" | "in_progress" | "done";
      priority: "low" | "medium" | "high" | "urgent" | null;
      assigneeId: string | null;
      dueDate: number | null;
      updatedBy: string;
      updatedAt: number;
    }> = {
      updatedBy: viewer.userId,
      updatedAt: Date.now(),
    };

    if (args.title !== undefined) {
      patch.title = args.title.trim();
    }
    if (args.description !== undefined) {
      patch.description = args.description.trim();
    }
    if (args.status !== undefined) {
      patch.status = args.status;
    }
    if (args.priority !== undefined) {
      patch.priority = args.priority;
    }
    if (args.assigneeId !== undefined) {
      patch.assigneeId = args.assigneeId;
    }
    if (args.dueDate !== undefined) {
      patch.dueDate = args.dueDate;
    }

    await ctx.db.patch(args.issueId, patch);
    const updated = await ctx.db.get(args.issueId);
    if (!updated) {
      throw new Error("NOT_FOUND");
    }

    await logActivity(ctx, {
      projectId: issue.projectId,
      entityType: "issue",
      entityId: issue._id,
      action: "issue.updated",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({
        status: updated.status,
        assigneeId: updated.assigneeId ?? null,
        dueDate: updated.dueDate ?? null,
      }),
    });

    return {
      id: updated._id,
      projectId: updated.projectId,
      title: updated.title,
      description: updated.description,
      status: updated.status,
      priority: updated.priority ?? null,
      assigneeId: updated.assigneeId ?? null,
      dueDate: updated.dueDate ?? null,
      createdBy: updated.createdBy,
      updatedBy: updated.updatedBy,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  },
});

export const deleteIssue = mutation({
  args: { issueId: v.id("issues") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { viewer, issue } = await requireIssueAccess(ctx, args.issueId);

    if (
      viewer.role !== "admin" &&
      issue.createdBy !== viewer.userId &&
      issue.assigneeId !== viewer.userId
    ) {
      throw new Error("FORBIDDEN");
    }

    const attachments = await ctx.db
      .query("issueAttachments")
      .withIndex("by_issueId_and_uploadedAt", (q) => q.eq("issueId", args.issueId))
      .collect();
    for (const attachment of attachments) {
      await ctx.storage.delete(attachment.storageId);
      await ctx.db.delete(attachment._id);
    }

    const mentions = await ctx.db
      .query("mentions")
      .withIndex("by_issueId_and_createdAt", (q) => q.eq("issueId", args.issueId))
      .collect();
    for (const mention of mentions) {
      await ctx.db.delete(mention._id);
    }

    await ctx.db.delete(args.issueId);
    await logActivity(ctx, {
      projectId: issue.projectId,
      entityType: "issue",
      entityId: issue._id,
      action: "issue.deleted",
      actorId: viewer.userId,
    });
    return null;
  },
});

export const moveIssueStatus = mutation({
  args: {
    issueId: v.id("issues"),
    status: issueStatusValidator,
  },
  returns: issueViewValidator,
  handler: async (ctx, args) => {
    const { viewer, issue } = await requireIssueAccess(ctx, args.issueId);
    await ctx.db.patch(args.issueId, {
      status: args.status,
      updatedBy: viewer.userId,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get(args.issueId);
    if (!updated) {
      throw new Error("NOT_FOUND");
    }
    await logActivity(ctx, {
      projectId: issue.projectId,
      entityType: "issue",
      entityId: issue._id,
      action: "issue.status_changed",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({
        from: issue.status,
        to: updated.status,
      }),
    });

    return {
      id: updated._id,
      projectId: updated.projectId,
      title: updated.title,
      description: updated.description,
      status: updated.status,
      priority: updated.priority ?? null,
      assigneeId: updated.assigneeId ?? null,
      dueDate: updated.dueDate ?? null,
      createdBy: updated.createdBy,
      updatedBy: updated.updatedBy,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  },
});

export const listIssuesForBoard = query({
  args: {
    projectId: v.id("projects"),
  },
  returns: v.array(issueViewValidator),
  handler: async (ctx, args) => {
    await requireProjectAccess(ctx, args.projectId);
    const statuses = ["backlog", "todo", "in_progress", "done"] as const;
    const rows: Array<{
      id: Id<"issues">;
      projectId: Id<"projects">;
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
    }> = [];

    for (const status of statuses) {
      const issues = await ctx.db
        .query("issues")
        .withIndex("by_projectId_and_status_and_updatedAt", (q) =>
          q.eq("projectId", args.projectId).eq("status", status),
        )
        .order("desc")
        .collect();

      for (const issue of issues) {
        rows.push({
          id: issue._id,
          projectId: issue.projectId,
          title: issue.title,
          description: issue.description,
          status: issue.status,
          priority: issue.priority ?? null,
          assigneeId: issue.assigneeId ?? null,
          dueDate: issue.dueDate ?? null,
          createdBy: issue.createdBy,
          updatedBy: issue.updatedBy,
          createdAt: issue.createdAt,
          updatedAt: issue.updatedAt,
        });
      }
    }
    return rows;
  },
});

export const listIssuesForTable = query({
  args: {
    projectId: v.id("projects"),
  },
  returns: v.array(issueViewValidator),
  handler: async (ctx, args) => {
    await requireProjectAccess(ctx, args.projectId);
    const issues = await ctx.db
      .query("issues")
      .withIndex("by_projectId_and_updatedAt", (q) =>
        q.eq("projectId", args.projectId),
      )
      .order("desc")
      .collect();

    return issues.map((issue) => ({
      id: issue._id,
      projectId: issue.projectId,
      title: issue.title,
      description: issue.description,
      status: issue.status,
      priority: issue.priority ?? null,
      assigneeId: issue.assigneeId ?? null,
      dueDate: issue.dueDate ?? null,
      createdBy: issue.createdBy,
      updatedBy: issue.updatedBy,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
    }));
  },
});

export const getIssueById = query({
  args: {
    issueId: v.id("issues"),
  },
  returns: v.union(issueViewValidator, v.null()),
  handler: async (ctx, args) => {
    try {
      const { issue } = await requireIssueAccess(ctx, args.issueId);
      return {
        id: issue._id,
        projectId: issue.projectId,
        title: issue.title,
        description: issue.description,
        status: issue.status,
        priority: issue.priority ?? null,
        assigneeId: issue.assigneeId ?? null,
        dueDate: issue.dueDate ?? null,
        createdBy: issue.createdBy,
        updatedBy: issue.updatedBy,
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt,
      };
    } catch {
      return null;
    }
  },
});

