import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";
import { GlassCard } from "@/components/glass-card";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { formatDate } from "@/lib/format-date";

// SSR: dashboard data should always be fresh at request time.
export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const [
    totalQuests,
    completedQuests,
    inProgressQuests,
    submissionCount,
    bookmarkCount,
    recentSubmissions,
    latestQuests,
  ] = await Promise.all([
    prisma.quest.count(),
    prisma.quest.count({ where: { status: "COMPLETED" } }),
    prisma.quest.count({ where: { status: "IN_PROGRESS" } }),
    prisma.submission.count(),
    prisma.bookmark.count(),
    prisma.submission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { quest: { select: { title: true, slug: true } } },
    }),
    prisma.quest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <SectionHeading
        title="Quest Log"
        subtitle="A quick overview of your quests, submissions, and progress."
        actions={
          <Link
            href="/dashboard/quests/new"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
          >
            New quest
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Quests" value={totalQuests} hint="Across all categories" />
        <StatCard
          label="Completed"
          value={completedQuests}
          tone="emerald"
          hint={`${inProgressQuests} in progress`}
        />
        <StatCard
          label="Submissions"
          value={submissionCount}
          tone="cyan"
          hint="Work submitted on quests"
        />
        <StatCard
          label="Bookmarks"
          value={bookmarkCount}
          tone="amber"
          hint="Quests saved for later"
        />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Recent submissions
            </h2>
            <Link
              href="/dashboard/submissions"
              className="text-xs text-cyan-300 hover:text-cyan-200"
            >
              View all →
            </Link>
          </div>
          {recentSubmissions.length === 0 ? (
            <p className="text-sm text-slate-400">No submissions yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentSubmissions.map((submission) => (
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
                  <Link
                    href={`/quests/${submission.quest.slug}`}
                    className="text-xs text-cyan-300 hover:text-cyan-200"
                  >
                    {submission.quest.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Latest quests</h2>
            <Link
              href="/dashboard/quests"
              className="text-xs text-cyan-300 hover:text-cyan-200"
            >
              Manage →
            </Link>
          </div>
          {latestQuests.length === 0 ? (
            <p className="text-sm text-slate-400">No quests yet.</p>
          ) : (
            <ul className="space-y-3">
              {latestQuests.map((quest) => (
                <li
                  key={quest.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {quest.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {quest.category} · {formatDate(quest.createdAt)}
                    </p>
                  </div>
                  <StatusBadge value={quest.status} />
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </div>
    </>
  );
}
