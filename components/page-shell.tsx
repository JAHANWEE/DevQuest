import clsx from "clsx";
import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
