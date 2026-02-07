import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { logActivity } from "./activity";
import {
  getViewer,
  requireIssueAccess,
  requireProjectAccess,
} from "./authz";

const projectDocumentValidator = v.object({
  id: v.id("projectDocuments"),
  projectId: v.id("projects"),
  filename: v.string(),
  storageId: v.id("_storage"),
  size: v.number(),
  contentType: v.optional(v.string()),
  uploadedBy: v.string(),
  uploadedAt: v.number(),
  updatedAt: v.number(),
  fileUrl: v.optional(v.union(v.string(), v.null())),
});

const issueAttachmentValidator = v.object({
  id: v.id("issueAttachments"),
  issueId: v.id("issues"),
  filename: v.string(),
  storageId: v.id("_storage"),
  size: v.number(),
  contentType: v.optional(v.string()),
  uploadedBy: v.string(),
  uploadedAt: v.number(),
  fileUrl: v.optional(v.union(v.string(), v.null())),
});

export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    await getViewer(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const createProjectDocument = mutation({
  args: {
    projectId: v.id("projects"),
    filename: v.string(),
    storageId: v.id("_storage"),
    size: v.number(),
    contentType: v.optional(v.string()),
  },
  returns: projectDocumentValidator,
  handler: async (ctx, args) => {
    const { viewer, project } = await requireProjectAccess(ctx, args.projectId);
    const now = Date.now();

    const id = await ctx.db.insert("projectDocuments", {
      projectId: args.projectId,
      filename: args.filename,
      storageId: args.storageId,
      size: args.size,
      contentType: args.contentType,
      uploadedBy: viewer.userId,
      uploadedAt: now,
      updatedAt: now,
    });

    await logActivity(ctx, {
      projectId: project._id,
      entityType: "project",
      entityId: project._id,
      action: "project.document_added",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({ filename: args.filename, size: args.size }),
    });

    return {
      id,
      projectId: args.projectId,
      filename: args.filename,
      storageId: args.storageId,
      size: args.size,
      contentType: args.contentType,
      uploadedBy: viewer.userId,
      uploadedAt: now,
      updatedAt: now,
      fileUrl: await ctx.storage.getUrl(args.storageId),
    };
  },
});

export const listProjectDocuments = query({
  args: { projectId: v.id("projects") },
  returns: v.array(projectDocumentValidator),
  handler: async (ctx, args) => {
    await requireProjectAccess(ctx, args.projectId);
    const docs = await ctx.db
      .query("projectDocuments")
      .withIndex("by_projectId_and_uploadedAt", (q) =>
        q.eq("projectId", args.projectId),
      )
      .order("desc")
      .collect();

    const rows: Array<{
      id: Id<"projectDocuments">;
      projectId: Id<"projects">;
      filename: string;
      storageId: Id<"_storage">;
      size: number;
      contentType?: string;
      uploadedBy: string;
      uploadedAt: number;
      updatedAt: number;
      fileUrl?: string | null;
    }> = [];
    for (const doc of docs) {
      rows.push({
        id: doc._id,
        projectId: doc.projectId,
        filename: doc.filename,
        storageId: doc.storageId,
        size: doc.size,
        contentType: doc.contentType,
        uploadedBy: doc.uploadedBy,
        uploadedAt: doc.uploadedAt,
        updatedAt: doc.updatedAt,
        fileUrl: await ctx.storage.getUrl(doc.storageId),
      });
    }
    return rows;
  },
});

export const renameProjectDocument = mutation({
  args: {
    documentId: v.id("projectDocuments"),
    filename: v.string(),
  },
  returns: projectDocumentValidator,
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("NOT_FOUND");
    }
    const { viewer, project } = await requireProjectAccess(ctx, document.projectId);
    const now = Date.now();
    await ctx.db.patch(args.documentId, {
      filename: args.filename,
      updatedAt: now,
    });
    const updated = await ctx.db.get(args.documentId);
    if (!updated) {
      throw new Error("NOT_FOUND");
    }
    await logActivity(ctx, {
      projectId: project._id,
      entityType: "project",
      entityId: project._id,
      action: "project.document_renamed",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({ filename: args.filename }),
    });
    return {
      id: updated._id,
      projectId: updated.projectId,
      filename: updated.filename,
      storageId: updated.storageId,
      size: updated.size,
      contentType: updated.contentType,
      uploadedBy: updated.uploadedBy,
      uploadedAt: updated.uploadedAt,
      updatedAt: updated.updatedAt,
      fileUrl: await ctx.storage.getUrl(updated.storageId),
    };
  },
});

