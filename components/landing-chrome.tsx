import type { HTMLAttributes, ReactNode } from "react";

export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 ${className}`}
    >
      <span className="text-cyan-300">›</span>
      <span>{children}</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export function Hairline({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-white/10 ${className}`} aria-hidden />;
}

const statusStyles: Record<string, string> = {
  TODO: "text-slate-300 border-white/15 bg-white/5",
  IN_PROGRESS: "text-amber-200 border-amber-300/30 bg-amber-300/10",
  COMPLETED: "text-emerald-200 border-emerald-300/30 bg-emerald-300/10",
  LIVE: "text-cyan-200 border-cyan-300/40 bg-cyan-300/10",
};

export function StatusChip({
  status,
  label,
  pulse = false,
  className = "",
}: {
  status: keyof typeof statusStyles | string;
  label?: string;
  pulse?: boolean;
  className?: string;
}) {
  const tone = statusStyles[status] ?? statusStyles.LIVE;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tone} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full bg-current ${pulse ? "pulse-dot" : ""}`}
      />
      {label ?? status}
    </span>
  );
}

export function TechBadge({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 border border-white/10 bg-white/[0.025] px-1.5 py-0.5 font-mono text-[10px] text-slate-200/90 ${className}`}
    >
      <span className="text-cyan-300/70">#</span>
      {name}
    </span>
  );
}

export function CornerCrosses({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    >
      {[
        "top-1 left-1",
        "top-1 right-1",
        "bottom-1 left-1",
        "bottom-1 right-1",
      ].map((p) => (
        <span key={p} className={`absolute h-2 w-2 text-cyan-300/50 ${p}`}>
          <svg viewBox="0 0 8 8" className="h-full w-full">
            <path
              d="M4 0v8M0 4h8"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function GlassPanel({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`glass-panel relative ${className}`} {...rest}>
      <div
        className="noise-overlay absolute inset-0 rounded-[inherit]"
        aria-hidden
      />
      {children}
    </div>
  );
}
