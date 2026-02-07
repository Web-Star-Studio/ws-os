# Project Work Management MVP Implementation Plan

## Date
2026-02-07

## Source
- PRD: `docs/plans/2026-02-07-project-work-management-mvp-prd-design.md`

## Skills Used
- `brainstorming`: to shape the implementation approach and sequence.
- `turborepo`: to keep workspace boundaries and task orchestration aligned with monorepo best practices.
- `next-best-practices`: to keep Next.js route/component strategy clean for App Router.

## 1. Delivery Strategy
### Options Considered
1. Backend-first vertical foundation (recommended)
   - Build Convex schema + API first, then web UI against stable contracts.
   - Pros: fewer front-end rewrites, clearer data constraints.
   - Cons: UI feedback arrives slightly later.
2. UI-first with mocked data
   - Build pages/components first, then wire APIs.
   - Pros: faster visual progress.
   - Cons: high rework risk for data contracts and permission logic.
3. Full vertical slice per feature (project, then issues, then mentions/docs)
   - Pros: usable increments.
   - Cons: duplicated refactors if schema evolves mid-stream.

### Recommended Path
Use a hybrid of (1) and (3):
- Phase A: lock backend contracts for projects/issues.
- Phase B/C: implement end-to-end slices on top of stable contracts.
- Keep PR slices under Greptile limits (<=100 files per PR).

## 2. Assumptions and Decisions
- Roles remain `admin` and `employee` for MVP.
- Employees can create projects/issues, but archive is admin-only (can be changed later).
- Mention notifications are in-app only for MVP.
- Comments are not in MVP unless needed for mentions; mentions can be stored from issue description updates.
- File uploads use one storage approach for both project docs and issue attachments (same provider, different entity linkage).

## 3. Cross-Workspace Architecture
- `packages/backend` (Convex): source of truth for schema, permissions, mutations, and queries.
- `packages/shared`: shared domain constants/types used by web + tests.
- `apps/web`: Next.js App Router UI for project list, project detail, issue board/list, issue detail.
- `apps/e2e`: Playwright end-to-end tests for critical user flows.

Data flow:
1. Web invokes Convex functions.
2. Convex enforces role + membership authorization.
3. Convex returns normalized domain objects for both Kanban and table views.
4. Web optimistically updates issue status in Kanban, reconciles with server state.

## 4. Workspace Plan
## 4.1 `packages/backend` (Convex)
### Goal
Implement data model and APIs for projects, documents, issues, mentions, and activity logs.

### File Plan
- Update: `packages/backend/convex/schema.ts`
- Add: `packages/backend/convex/projects.ts`
- Add: `packages/backend/convex/issues.ts`
- Add: `packages/backend/convex/documents.ts`
- Add: `packages/backend/convex/mentions.ts`
- Add: `packages/backend/convex/activity.ts`
- Add: `packages/backend/convex/authz.ts`
- Add: `packages/backend/convex/constants.ts`

### Tables
- `profiles` (app user role/profile metadata).
- `projects`
- `projectMembers`
- `projectDocuments`
- `issues`
- `issueAttachments`
- `mentions`
- `activityLogs`

### Indexes (examples)
- `projects`: `by_ownerId`, `by_status_and_updatedAt`
- `projectMembers`: `by_projectId_and_userId`, `by_userId_and_projectId`
- `projectDocuments`: `by_projectId_and_uploadedAt`
- `issues`: `by_projectId_and_status`, `by_projectId_and_updatedAt`, `by_projectId_and_dueDate`
- `issueAttachments`: `by_issueId_and_uploadedAt`
- `mentions`: `by_issueId_and_mentionedUserId`
- `activityLogs`: `by_entityType_and_entityId`, `by_projectId_and_createdAt`

### API Surface (public functions)
- Projects:
  - `createProject`, `updateProject`, `archiveProject`, `listProjects`, `getProjectById`
- Project details/docs:
  - `updateProjectDetails`, `listProjectDocuments`, `createProjectDocument`, `deleteProjectDocument`, `renameProjectDocument`
- Issues:
  - `createIssue`, `updateIssue`, `deleteIssue`, `moveIssueStatus`, `listIssuesForBoard`, `listIssuesForTable`, `getIssueById`
- Mentions/activity:
  - `upsertIssueMentions`, `listIssueMentions`, `listIssueActivity`

### Convex Rules to Enforce (from `docs/convex_rules.md`)
- Use new function syntax for all queries/mutations/actions.
- Include `args` and `returns` validators on every function.
- Use `v.null()` for no-return operations.
- Keep schema in `convex/schema.ts`.
- Prefer indexes + `withIndex`; avoid `filter` in queries.
- Use file-based API organization and function references via `api`/`internal`.
- Use strict typed IDs (`Id<"table">`) where appropriate.

### Backend Milestones
1. M1: Schema + indexes + authz helpers.
2. M2: Project CRUD + docs APIs.
3. M3: Issue CRUD + board/list queries + move status.
4. M4: Mentions + activity logs.

## 4.2 `packages/shared`
### Goal
Centralize shared contracts used by web and tests.

### File Plan
- Update: `packages/shared/src/types.ts`
- Add: `packages/shared/src/project.ts`
- Add: `packages/shared/src/issue.ts`
- Add: `packages/shared/src/permissions.ts`
- Update: `packages/shared/src/index.ts`

### Shared Contracts
- Enums/constants:
  - `Role`: `admin | employee`
  - `ProjectStatus`
  - `IssueStatus`: `backlog | todo | in_progress | done`
  - `IssuePriority`
