import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";
import { GlassCard } from "@/components/glass-card";
import { EmptyState } from "@/components/empty-state";
import { formatDate } from "@/lib/format-date";

// SSR: dashboard data should always be fresh at request time.
export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
    include: { quest: { select: { id: true, title: true, slug: true } } },
  });

  return (
    <>
      <SectionHeading
        title="Submissions"
        subtitle="All work submitted on quests across the project."
      />

      {submissions.length === 0 ? (
        <EmptyState
          title="No submissions yet"
          description="Submissions will appear here when someone submits their work."
        />
      ) : (
        <GlassCard className="overflow-hidden">
          <div className="hidden grid-cols-[1fr_1.2fr_1.6fr_1fr_0.8fr] gap-4 border-b border-white/5 px-5 py-3 text-xs uppercase tracking-[0.2em] text-slate-500 md:grid">
            <span>Submitter</span>
            <span>Quest</span>
            <span>GitHub URL</span>
            <span>Notes</span>
            <span className="text-right">Submitted</span>
          </div>
          <ul className="divide-y divide-white/5">
            {submissions.map((submission) => (
              <li
                key={submission.id}
                className="grid grid-cols-1 gap-2 px-5 py-4 text-sm md:grid-cols-[1fr_1.2fr_1.6fr_1fr_0.8fr] md:items-center md:gap-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 md:hidden">
                    Submitter
                  </p>
                  <p className="font-medium text-white">{submission.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 md:hidden">
                    Quest
                  </p>
                  <Link
                    href={`/quests/${submission.quest.slug}`}
                    className="text-cyan-300 hover:text-cyan-200"
                  >
                    {submission.quest.title}
                  </Link>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 md:hidden">
                    GitHub
                  </p>
                  <a
                    href={submission.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-cyan-300 hover:text-cyan-200"
                  >
                    {submission.githubUrl}
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 md:hidden">
                    Notes
                  </p>
                  <p className="text-slate-300">
                    {submission.notes ?? "—"}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 md:hidden">
                    Submitted
                  </p>
                  <span className="text-xs text-slate-400">
                    {formatDate(submission.createdAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>
      )}
    </>
  );
}
