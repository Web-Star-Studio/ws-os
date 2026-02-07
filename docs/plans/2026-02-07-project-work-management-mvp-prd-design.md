# Product Requirements Document (PRD)

## Product
Project Work Management MVP

## Date
2026-02-07

## Status
Draft (MVP scope)

## Owner
Product + Engineering

## 1. Overview
Build an internal project work management system where employees and admins can:
- Create and manage projects.
- Maintain a project space with project details and related documents.
- Create and track issues/tasks inside projects.
- View issues in Kanban and table/list modes.
- Open each issue on a dedicated page to edit details, mention users, attach files, and set due dates.

The MVP should deliver a usable baseline comparable to a simplified Linear-style workflow for team collaboration.

## 2. Problem Statement
Teams currently lack one clear workspace where project context and execution are connected. Project details and files are fragmented, and issue tracking is inconsistent. This causes:
- Poor visibility into work status.
- Weak accountability for owners and due dates.
- Slower collaboration and handoffs between employees and admins.

## 3. Goals and Non-Goals
### Goals
- Centralize project context (details + docs) and issue execution in one product.
- Enable fast issue creation and tracking by status.
- Support day-to-day planning via Kanban and table/list views.
- Provide an issue detail page that supports collaboration (mentions) and delivery management (due dates).

### Non-Goals (MVP)
- Advanced workflow automation (custom rules, triggers, SLA engines).
- Time tracking, invoicing, or budgeting modules.
- Full external client portal.
- Deep reporting/BI dashboards (basic metrics only).

## 4. Personas
### Admin
- Can create/manage projects and issues across the organization.
- Oversees progress, priorities, and delivery dates.
- Needs fast status visibility and control.

### Employee
- Can create/manage assigned or team-relevant projects and issues.
- Maintains project documentation and issue updates.
- Needs a focused workspace to execute daily tasks.

## 5. MVP Scope
### Epic A: Projects
- Create project with required fields: name, key, owner.
- Edit project metadata: description, status, start date, target date.
- Archive project.
- Project listing page with search and filters.

### Epic B: Project Space (Details + Documents)
- Project overview tab with rich-text details.
- Documents area for uploading and managing files related to the project.
- Basic document actions: upload, download, rename, delete.
- Show document metadata: uploader, upload date, size.

### Epic C: Issues in Project (Linear-style basics)
- Create issue inside a project.
- Required issue fields: title, status.
- Optional issue fields: description, assignee, priority, due date, attachments.
- Issue statuses (MVP default): Backlog, Todo, In Progress, Done.
- Edit, move status, and delete issues.

### Epic D: Dual Views for Issues
- Kanban board view grouped by status with drag-and-drop status changes.
- Table/list view with sortable columns (title, status, assignee, due date, priority, updated at).
- Persist user’s last selected view per project.

### Epic E: Dedicated Issue Page
- Open any issue to a full detail page.
- Edit all issue fields.
- Mention users using `@name` in description/comments.
- Add/remove attachments.
- Set/update/remove due date.

## 6. User Stories
1. As an admin, I can create a new project so the team has a shared execution space.
2. As an employee, I can add project documents so information is not scattered.
3. As an employee, I can create issues under a project so work items are trackable.
4. As an admin, I can switch between Kanban and table views depending on planning needs.
5. As an employee, I can open an issue page and update due date, assignee, and details.
6. As a user, I can mention teammates in issue content so collaboration is explicit.

## 7. Functional Requirements
### FR-1 Authentication and Access
- System must require authenticated users.
- Users must have role: `admin` or `employee`.

### FR-2 Project CRUD
- Users with allowed permissions can create, view, edit, and archive projects.
- Project must include unique identifier and owner.

### FR-3 Project Details
- Each project must have a details section supporting rich text.
- Edits must save with last updated timestamp and editor identity.

### FR-4 Project Documents
- Users can upload one or many files to a project.
- System must store file metadata and link each file to project and uploader.

### FR-5 Issue CRUD
- Users can create, edit, move, and delete issues within a project.
- Issue status changes in Kanban must persist immediately.

