import clsx from "clsx";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  actions?: ReactNode;
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  actions,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
