import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";
import { SiteShell } from "@/components/site-header";
import { SubmissionForm } from "./submission-form";
import { BookmarkControls } from "./bookmark-controls";
import { formatDate } from "@/lib/format-date";

// ISR: the public quest board is cached and regenerated every 60 seconds.
export const revalidate = 60;

// Pre-generate the most common paths at build time.
export async function generateStaticParams() {
  const quests = await prisma.quest.findMany({
    select: { slug: true },
  });
  return quests.map((quest) => ({ slug: quest.slug }));
}

export default async function QuestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const quest = await prisma.quest.findUnique({
    where: { slug },
    include: {
      submissions: { orderBy: { createdAt: "desc" } },
      bookmarks: true,
    },
  });

  if (!quest) {
    notFound();
  }

  const isBookmarked = quest.bookmarks.length > 0;

  return (
    <SiteShell>
      <PageShell>
        <div className="mb-6">
          <Link
            href="/quests"
            className="text-xs uppercase tracking-[0.25em] text-slate-500 transition hover:text-slate-300"
          >
            ← Quest Board
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <GlassCard className="p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
                {quest.category}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {quest.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <DifficultyBadge value={quest.difficulty} />
                <StatusBadge value={quest.status} />
                <span className="text-xs text-slate-500">
                  Updated {formatDate(quest.updatedAt)}
                </span>
              </div>
              <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate-300 sm:text-base">
                {quest.description}
              </p>

              <div className="mt-6 border-t border-white/5 pt-5">
                <BookmarkControls
                  questId={quest.id}
                  initialBookmarked={isBookmarked}
                  count={quest.bookmarks.length}
                />
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-lg font-semibold text-white">
                Submit your work
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Share the GitHub repo for this quest and a short note about
                your approach.
              </p>
              <div className="mt-6">
                <SubmissionForm questId={quest.id} />
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-lg font-semibold text-white">
                Recent submissions
              </h2>
              {quest.submissions.length === 0 ? (
                <p className="mt-3 text-sm text-slate-400">
                  No submissions yet. Be the first to share your work.
                </p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {quest.submissions.map((submission) => (
                    <li
                      key={submission.id}
                      className="rounded-xl border border-white/5 bg-black/20 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium text-white">
                          {submission.name}
                        </p>
                        <span className="text-xs text-slate-500">
                          {formatDate(submission.createdAt)}
                        </span>
                      </div>
                      <a
                        href={submission.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-cyan-300 hover:text-cyan-200"
                      >
                        {submission.githubUrl}
                      </a>
                      {submission.notes ? (
                        <p className="mt-3 text-sm text-slate-300">
                          {submission.notes}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </GlassCard>
          </div>

          <aside className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-sm font-semibold text-white">
                What to submit
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  A link to your GitHub repository
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  A short note about your approach
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  Anything interesting you learned
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-sm font-semibold text-white">
                On the dashboard
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Manage quests, review submissions, and update progress from
                the dashboard.
              </p>
              <Link
                href="/dashboard/quests"
                className="mt-4 inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200"
              >
                Open dashboard →
              </Link>
            </GlassCard>

            {quest.submissions.length === 0 ? (
              <EmptyState
                title="No submissions yet"
                description="Submissions for this quest will appear here once someone shares their work."
              />
            ) : null}
          </aside>
        </div>
      </PageShell>
    </SiteShell>
  );
}