### FR-6 Issue Views
- System must support both Kanban and table/list views for the same issue dataset.
- View changes must not lose current project filters.

### FR-7 Issue Detail Page
- Each issue must have a dedicated route/page.
- Users can manage title, description, assignee, priority, due date, status, attachments.
- Mentions (`@`) must resolve to users in workspace and be stored as structured references.

### FR-8 Activity History (MVP-light)
- Track key events: issue created, status changed, assignee changed, due date changed.

## 8. Role and Permission Model (MVP)
- Admin:
  - Full access to all projects and issues.
  - Can create/archive projects, edit any issue, manage documents.
- Employee:
  - Can create projects and issues (configurable by org setting).
  - Can edit projects/issues where they are member or creator.
  - Can upload/edit/delete documents in accessible projects.

## 9. UX Requirements
- Navigation: projects list -> project page -> issue page.
- Project page must expose:
  - Overview (details)
  - Documents
  - Issues (Kanban/Table toggle)
- Kanban must support smooth drag-and-drop between status columns.
- Table must support sorting and quick inline status updates.
- Dedicated issue page must prioritize editability and collaboration.
- Empty states must guide first action (create project, upload first doc, create first issue).

## 10. Data Model (High-Level)
- User: id, name, email, role.
- Project: id, key, name, description, ownerId, status, createdAt, updatedAt.
- ProjectDocument: id, projectId, filename, fileUrl, uploadedBy, uploadedAt, size.
- Issue: id, projectId, title, description, status, assigneeId, priority, dueDate, createdBy, createdAt, updatedAt.
- IssueAttachment: id, issueId, filename, fileUrl, uploadedBy, uploadedAt.
- Mention: id, issueId, mentionedUserId, mentionedBy, createdAt.
- ActivityLog: id, entityType, entityId, action, actorId, payload, createdAt.

## 11. Non-Functional Requirements
- Performance:
  - Project issue board/list initial load under 2 seconds for up to 500 issues.
  - Status update feedback under 300ms (optimistic UI allowed).
- Reliability:
  - No data loss on issue and project edits.
  - File upload retry and clear failure messages.
- Security:
  - Role-based authorization checks on all write actions.
  - Private file access scoped to authorized users.
- Auditability:
  - Store core activity events for troubleshooting and accountability.

## 12. Success Metrics (MVP)
- Activation:
  - >=70% of invited users create or update at least one project/issue in first 14 days.
- Engagement:
  - >=60% weekly active users interact with issues in Kanban or table view.
- Execution quality:
  - >=80% of issues have assignee and status.
  - >=60% of issues with target delivery include due date.
- Collaboration:
  - Mentions used in >=30% of active projects.

## 13. Release Plan
### Milestone 1: Foundation
- Auth + roles.
- Project CRUD.
- Basic project details page.

### Milestone 2: Execution Core
- Issue CRUD.
- Kanban + table views.
- Dedicated issue page.

### Milestone 3: Collaboration and Hardening
- Mentions.
- Attachments for project and issue.
- Activity history + quality pass (performance, bug fixes).

## 14. Risks and Mitigations
- Risk: Scope creep from “Linear-like” expectations.
  - Mitigation: Keep MVP to defined statuses, fields, and views.
- Risk: File handling complexity (permissions, storage limits).
  - Mitigation: Enforce file constraints and role checks early.
- Risk: Poor adoption due to weak onboarding.
  - Mitigation: Add clear empty states and first-run guidance.

## 15. Open Questions
- Should employees be allowed to archive projects, or admin-only?
- Should comments be part of MVP on issue pages, or post-MVP?
- What file size/type limits are required for uploads?
- Should mention notifications be in-app only, or in-app + email?
- Is issue priority required, or optional, for MVP?

## 16. Acceptance Criteria (MVP Exit)
- User can create a project and add description + documents.
- User can create issues inside the project and view them in both Kanban and table formats.
- User can open an issue detail page and edit all MVP fields, including due date.
- User can mention at least one teammate on the issue detail page.
- Role permissions enforce allowed actions for admin vs employee.
