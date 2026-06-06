# DevQuest

A small, calm full-stack **Next.js** developer quest tracker built for the
**Web Dev Cohort 2026 Full Stack Next.js** assignment.

DevQuest is a developer quest board + learning tracker + soft glass dashboard.
You can browse public quests, view quest details, submit GitHub work, create
new quests from the dashboard, update progress, delete quests, view
submissions, and bookmark quests.

The whole project is small, complete, and easy to explain end to end.

---

## Project Overview

DevQuest demonstrates the **Next.js App Router** with multiple rendering
strategies, a real database, structured API responses, and a clean
Server Action vs API Route split.

It is intentionally:

- minimal
- calm
- glassy
- developer-focused
- not a productivity war room
- not a Jira-style issue tracker
- not a fake SaaS landing page

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS (glassmorphism)
- Prisma ORM with SQLite
- Server Components by default
- Client Components only where required (forms, pending state, bookmark toggle)
- Server Actions for form mutations
- API Route Handlers for external CRUD

---

## Features Implemented

- Public quest board with featured quests
- Quest detail page with submission form
- Quest create, edit, status update, and delete from the dashboard
- Submissions list with GitHub links
- Bookmark toggle on quest detail
- Structured API responses with consistent shape
- Validation for forms and API requests
- Friendly empty states
- Reusable glass components

---

## How to Run Locally

```bash
npm install
cp .env.example .env
npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

---

## Environment Variables

Create a `.env` file based on `.env.example`.

```env
DATABASE_URL="file:./dev.db"
```

The local SQLite database is stored at `prisma/dev.db`.

---

## Database Setup

The Prisma schema lives in `prisma/schema.prisma` and defines three models:

- `Quest`
- `Submission`
- `Bookmark`

Plus two enums: `QuestStatus` and `Difficulty`.

Seed data is loaded by `prisma/seed.ts`. It clears existing data safely and
inserts 8 realistic quests plus a sample submission and bookmark.

Useful scripts:

```bash
npm run db:push     # sync the schema with the local SQLite database
npm run db:seed     # reset and reseed demo data
npm run db:studio   # open Prisma Studio
```

---

## Routes and Pages

| Path                                  | Purpose                                  | Rendering |
| ------------------------------------- | ---------------------------------------- | --------- |
| `/`                                   | Home with hero and featured quests       | ISR (60s) |
| `/quests`                             | Public quest board                       | ISR (60s) |
| `/quests/[slug]`                      | Quest detail with submission form        | ISR (60s) |
| `/about`                              | Project documentation                    | SSG       |
| `/dashboard`                          | Quest Log overview                       | SSR       |
| `/dashboard/quests`                   | Manage quests                            | SSR       |
| `/dashboard/quests/new`               | Create a new quest                       | SSR       |
| `/dashboard/quests/[id]/edit`         | Edit an existing quest                   | SSR       |
| `/dashboard/submissions`              | All submissions                          | SSR       |

All routes are nested inside the `app/` directory using file-based routing.

---

## API Routes

| Method     | Path                     | Description                       |
| ---------- | ------------------------ | --------------------------------- |
| `GET`      | `/api/quests`            | List all quests                   |
| `POST`     | `/api/quests`            | Create a quest                    |
| `GET`      | `/api/quests/[id]`       | Get a quest by id                 |
| `PATCH`    | `/api/quests/[id]`       | Update a quest by id              |
| `DELETE`   | `/api/quests/[id]`       | Delete a quest by id              |
| `GET`      | `/api/submissions`       | List all submissions              |
| `POST`     | `/api/submissions`       | Create a submission               |
| `GET`      | `/api/bookmarks`         | List all bookmarks                |
| `POST`     | `/api/bookmarks`         | Create a bookmark                 |
| `DELETE`   | `/api/bookmarks`         | Remove a bookmark by quest or id  |

All responses use the same shape:

```json
{
  "success": true,
  "message": "Quest fetched successfully",
  "data": { }
}
```

Errors look like:

```json
{
  "success": false,
  "message": "Validation failed",
  "error": "Title is required"
}
```

---

## Server Actions

Defined in `app/actions/quest-actions.ts` with the `"use server"` directive:

- `createQuestAction`
- `updateQuestAction`
- `updateQuestStatusAction`
- `deleteQuestAction`
- `createSubmissionAction`
- `bookmarkQuestAction`
- `deleteBookmarkAction`

Each form mutation in the UI is bound to one of these actions.

---

## Rendering Strategies

### SSR

Used in dashboard pages because dashboard data should always be fresh at
request time.

Pages:

- `/dashboard`
- `/dashboard/quests`
- `/dashboard/quests/new`
- `/dashboard/quests/[id]/edit`
- `/dashboard/submissions`

These pages use `export const dynamic = "force-dynamic"`.

### SSG

Used in `/about` because this page contains static project information and
does not need database data.

This page uses `export const dynamic = "force-static"`.

### ISR

Used in `/quests` and `/quests/[slug]` because public quest pages can be
cached and regenerated every 60 seconds.

These pages use `export const revalidate = 60`. The quest detail page also
uses `generateStaticParams()` to pre-generate known slugs at build time.

---

## Concepts Covered from Class

- App Router and file-based routing
- Layouts (root layout, dashboard layout)
- Server Components and Client Components
- API Route Handlers (GET, POST, PATCH, DELETE)
- Server Actions with `"use server"`
- `revalidatePath` and `redirect` from `next/cache` and `next/navigation`
- Structured API responses
- Prisma ORM with SQLite
- Validation in both Server Actions and API Routes
- Tailwind glassmorphism styling
- SSG, SSR, and ISR clearly separated by page

---

## API Routes vs Server Actions

This project uses both API Routes and Server Actions.

**API Routes** are used for external/programmatic CRUD operations. For
example, `/api/quests` exposes `GET` and `POST` methods that can be called
by external clients or testing tools. They return structured JSON
responses and are ideal for any client outside the Next.js UI.

**Server Actions** are used for form submissions inside the Next.js app.
For example, creating a quest from the dashboard uses a Server Action
because the mutation is directly connected to a form in the UI. They use
the `"use server"` directive and call `revalidatePath` and `redirect` to
keep the UI fresh.

This keeps API access and UI form mutations clearly separated.

---

## Folder Structure

```
app/
  layout.tsx
  page.tsx
  globals.css
  about/page.tsx
  quests/page.tsx
  quests/[slug]/page.tsx
  quests/[slug]/submission-form.tsx
  quests/[slug]/bookmark-controls.tsx
  dashboard/layout.tsx
  dashboard/page.tsx
  dashboard/quests/page.tsx
  dashboard/quests/quest-row-actions.tsx
  dashboard/quests/new/page.tsx
  dashboard/quests/[id]/edit/page.tsx
  dashboard/submissions/page.tsx
  actions/quest-actions.ts
  api/quests/route.ts
  api/quests/[id]/route.ts
  api/submissions/route.ts
  api/bookmarks/route.ts

