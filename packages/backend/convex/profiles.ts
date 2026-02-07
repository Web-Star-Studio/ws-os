import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { getViewer, requireProjectAccess } from "./authz";

const profileViewValidator = v.object({
  id: v.id("profiles"),
  userId: v.string(),
  role: v.union(v.literal("admin"), v.literal("employee")),
  handle: v.string(),
  name: v.string(),
  email: v.string(),
  image: v.optional(v.union(v.string(), v.null())),
});

export const getViewerProfile = query({
  args: {},
  returns: v.union(profileViewValidator, v.null()),
  handler: async (ctx) => {
    try {
      const viewer = await getViewer(ctx);
      const profile = await ctx.db
        .query("profiles")
        .withIndex("by_userId", (q) => q.eq("userId", viewer.userId))
        .unique();
      if (!profile) {
        return null;
      }
      return {
        id: profile._id,
        userId: profile.userId,
        role: profile.role,
        handle: profile.handle,
        name: profile.name,
        email: profile.email,
        image: profile.image ?? null,
      };
    } catch {
      return null;
    }
  },
});

export const ensureViewerProfile = mutation({
  args: {},
  returns: profileViewValidator,
  handler: async (ctx) => {
    const viewer = await getViewer(ctx);
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_userId", (q) => q.eq("userId", viewer.userId))
      .unique();

    if (!profile) {
      throw new Error("PROFILE_CREATION_FAILED");
    }

    return {
      id: profile._id,
      userId: profile.userId,
      role: profile.role,
      handle: profile.handle,
      name: profile.name,
      email: profile.email,
      image: profile.image ?? null,
    };
  },
});

export const listMentionableProfiles = query({
  args: { projectId: v.id("projects") },
  returns: v.array(profileViewValidator),
  handler: async (ctx, args) => {
    await requireProjectAccess(ctx, args.projectId);
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("NOT_FOUND");
    }

    const members = await ctx.db
      .query("projectMembers")
      .withIndex("by_projectId_and_userId", (q) =>
        q.eq("projectId", args.projectId),
      )
      .collect();

    const userIds = new Set<string>([project.ownerId]);
    for (const member of members) {
      userIds.add(member.userId);
    }

    const profiles: Array<{
      id: Id<"profiles">;
      userId: string;
      role: "admin" | "employee";
      handle: string;
      name: string;
      email: string;
      image?: string | null;
    }> = [];

    for (const userId of userIds) {
      const profile = await ctx.db
        .query("profiles")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .unique();
      if (profile) {
        profiles.push({
          id: profile._id,
          userId: profile.userId,
          role: profile.role,
          handle: profile.handle,
          name: profile.name,
          email: profile.email,
          image: profile.image ?? null,
        });
      }
    }

    profiles.sort((a, b) => a.name.localeCompare(b.name));
    return profiles;
  },
});

