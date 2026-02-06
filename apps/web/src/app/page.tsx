"use client";

import { useQuery } from "convex/react";
import { api } from "@ws/backend/convex/_generated/api";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const user = useQuery(api.auth.getCurrentUser);
  const { signOut } = authClient;

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        gap: "1rem",
      }}
    >
      <h1>WS Starter</h1>
      <p>Fullstack monorepo with Next.js, Expo, Convex &amp; Better Auth</p>

      {user ? (
        <div>
          <p>Welcome, {user.user?.email ?? "User"}!</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <p style={{ fontSize: "0.875rem", color: "#666" }}>
            Set up your Convex backend and environment variables to enable
            authentication.
          </p>
        </div>
      )}
    </main>
  );
}
