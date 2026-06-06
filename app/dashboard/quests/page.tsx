import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";
import { GlassCard } from "@/components/glass-card";
import { StatusBadge } from "@/components/status-badge";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { EmptyState } from "@/components/empty-state";
import { QuestRowActions } from "./quest-row-actions";
import { formatDate } from "@/lib/format-date";

// SSR: dashboard data should always be fresh at request time.
export const dynamic = "force-dynamic";

export default async function ManageQuestsPage() {
  const quests = await prisma.quest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <SectionHeading
        title="Manage Quests"
        subtitle="Update progress, edit details, or remove quests you no longer need."
        actions={
          <Link
            href="/dashboard/quests/new"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
          >
            New quest
          </Link>
        }
      />

      {quests.length === 0 ? (
        <EmptyState
          title="No quests yet"
          description="Create your first developer quest to start filling the board."
          cta={{ href: "/dashboard/quests/new", label: "Create a quest" }}
        />
      ) : (
        <>
          {/* Desktop table */}
          <GlassCard className="hidden overflow-hidden md:block">
            <div className="grid grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-white/5 px-5 py-3 text-xs uppercase tracking-[0.2em] text-slate-500">
              <span>Title</span>
              <span>Category</span>
              <span>Difficulty</span>
              <span>Status</span>
              <span>Created</span>
              <span className="text-right">Actions</span>
            </div>
            <ul className="divide-y divide-white/5">
              {quests.map((quest) => (
                <li
                  key={quest.id}
                  className="grid grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr] items-center gap-4 px-5 py-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-white">{quest.title}</p>
                    <p className="text-xs text-slate-500">/{quest.slug}</p>
                  </div>
                  <span className="text-slate-300">{quest.category}</span>
                  <span>
                    <DifficultyBadge value={quest.difficulty} />
                  </span>
                  <span>
                    <StatusBadge value={quest.status} />
                  </span>
                  <span className="text-slate-400">
                    {formatDate(quest.createdAt)}
                  </span>
                  <div className="flex items-center justify-end">
                    <QuestRowActions
                      questId={quest.id}
                      currentStatus={quest.status}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Mobile stacked cards */}
          <div className="grid gap-4 md:hidden">
            {quests.map((quest) => (
              <GlassCard key={quest.id} className="p-5">
                <p className="text-sm font-semibold text-white">
                  {quest.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {quest.category} · {formatDate(quest.createdAt)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <DifficultyBadge value={quest.difficulty} />
                  <StatusBadge value={quest.status} />
                </div>
                <div className="mt-4">
                  <QuestRowActions
                    questId={quest.id}
                    currentStatus={quest.status}
                  />
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}
    </>
  );
}