components/
  site-header.tsx
  site-footer.tsx
  dashboard-sidebar.tsx
  glass-card.tsx
  page-shell.tsx
  section-heading.tsx
  quest-card.tsx
  quest-form.tsx
  status-badge.tsx
  difficulty-badge.tsx
  stat-card.tsx
  empty-state.tsx
  submit-button.tsx
  form-field.tsx
  textarea-field.tsx

lib/
  prisma.ts
  slugify.ts
  api-response.ts
  validations.ts
  format-date.ts

prisma/
  schema.prisma
  seed.ts
  dev.db
```

---

## Assumptions and Limitations

- No authentication. The dashboard is not protected.
- No payments, no SaaS pricing, no testimonials.
- Submissions are stored as plain text and not moderated.
- The bookmark feature is single-user; there is no per-user isolation.
- The project is meant for learning and assignment evaluation, not for
  production traffic.

---

## Why this project satisfies the assignment

- Uses the Next.js App Router with file-based routing and nested layouts
- Implements SSR, SSG, and ISR on different pages, each with a clear
  reason
- Implements all of `GET`, `POST`, `PATCH/PUT`, and `DELETE` across the API
  routes
- Connects to a real SQLite database with Prisma
- Uses structured `{ success, message, data, error }` responses everywhere
- Handles validation and errors meaningfully in both API Routes and
  Server Actions
- Uses Server Actions with `"use server"` for UI form mutations
- Explains the difference between API Routes and Server Actions in code
  comments and this README
- Has a clean, minimal, calm glassmorphism frontend
- Includes `.env.example` and a complete README
