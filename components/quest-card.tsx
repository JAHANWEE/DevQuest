import Link from "next/link";
import type { Difficulty, QuestStatus } from "@prisma/client";
import { GlassCard } from "./glass-card";
import { DifficultyBadge } from "./difficulty-badge";
import { StatusBadge } from "./status-badge";

type QuestCardProps = {
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  status: QuestStatus;
  showStatus?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
};

export function QuestCard({
  title,
  slug,
  description,
  category,
  difficulty,
  status,
  showStatus = true,
  ctaHref,
  ctaLabel = "View Quest",
}: QuestCardProps) {
  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
        <span>{category}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-slate-400">{description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <DifficultyBadge value={difficulty} />
        {showStatus ? <StatusBadge value={status} /> : null}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Link
          href={ctaHref ?? `/quests/${slug}`}
          className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
        >
          {ctaLabel} →
        </Link>
      </div>
    </GlassCard>
  );
}
