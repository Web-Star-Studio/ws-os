import { StrictMode } from "react";
import { Slot } from "expo-router";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";

const convexUrl =
  (globalThis as { process?: { env?: { EXPO_PUBLIC_CONVEX_URL?: string } } })
    .process?.env?.EXPO_PUBLIC_CONVEX_URL ?? "";

const convex = new ConvexReactClient(
  convexUrl,
  {
    unsavedChangesWarning: false,
  },
);

export default function RootLayout() {
  return (
    <StrictMode>
      <ConvexProvider client={convex}>
        <ConvexBetterAuthProvider client={convex} authClient={authClient}>
          <Slot />
        </ConvexBetterAuthProvider>
      </ConvexProvider>
    </StrictMode>
  );
}
