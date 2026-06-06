import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell } from "@/components/site-header";

// This page is static documentation-like content. It does not need
// request-time database data, so it can be fully prerendered (SSG).
export const dynamic = "force-static";

const features = [
  "Browse a public quest board of developer challenges",
  "View quest details and submit your GitHub work",
  "Create, update, and delete quests from a dashboard",
  "Track submissions and bookmark quests you want to revisit",
  "Use the same data from API Routes and Server Actions",
];

const renderModes = [
  {
    label: "SSG",
    title: "About page",
    body: "Static documentation content. Generated at build time, no request-time data.",
  },
  {
    label: "ISR",
    title: "Quest board and quest detail",
    body: "Cached and regenerated every 60 seconds. Fresh enough for a public board, fast enough for users.",
  },
  {
    label: "SSR",
    title: "Dashboard pages",
    body: "Forced dynamic so the dashboard always shows the latest quests, submissions, and bookmarks.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageShell>
        <SectionHeading
          title="About DevQuest"
          subtitle="A small full-stack Next.js project for the Web Dev Cohort 2026 assignment."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-7">
            <h2 className="text-lg font-semibold text-white">
              What is DevQuest?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              DevQuest is a calm developer quest tracker. It lets you browse
              small developer challenges, view details, submit your GitHub
              work, create new quests, update progress, and bookmark ideas
              for later.
            </p>
          </GlassCard>

          <GlassCard className="p-7">
            <h2 className="text-lg font-semibold text-white">
              Why this project exists
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              The goal is to demonstrate the Next.js App Router end to end:
              file-based routing, layouts, multiple rendering strategies,
              API Routes, and Server Actions, all in one small, readable
              codebase.
            </p>
          </GlassCard>

          <GlassCard className="p-7 lg:col-span-2">
            <h2 className="text-lg font-semibold text-white">
              Features implemented
            </h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-7 lg:col-span-2">
            <h2 className="text-lg font-semibold text-white">
              Rendering strategies used
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {renderModes.map((mode) => (
                <div
                  key={mode.title}
                  className="rounded-xl border border-white/10 bg-black/20 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
                    {mode.label}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-white">
                    {mode.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{mode.body}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-7 lg:col-span-2">
            <h2 className="text-lg font-semibold text-white">
              API Routes vs Server Actions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              <span className="font-medium text-white">API Routes</span> are
              used for external or programmatic CRUD. They return structured
              JSON and are available at paths like{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-cyan-200">
                /api/quests
              </code>
              .
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              <span className="font-medium text-white">Server Actions</span>{" "}
              are used for form mutations inside the UI, like creating a
              quest, submitting work, or bookmarking a quest. They live in{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-cyan-200">
                app/actions/quest-actions.ts
              </code>{" "}
              and are marked with{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-cyan-200">
                &quot;use server&quot;
              </code>
              .
            </p>
          </GlassCard>

          <GlassCard className="p-7 lg:col-span-2">
            <h2 className="text-lg font-semibold text-white">
              Concepts covered from class
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Next.js App Router, file-based routing, layouts, Server
              Components, Client Components, dynamic and static rendering,
              ISR, API Route Handlers, Server Actions, Prisma with SQLite,
              structured API responses, and validation.
            </p>
          </GlassCard>
        </div>
      </PageShell>
    </SiteShell>
  );
}
