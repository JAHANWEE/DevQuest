import { GitBranch, Terminal, Sparkles, Code2 } from "./landing-icons";

/**
 * Floating decoration cards + SVG connection lines that orbit the laptop
 * in the hero. Pure visual; hidden on small screens.
 */
export function LandingFloating() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* code block — top left */}
      <div className="absolute left-[3%] top-[28%] hidden md:block drift-slow">
        <div className="glass-panel chamfer w-[200px] p-3">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-400">
            <Code2 className="h-3 w-3 text-cyan-300" /> quest.actions.ts
          </div>
          <div className="mt-1.5 font-mono text-[10px] leading-relaxed text-slate-300">
            <div>
              <span className="text-cyan-300">await</span> prisma.quest.
              <span className="text-cyan-300">findFirst</span>({"{"}
            </div>
            <div className="pl-3">where: {"{ slug }"},</div>
            <div className="pl-3">include: submissions,</div>
            <div className="pl-3">revalidate: 60,</div>
            <div>{"})"}</div>
          </div>
        </div>
      </div>

      {/* branch node — top right */}
      <div className="absolute right-[5%] top-[24%] hidden md:flex flex-col items-center gap-1 float-slow">
        <div className="glass-panel chamfer flex items-center gap-2 px-3 py-1.5">
          <GitBranch className="h-3 w-3 text-cyan-300" />
          <span className="font-mono text-[10px] text-slate-200">
            feat/quest-board
          </span>
        </div>
        <div className="h-10 w-px bg-gradient-to-b from-cyan-300/60 to-transparent" />
        <div className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_var(--cyan-accent)]" />
      </div>

      {/* terminal — bottom right */}
      <div className="absolute right-[2%] bottom-[14%] hidden md:block drift-slow">
        <div className="glass-panel chamfer w-[230px] p-3">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-400">
            <Terminal className="h-3 w-3" /> ~/devquest
          </div>
          <div className="mt-1.5 font-mono text-[10px] leading-snug text-slate-300">
            <div>
              <span className="text-cyan-300">›</span> quest submit
              --repo=github.com/me/pomodoro
            </div>
            <div className="text-emerald-300/80">✓ linked · 1 submission</div>
            <div>
              <span className="text-cyan-300">›</span> quest list
              --difficulty=easy
            </div>
            <div className="text-slate-400">12 open · 4 in progress</div>
          </div>
        </div>
      </div>

      {/* mini stat — bottom left */}
      <div className="absolute left-[5%] bottom-[12%] hidden md:flex items-center gap-2 float-slow">
        <div className="glass-panel chamfer flex items-center gap-2 px-3 py-2">
          <Sparkles className="h-3 w-3 text-violet-300" />
          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
              shipped
            </div>
            <div className="font-mono text-xs text-slate-100">12 quests live</div>
          </div>
        </div>
      </div>

      {/* connection lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60"
        preserveAspectRatio="none"
      >
        <line
          x1="14%"
          y1="38%"
          x2="40%"
          y2="55%"
          stroke="var(--cyan-accent)"
          strokeOpacity="0.28"
          strokeDasharray="3 4"
        />
        <line
          x1="86%"
          y1="34%"
          x2="62%"
          y2="55%"
          stroke="var(--cyan-accent)"
          strokeOpacity="0.28"
          strokeDasharray="3 4"
        />
        <line
          x1="14%"
          y1="78%"
          x2="40%"
          y2="65%"
          stroke="#b89dff"
          strokeOpacity="0.22"
          strokeDasharray="3 4"
        />
        <line
          x1="86%"
          y1="76%"
          x2="62%"
          y2="65%"
          stroke="var(--cyan-accent)"
          strokeOpacity="0.28"
          strokeDasharray="3 4"
        />
      </svg>
    </div>
  );
}
