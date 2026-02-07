/**
 * Shared types used across web and native apps.
 * Add your cross-platform type definitions here.
 */

export type AppUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
};

export type ViewerProfile = AppUser & {
  role: "admin" | "employee";
  handle: string;
};
