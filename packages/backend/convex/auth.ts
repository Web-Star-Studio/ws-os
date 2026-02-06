import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth, type BetterAuthOptions } from "better-auth/minimal";
import { v } from "convex/values";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import authConfig from "./auth.config";

export const authComponent = createClient<DataModel>(components.betterAuth);

const siteUrl = process.env.SITE_URL!;

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    trustedOrigins: [siteUrl],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [convex({ authConfig })],
  } satisfies BetterAuthOptions);
};

export const getCurrentUser = query({
  args: {},
  returns: v.union(
    v.object({
      user: v.object({
        id: v.string(),
        name: v.string(),
        email: v.string(),
        emailVerified: v.boolean(),
        image: v.optional(v.union(v.string(), v.null())),
        createdAt: v.number(),
        updatedAt: v.number(),
      }),
      session: v.object({
        id: v.string(),
        userId: v.string(),
        token: v.string(),
        expiresAt: v.number(),
        ipAddress: v.optional(v.union(v.string(), v.null())),
        userAgent: v.optional(v.union(v.string(), v.null())),
        createdAt: v.number(),
        updatedAt: v.number(),
      }),
    }),
    v.null(),
  ),
  handler: async (ctx) => {
    try {
      const authUser = await authComponent.getAuthUser(ctx);
      return {
        user: {
          id: authUser.user.id,
          name: authUser.user.name,
          email: authUser.user.email,
          emailVerified: authUser.user.emailVerified,
          image: authUser.user.image ?? null,
          createdAt: authUser.user.createdAt,
          updatedAt: authUser.user.updatedAt,
        },
        session: {
          id: authUser.session.id,
          userId: authUser.session.userId,
          token: authUser.session.token,
          expiresAt: authUser.session.expiresAt,
          ipAddress: authUser.session.ipAddress ?? null,
          userAgent: authUser.session.userAgent ?? null,
          createdAt: authUser.session.createdAt,
          updatedAt: authUser.session.updatedAt,
        },
      };
    } catch {
      return null;
    }
  },
});
