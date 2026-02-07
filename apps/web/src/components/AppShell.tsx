"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { JSX, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

export function AppShell({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="row">
          <strong>WS OS</strong>
          <span className="muted">{title}</span>
        </div>
        <nav className="topbar-nav">
          <Link
            href="/projects"
            aria-current={pathname?.startsWith("/projects") ? "page" : undefined}
          >
            Projects
          </Link>
          <button
            className="button"
            onClick={async () => {
              await authClient.signOut();
              router.push("/");
              router.refresh();
            }}
          >
            Sign out
          </button>
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
