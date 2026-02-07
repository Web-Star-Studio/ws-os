import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profiles: defineTable({
    userId: v.string(),
    role: v.union(v.literal("admin"), v.literal("employee")),
    handle: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.optional(v.union(v.string(), v.null())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_handle", ["handle"])
    .index("by_role", ["role"]),

  projects: defineTable({
    key: v.string(),
    name: v.string(),
    description: v.string(),
    status: v.union(v.literal("active"), v.literal("archived")),
    ownerId: v.string(),
    startDate: v.optional(v.union(v.number(), v.null())),
    targetDate: v.optional(v.union(v.number(), v.null())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_ownerId", ["ownerId"])
    .index("by_status_and_updatedAt", ["status", "updatedAt"]),

  projectMembers: defineTable({
    projectId: v.id("projects"),
    userId: v.string(),
    role: v.union(v.literal("owner"), v.literal("member")),
    createdAt: v.number(),
  })
    .index("by_projectId_and_userId", ["projectId", "userId"])
    .index("by_userId_and_projectId", ["userId", "projectId"]),

  projectDocuments: defineTable({
    projectId: v.id("projects"),
    filename: v.string(),
    storageId: v.id("_storage"),
    size: v.number(),
    contentType: v.optional(v.string()),
    uploadedBy: v.string(),
    uploadedAt: v.number(),
    updatedAt: v.number(),
  }).index("by_projectId_and_uploadedAt", ["projectId", "uploadedAt"]),

  issues: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("backlog"),
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done"),
    ),
    priority: v.optional(
      v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("urgent"),
        v.null(),
      ),
    ),
    assigneeId: v.optional(v.union(v.string(), v.null())),
    dueDate: v.optional(v.union(v.number(), v.null())),
    createdBy: v.string(),
    updatedBy: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_projectId_and_status_and_updatedAt", [
      "projectId",
      "status",
      "updatedAt",
    ])
    .index("by_projectId_and_updatedAt", ["projectId", "updatedAt"])
    .index("by_projectId_and_dueDate", ["projectId", "dueDate"])
    .index("by_projectId_and_createdAt", ["projectId", "createdAt"]),

  issueAttachments: defineTable({
    issueId: v.id("issues"),
    filename: v.string(),
    storageId: v.id("_storage"),
    size: v.number(),
    contentType: v.optional(v.string()),
    uploadedBy: v.string(),
    uploadedAt: v.number(),
  }).index("by_issueId_and_uploadedAt", ["issueId", "uploadedAt"]),

  mentions: defineTable({
    issueId: v.id("issues"),
    mentionedUserId: v.string(),
    mentionedBy: v.string(),
    createdAt: v.number(),
  })
    .index("by_issueId_and_mentionedUserId", ["issueId", "mentionedUserId"])
    .index("by_issueId_and_createdAt", ["issueId", "createdAt"]),

  activityLogs: defineTable({
    projectId: v.union(v.id("projects"), v.null()),
    entityType: v.union(v.literal("project"), v.literal("issue")),
    entityId: v.string(),
    action: v.string(),
    actorId: v.string(),
    payloadJson: v.optional(v.union(v.string(), v.null())),
    createdAt: v.number(),
  })
    .index("by_entityType_and_entityId_and_createdAt", [
      "entityType",
      "entityId",
      "createdAt",
    ])
    .index("by_projectId_and_createdAt", ["projectId", "createdAt"]),
});
