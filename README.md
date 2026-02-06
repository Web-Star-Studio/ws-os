# WS Starter

Fullstack monorepo starter for building web and native apps with a shared backend. Clone it, configure your environment, and start shipping.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Web | Next.js 16 (App Router, Turbopack) |
| Native | Expo SDK 54, React Native 0.83 |
| Backend | Convex (real-time database, server functions) |
| Auth | Better Auth + Convex component |
| Monorepo | Turborepo, bun workspaces |
| E2E Tests | Playwright |
| CI/CD | GitHub Actions, EAS Workflows |

## Project Structure

```
ws-starter/
├── apps/
│   ├── web/              # Next.js web app
│   ├── native/           # Expo mobile app
│   └── e2e/              # Playwright end-to-end tests
├── packages/
│   ├── backend/          # Convex backend (shared by both apps)
│   ├── shared/           # Shared types and utilities
│   ├── eslint-config/    # ESLint 9 flat configs
│   └── typescript-config/ # Shared TypeScript presets
└── .eas/workflows/       # Expo build & update pipelines
```

Both apps connect to the same Convex backend. UI is separate per platform — only business logic and types are shared via `@ws/shared`.

## Prerequisites

- [bun](https://bun.sh) v1.3+
- A [Convex](https://convex.dev) account (free tier available)
- For native development: [Expo CLI](https://docs.expo.dev/get-started/installation/) and either Xcode (iOS) or Android Studio (Android)

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url> my-project
cd my-project
bun install
```

### 2. Set up Convex

Create a new project on the [Convex dashboard](https://dashboard.convex.dev), then initialize the backend:

```bash
cd packages/backend
bun x convex dev
```

This will prompt you to link to your Convex project and generate the `convex/_generated/` directory (required for type-checking).

### 3. Configure environment variables

Copy the example file and fill in your Convex deployment values:

```bash
cp .env.example .env.local
```

```env
CONVEX_DEPLOYMENT=dev:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-name.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment-name.convex.site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EXPO_PUBLIC_CONVEX_URL=https://your-deployment-name.convex.cloud
EXPO_PUBLIC_CONVEX_SITE_URL=https://your-deployment-name.convex.site
```

Then set the auth secret on the Convex dashboard under **Environment Variables**:

```
BETTER_AUTH_SECRET=<run: openssl rand -base64 32>
SITE_URL=http://localhost:3000
```

### 4. Start developing

```bash
# Run everything (web + native + backend)
bun run dev

# Or run individually
bun run dev:backend    # Convex dev server
bun run dev:web        # Next.js at localhost:3000
bun run dev:native     # Expo dev server
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all dev servers in parallel |
| `bun run dev:web` | Start Next.js only |
| `bun run dev:native` | Start Expo only |
| `bun run dev:backend` | Start Convex only |
| `bun run build` | Build all packages |
| `bun run lint` | Lint all packages |
| `bun run type-check` | Type-check all packages |
| `bun run format` | Format code with Prettier |
| `bun run test:e2e` | Run Playwright E2E tests |
| `bun run test:e2e:ui` | Run Playwright with interactive UI |

## Adding to the Backend

Define your app tables in `packages/backend/convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
  }),
});
```

Create server functions alongside the schema — both apps can import them:

```typescript
import { api } from "@ws/backend/convex/_generated/api";
```

## Authentication

Better Auth is pre-configured with email/password authentication. Both apps include the auth client wired to Convex:

- **Web**: `apps/web/src/lib/auth-client.ts` — uses cookies automatically
- **Native**: `apps/native/src/lib/auth-client.ts` — uses `expo-secure-store` for token storage

Sign in/up is done via the Better Auth client:

```typescript
import { authClient } from "@/lib/auth-client";

// Sign up
await authClient.signUp.email({ email, password, name });

// Sign in
await authClient.signIn.email({ email, password });

// Sign out
await authClient.signOut();
```

Query the current user from any component:

```typescript
import { useQuery } from "convex/react";
import { api } from "@ws/backend/convex/_generated/api";

const user = useQuery(api.auth.getCurrentUser);
```

## CI/CD

### GitHub Actions

The CI workflow (`.github/workflows/ci.yml`) runs on every push and PR to `main`:

1. **Lint, Type Check & Build** — uses `--affected` to only check changed packages
2. **E2E Tests** — runs Playwright against the web app (Chromium)

### EAS Workflows

Expo builds and updates are managed via `.eas/workflows/`:

- **`build-all.yml`** — production builds for Android and iOS on push to main
- **`build-preview.yml`** — preview builds on PRs, skipped if native code hasn't changed (uses fingerprinting)
- **`update-preview.yml`** — OTA updates on PRs when only JS changed

## License

MIT
