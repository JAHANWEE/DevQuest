import clsx from "clsx";
import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "form" | "header" | "aside";
};

export function GlassCard({
  children,
  className,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={clsx(
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-sm",
        className
      )}
    >
      {children}
    </Tag>
  );
}
