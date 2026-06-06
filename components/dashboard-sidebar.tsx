"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/dashboard", label: "Quest Log", exact: true },
  { href: "/dashboard/quests", label: "Manage Quests" },
  { href: "/dashboard/quests/new", label: "New Quest" },
  { href: "/dashboard/submissions", label: "Submissions" },
  { href: "/quests", label: "Public Board" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl shadow-sm">
        <p className="px-3 pb-2 pt-1 text-[10px] uppercase tracking-[0.25em] text-slate-500">
          Dashboard
        </p>
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname === link.href ||
                pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "rounded-xl border border-transparent px-3 py-2 text-sm transition",
                  isActive
                    ? "border-white/15 bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
