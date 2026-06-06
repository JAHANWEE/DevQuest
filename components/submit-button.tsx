"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

type SubmitButtonProps = {
  children: ReactNode;
  pendingLabel?: string;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

const variantStyles: Record<NonNullable<SubmitButtonProps["variant"]>, string> = {
  primary:
    "rounded-xl bg-cyan-300 text-slate-950 hover:bg-cyan-200 disabled:opacity-60",
  secondary:
    "rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 disabled:opacity-60",
  danger:
    "rounded-xl border border-rose-400/30 text-rose-300 hover:bg-rose-400/10 disabled:opacity-60",
};

export function SubmitButton({
  children,
  pendingLabel,
  variant = "primary",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed",
        variantStyles[variant],
        className
      )}
    >
      {pending ? (pendingLabel ?? "Working...") : children}
    </button>
  );
}