- DTOs:
  - `ProjectSummary`, `ProjectDetail`
  - `IssueBoardItem`, `IssueTableRow`, `IssueDetail`
  - `ProjectDocumentRef`, `IssueAttachmentRef`
- Utility helpers:
  - status/order mappings for board columns and table badges.

### Shared Milestones
1. M1: baseline domain constants + types used by backend/web.
2. M2: view-model types for Kanban/table and issue detail page.

## 4.3 `apps/web` (Next.js)
### Goal
Deliver authenticated project and issue management UI with Kanban + table and issue detail page.

### Route/Feature Plan
- Add route group: `apps/web/src/app/(app)/`
- Add: `apps/web/src/app/(app)/projects/page.tsx`
- Add: `apps/web/src/app/(app)/projects/[projectId]/page.tsx`
- Add: `apps/web/src/app/(app)/projects/[projectId]/issues/[issueId]/page.tsx`

### UI Components (suggested)
- `apps/web/src/components/projects/ProjectList.tsx`
- `apps/web/src/components/projects/ProjectHeader.tsx`
- `apps/web/src/components/projects/ProjectDetailsEditor.tsx`
- `apps/web/src/components/projects/ProjectDocumentsPanel.tsx`
- `apps/web/src/components/issues/IssueCreateDialog.tsx`
- `apps/web/src/components/issues/IssueBoard.tsx`
- `apps/web/src/components/issues/IssueBoardColumn.tsx`
- `apps/web/src/components/issues/IssueTable.tsx`
- `apps/web/src/components/issues/IssueViewToggle.tsx`
- `apps/web/src/components/issues/IssueDetailForm.tsx`
- `apps/web/src/components/issues/MentionsInput.tsx`

### Web Behavior Requirements
- Project page has tabs: Overview, Documents, Issues.
- Issues tab supports Kanban and table toggle; persist view choice per project/user.
- Drag-and-drop in Kanban triggers `moveIssueStatus`.
- Issue page supports edits: title, description, assignee, priority, due date, status, attachments.
- Mentions parse `@` tokens and call mention upsert API.

### Next.js Guardrails
- Keep data fetching boundary clear (server entry + client interactive subtrees).
- Avoid unnecessary client-only routing for static shells.
- Add `loading.tsx`, `error.tsx`, `not-found.tsx` where needed for app routes.

### Web Milestones
1. M1: authenticated app shell + projects list/create/edit.
2. M2: project details + docs panel.
3. M3: issues board + table + create/edit + status movement.
4. M4: dedicated issue page + mentions + attachments.

## 4.4 `apps/e2e` (Playwright)
### Goal
Protect critical user journeys from regressions.

### File Plan
- Add: `apps/e2e/tests/projects.spec.ts`
- Add: `apps/e2e/tests/issues.spec.ts`
- Add: `apps/e2e/tests/permissions.spec.ts`
- Update: `apps/e2e/tests/home.spec.ts` (if landing/auth state changes)

### Core Scenarios
- Authenticated user can create and view a project.
- User can edit project details and upload at least one project doc.
- User can create issues in project and switch between Kanban and table.
- User can drag issue from Todo to In Progress and see persisted status.
- User can open issue detail page and set due date.
- User can mention teammate in issue and see mention persisted.
- Employee cannot perform admin-only archive action.

### E2E Milestones
1. M1: project CRUD happy path.
2. M2: issue board/list and issue detail flows.
3. M3: role/permission checks.

## 5. Sequencing and Dependencies
1. `shared` M1 + `backend` M1 (schema/contracts lock).
2. `backend` M2 + `web` M1 (project core).
3. `backend` M3 + `shared` M2 + `web` M2/M3 (issues and views).
4. `backend` M4 + `web` M4 + `e2e` M2/M3 (mentions/activity hardening).

Critical dependencies:
- Web Kanban/table implementation depends on `listIssuesForBoard` and `listIssuesForTable`.
- Issue detail depends on stable issue update mutation and mention upsert API.
- Permission E2E tests depend on backend authz helpers and role model completion.

## 6. PR Slicing Plan (Greptile-Friendly)
1. PR-1 (`backend` + `shared`): schema, constants, typed contracts, authz helpers.
2. PR-2 (`backend`): project + documents API.
3. PR-3 (`web`): projects list/detail + docs UI wiring.
4. PR-4 (`backend` + `shared`): issue + mention + activity APIs.
5. PR-5 (`web`): Kanban/table + issue detail page.
6. PR-6 (`e2e`): full regression coverage for project/issue/permissions.

Each PR target:
- <=100 changed files.
- Conventional commit messages.
- Run `bun run lint`, `bun run type-check`, and relevant `bun run test:e2e`.

## 7. Definition of Done by Workspace
- `backend`: all MVP functions implemented with validators, indexed queries, and role checks.
- `shared`: all domain constants/types consumed by backend + web.
- `web`: all MVP screens and interactions working end-to-end with Convex.
- `e2e`: critical flows covered and passing across configured browsers.

## 8. Risks and Mitigations
- Risk: authorization bugs across project membership.
  - Mitigation: centralize checks in `authz.ts`; test denied paths in e2e.
- Risk: board/table performance degradation with larger issue sets.
  - Mitigation: indexed queries + pagination strategy for table view.
- Risk: upload flow complexity.
  - Mitigation: implement project docs first, then reuse approach for issue attachments.

## 9. Immediate Next Actions
1. Finalize open product decisions from PRD section 15 (archive permissions, comments scope, upload limits).
2. Start PR-1 with schema/contracts/authz foundation.
3. Prepare seed data strategy for local testing (admin + employee + sample project/issues).
