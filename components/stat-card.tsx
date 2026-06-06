import clsx from "clsx";
import type { ReactNode } from "react";
import { GlassCard } from "./glass-card";

type StatCardProps = {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "emerald" | "amber" | "cyan";
  className?: string;
};

const toneStyles: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "text-white",
  emerald: "text-emerald-300",
  amber: "text-amber-300",
  cyan: "text-cyan-300",
};

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
  className,
}: StatCardProps) {
  return (
    <GlassCard className={clsx("p-5", className)}>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p
        className={clsx(
          "mt-3 text-3xl font-semibold tracking-tight",
          toneStyles[tone]
        )}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
    </GlassCard>
  );
}