export const deleteProjectDocument = mutation({
  args: {
    documentId: v.id("projectDocuments"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("NOT_FOUND");
    }
    const { viewer, project } = await requireProjectAccess(ctx, document.projectId);
    await ctx.storage.delete(document.storageId);
    await ctx.db.delete(args.documentId);
    await logActivity(ctx, {
      projectId: project._id,
      entityType: "project",
      entityId: project._id,
      action: "project.document_deleted",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({ filename: document.filename }),
    });
    return null;
  },
});

export const createIssueAttachment = mutation({
  args: {
    issueId: v.id("issues"),
    filename: v.string(),
    storageId: v.id("_storage"),
    size: v.number(),
    contentType: v.optional(v.string()),
  },
  returns: issueAttachmentValidator,
  handler: async (ctx, args) => {
    const { viewer, issue } = await requireIssueAccess(ctx, args.issueId);
    const now = Date.now();
    const id = await ctx.db.insert("issueAttachments", {
      issueId: args.issueId,
      filename: args.filename,
      storageId: args.storageId,
      size: args.size,
      contentType: args.contentType,
      uploadedBy: viewer.userId,
      uploadedAt: now,
    });

    await logActivity(ctx, {
      projectId: issue.projectId,
      entityType: "issue",
      entityId: issue._id,
      action: "issue.attachment_added",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({ filename: args.filename, size: args.size }),
    });

    return {
      id,
      issueId: args.issueId,
      filename: args.filename,
      storageId: args.storageId,
      size: args.size,
      contentType: args.contentType,
      uploadedBy: viewer.userId,
      uploadedAt: now,
      fileUrl: await ctx.storage.getUrl(args.storageId),
    };
  },
});

export const listIssueAttachments = query({
  args: { issueId: v.id("issues") },
  returns: v.array(issueAttachmentValidator),
  handler: async (ctx, args) => {
    await requireIssueAccess(ctx, args.issueId);
    const attachments = await ctx.db
      .query("issueAttachments")
      .withIndex("by_issueId_and_uploadedAt", (q) => q.eq("issueId", args.issueId))
      .order("desc")
      .collect();

    const rows: Array<{
      id: Id<"issueAttachments">;
      issueId: Id<"issues">;
      filename: string;
      storageId: Id<"_storage">;
      size: number;
      contentType?: string;
      uploadedBy: string;
      uploadedAt: number;
      fileUrl?: string | null;
    }> = [];
    for (const attachment of attachments) {
      rows.push({
        id: attachment._id,
        issueId: attachment.issueId,
        filename: attachment.filename,
        storageId: attachment.storageId,
        size: attachment.size,
        contentType: attachment.contentType,
        uploadedBy: attachment.uploadedBy,
        uploadedAt: attachment.uploadedAt,
        fileUrl: await ctx.storage.getUrl(attachment.storageId),
      });
    }
    return rows;
  },
});

export const deleteIssueAttachment = mutation({
  args: { attachmentId: v.id("issueAttachments") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const attachment = await ctx.db.get(args.attachmentId);
    if (!attachment) {
      throw new Error("NOT_FOUND");
    }

    const { viewer, issue } = await requireIssueAccess(ctx, attachment.issueId);
    await ctx.storage.delete(attachment.storageId);
    await ctx.db.delete(attachment._id);
    await logActivity(ctx, {
      projectId: issue.projectId,
      entityType: "issue",
      entityId: issue._id,
      action: "issue.attachment_deleted",
      actorId: viewer.userId,
      payloadJson: JSON.stringify({ filename: attachment.filename }),
    });
    return null;
  },
});

