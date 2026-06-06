import Link from "next/link";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { PageShell } from "@/components/page-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#05070b]/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M12 2 4 6v6c0 5 3.5 9.4 8 10 4.5-.6 8-5 8-10V6l-8-4Z" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-wide">
              DevQuest
            </span>
            <span className="ml-2 hidden text-xs text-slate-500 sm:inline">
              / Dashboard
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/quests"
              className="rounded-lg px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              Public board
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      <main>
        <PageShell className="lg:py-10">
          <div className="flex flex-col gap-6 lg:flex-row">
            <DashboardSidebar />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </PageShell>
      </main>
    </div>
  );
}
