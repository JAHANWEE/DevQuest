import Link from "next/link";
import type { ReactNode } from "react";
import { GlassCard } from "./glass-card";

type EmptyStateProps = {
  title: string;
  description?: string;
  cta?: {
    href: string;
    label: string;
  };
  icon?: ReactNode;
};

export function EmptyState({ title, description, cta, icon }: EmptyStateProps) {
  return (
    <GlassCard className="flex flex-col items-center gap-3 p-10 text-center">
      {icon ? <div className="text-3xl text-slate-500">{icon}</div> : null}
      <h3 className="text-lg font-medium text-white">{title}</h3>
      {description ? (
        <p className="max-w-md text-sm text-slate-400">{description}</p>
      ) : null}
      {cta ? (
        <Link
          href={cta.href}
          className="mt-3 inline-flex items-center justify-center rounded-xl bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
        >
          {cta.label}
        </Link>
      ) : null}
    </GlassCard>
  );
}
