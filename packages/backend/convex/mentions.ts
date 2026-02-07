import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { logActivity } from "./activity";
import {
  getProjectParticipantUserIds,
  requireIssueAccess,
} from "./authz";

const mentionValidator = v.object({
  id: v.id("mentions"),
  issueId: v.id("issues"),
  mentionedUserId: v.string(),
  mentionedBy: v.string(),
  mentionedName: v.string(),
  mentionedHandle: v.string(),
  createdAt: v.number(),
});

export const upsertIssueMentions = mutation({
  args: {
    issueId: v.id("issues"),
    mentionedUserIds: v.array(v.string()),
  },
  returns: v.array(mentionValidator),
  handler: async (ctx, args) => {
    const { viewer, issue } = await requireIssueAccess(ctx, args.issueId);
    const allowedUserIds = await getProjectParticipantUserIds(ctx, issue.projectId);
    const requested = new Set<string>();
    for (const userId of args.mentionedUserIds) {
      if (allowedUserIds.has(userId)) {
        requested.add(userId);
      }
    }

    const existing = await ctx.db
      .query("mentions")
      .withIndex("by_issueId_and_createdAt", (q) => q.eq("issueId", args.issueId))
      .collect();

    const existingByUserId = new Map<string, Id<"mentions">>();
    for (const mention of existing) {
      existingByUserId.set(mention.mentionedUserId, mention._id);
    }

    for (const mention of existing) {
      if (!requested.has(mention.mentionedUserId)) {
        await ctx.db.delete(mention._id);
      }
    }

    let insertedCount = 0;
    for (const userId of requested) {
      if (!existingByUserId.has(userId)) {
        await ctx.db.insert("mentions", {
          issueId: args.issueId,
          mentionedUserId: userId,
          mentionedBy: viewer.userId,
          createdAt: Date.now(),
        });
        insertedCount += 1;
      }
    }

    if (insertedCount > 0) {
      await logActivity(ctx, {
        projectId: issue.projectId,
        entityType: "issue",
        entityId: issue._id,
        action: "issue.mentions_updated",
        actorId: viewer.userId,
        payloadJson: JSON.stringify({
          mentionCount: requested.size,
        }),
      });
    }

    const updated = await ctx.db
      .query("mentions")
      .withIndex("by_issueId_and_createdAt", (q) => q.eq("issueId", args.issueId))
      .collect();
    const rows: Array<{
      id: Id<"mentions">;
      issueId: Id<"issues">;
      mentionedUserId: string;
      mentionedBy: string;
      mentionedName: string;
      mentionedHandle: string;
      createdAt: number;
    }> = [];

    for (const mention of updated) {
      const mentionedProfile = await ctx.db
        .query("profiles")
        .withIndex("by_userId", (q) => q.eq("userId", mention.mentionedUserId))
        .unique();
      rows.push({
        id: mention._id,
        issueId: mention.issueId,
        mentionedUserId: mention.mentionedUserId,
        mentionedBy: mention.mentionedBy,
        mentionedName: mentionedProfile?.name ?? "Unknown user",
        mentionedHandle: mentionedProfile?.handle ?? "unknown",
        createdAt: mention.createdAt,
      });
    }
    return rows;
  },
});

export const listIssueMentions = query({
  args: { issueId: v.id("issues") },
  returns: v.array(mentionValidator),
  handler: async (ctx, args) => {
    await requireIssueAccess(ctx, args.issueId);
    const mentions = await ctx.db
      .query("mentions")
      .withIndex("by_issueId_and_createdAt", (q) => q.eq("issueId", args.issueId))
      .collect();
    const rows: Array<{
      id: Id<"mentions">;
      issueId: Id<"issues">;
      mentionedUserId: string;
      mentionedBy: string;
      mentionedName: string;
      mentionedHandle: string;
      createdAt: number;
    }> = [];

    for (const mention of mentions) {
      const profile = await ctx.db
        .query("profiles")
        .withIndex("by_userId", (q) => q.eq("userId", mention.mentionedUserId))
        .unique();
      rows.push({
        id: mention._id,
        issueId: mention.issueId,
        mentionedUserId: mention.mentionedUserId,
        mentionedBy: mention.mentionedBy,
        mentionedName: profile?.name ?? "Unknown user",
        mentionedHandle: profile?.handle ?? "unknown",
        createdAt: mention.createdAt,
      });
    }

    rows.sort((a, b) => b.createdAt - a.createdAt);
    return rows;
  },
});

