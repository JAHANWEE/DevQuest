import clsx from "clsx";
import type { QuestStatus } from "@prisma/client";

const styles: Record<QuestStatus, string> = {
  TODO: "border-slate-400/30 bg-slate-400/10 text-slate-200",
  IN_PROGRESS: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  COMPLETED: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
};

const labels: Record<QuestStatus, string> = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

export function StatusBadge({
  value,
  className,
}: {
  value: QuestStatus;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        styles[value],
        className
      )}
    >
      {labels[value]}
    </span>
  );
}
