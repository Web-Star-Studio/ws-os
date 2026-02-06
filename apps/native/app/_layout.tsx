import { StrictMode } from "react";
import { Slot } from "expo-router";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";

const convex = new ConvexReactClient(
  process.env.EXPO_PUBLIC_CONVEX_URL as string,
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
