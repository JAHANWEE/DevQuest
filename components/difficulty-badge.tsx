import clsx from "clsx";
import type { Difficulty } from "@prisma/client";

const styles: Record<Difficulty, string> = {
  BEGINNER: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  INTERMEDIATE: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  ADVANCED: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

const labels: Record<Difficulty, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function DifficultyBadge({
  value,
  className,
}: {
  value: Difficulty;
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
