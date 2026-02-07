import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { requireIssueAccess } from "./authz";

export async function logActivity(
  ctx: MutationCtx,
  args: {
    projectId: Id<"projects"> | null;
    entityType: "project" | "issue";
    entityId: string;
    action: string;
    actorId: string;
    payloadJson?: string | null;
  },
): Promise<void> {
  await ctx.db.insert("activityLogs", {
    projectId: args.projectId,
    entityType: args.entityType,
    entityId: args.entityId,
    action: args.action,
    actorId: args.actorId,
    payloadJson: args.payloadJson ?? null,
    createdAt: Date.now(),
  });
}

export const listIssueActivity = query({
  args: { issueId: v.id("issues") },
  returns: v.array(
    v.object({
      id: v.id("activityLogs"),
      action: v.string(),
      actorId: v.string(),
      actorName: v.string(),
      payloadJson: v.optional(v.union(v.string(), v.null())),
      createdAt: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    const { issue } = await requireIssueAccess(ctx, args.issueId);
    const logs = await ctx.db
      .query("activityLogs")
      .withIndex("by_entityType_and_entityId_and_createdAt", (q) =>
        q.eq("entityType", "issue").eq("entityId", issue._id),
      )
      .order("desc")
      .collect();

    const rows: Array<{
      id: Id<"activityLogs">;
      action: string;
      actorId: string;
      actorName: string;
      payloadJson?: string | null;
      createdAt: number;
    }> = [];

    for (const log of logs) {
      const profile = await ctx.db
        .query("profiles")
        .withIndex("by_userId", (q) => q.eq("userId", log.actorId))
        .unique();
      rows.push({
        id: log._id,
        action: log.action,
        actorId: log.actorId,
        actorName: profile?.name ?? "Unknown user",
        payloadJson: log.payloadJson ?? null,
        createdAt: log.createdAt,
      });
    }
    return rows;
  },
});

