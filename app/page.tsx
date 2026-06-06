import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/page-shell";
import { GlassCard } from "@/components/glass-card";
import { QuestCard } from "@/components/quest-card";
import { SiteShell } from "@/components/site-header";

export const revalidate = 60;

const steps = [
  {
    title: "Choose a Quest",
    body: "Browse small developer challenges across backend, frontend, and DevOps.",
  },
  {
    title: "Build the Thing",
    body: "Turn a small idea into a working project you can actually finish.",
  },
  {
    title: "Submit Progress",
    body: "Add your GitHub link and a few notes about what you learned.",
  },
];

export default async function HomePage() {
  const featured = await prisma.quest.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <SiteShell>
      <PageShell>
        <section className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <GlassCard className="p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
              A small developer quest tracker
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              DevQuest
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
              Pick small developer quests, build them, and submit your
              progress. A calm place to learn, ship, and keep track.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quests"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
              >
                Browse Quests
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                Open Quest Board
              </Link>
            </div>
          </GlassCard>

          <div className="grid gap-3 sm:grid-cols-1">
            {steps.map((step) => (
              <GlassCard key={step.title} className="p-5">
                <h3 className="text-sm font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{step.body}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Featured quests
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                A few hand-picked quests to get you started.
              </p>
            </div>
            <Link
              href="/quests"
              className="text-sm font-medium text-cyan-300 hover:text-cyan-200"
            >
              View all →
            </Link>
          </div>
          {featured.length === 0 ? (
            <GlassCard className="p-8 text-center text-sm text-slate-400">
              No featured quests yet.
            </GlassCard>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((quest) => (
                <QuestCard
                  key={quest.id}
                  title={quest.title}
                  slug={quest.slug}
                  description={quest.description}
                  category={quest.category}
                  difficulty={quest.difficulty}
                  status={quest.status}
                />
              ))}
            </div>
          )}
        </section>
      </PageShell>
    </SiteShell>
  );
}
