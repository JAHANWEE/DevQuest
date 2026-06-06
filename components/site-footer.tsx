export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#05070b]/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>
          <span className="text-slate-300">DevQuest</span> · a small developer
          quest tracker for the Web Dev Cohort 2026.
        </p>
        <p className="text-slate-500">
          Built with Next.js, Prisma, and a calm glass theme.
        </p>
      </div>
    </footer>
  );
}
