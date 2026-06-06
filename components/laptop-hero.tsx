import Image from "next/image";
import Link from "next/link";
import type { Quest } from "@prisma/client";
import { ArrowRight } from "./landing-icons";
import { StatusChip, TechBadge, Hairline } from "./landing-chrome";

type QuestLite = Pick<
  Quest,
  "id" | "title" | "slug" | "category" | "difficulty" | "status"
>;

/**
 * Cinematic hero. The laptop PNG sits centered with an oversized background
 * wordmark behind it; all the important hero copy lives inside the laptop's
 * screen area, position-matched with percentage insets.
 */
export function LaptopHero({ featured }: { featured: QuestLite[] }) {
  const previewQuests = featured.slice(0, 4);

  return (
    <section className="relative isolate overflow-hidden">
      {/* blueprint grid + radial wash */}
      <div className="absolute inset-0 blueprint-grid opacity-50" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070b]/40 to-[#05070b]"
        aria-hidden
      />

      {/* oversized background wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[10%] flex justify-center select-none"
      >
        <h1
          className="whitespace-nowrap font-display font-bold leading-none tracking-tighter
                     text-[18vw] md:text-[15vw]
                     bg-gradient-to-b from-white/[0.07] via-cyan-300/10 to-white/[0.02] bg-clip-text text-transparent"
        >
          devquest
        </h1>
      </div>

      {/* The laptop stage */}
      <div className="relative mx-auto max-w-[1320px] px-4 pt-32 pb-20 sm:pt-40 md:pt-48 md:pb-28">
        <div className="relative mx-auto" style={{ maxWidth: "1180px" }}>
          {/* glow under laptop */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[55%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--cyan-accent) 26%, transparent), transparent 70%)",
            }}
          />

          {/* laptop PNG */}
          <Image
            src="/laptop_image.png"
            alt=""
            aria-hidden
            width={1536}
            height={1024}
            priority
            className="relative block w-full select-none drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
            draggable={false}
          />

          {/* screen overlay — measured to match the laptop screen area */}
          <div
            className="absolute"
            style={{
              top: "17%",
              bottom: "33%",
              left: "22%",
              right: "22%",
            }}
          >
            <div className="relative h-full w-full overflow-hidden bg-[#0b0f17] ring-1 ring-white/5">
              {/* scanlines + grid inside the screen */}
              <div className="absolute inset-0 scanlines opacity-40" aria-hidden />
              <div
                className="absolute inset-0 blueprint-grid-fine opacity-30"
                aria-hidden
              />
              <div className="noise-overlay absolute inset-0" aria-hidden />
              {/* corner inner glow */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--cyan-accent) 14%, transparent), transparent 60%)",
                }}
              />

              {/* fake browser chrome */}
              <div className="relative z-10 flex h-7 items-center gap-2 border-b border-white/10 bg-white/[0.02] px-3">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
                <div className="mx-auto inline-flex items-center gap-2 border border-white/10 bg-black/30 px-3 py-0.5 font-mono text-[10px] text-slate-400">
                  <span className="text-cyan-300">●</span> devquest.io
                  /quests
                </div>
              </div>

              {/* in-screen layout: hero copy left, mini feed right */}
              <div className="relative z-10 grid h-[calc(100%-1.75rem)] grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-[1.25fr_1fr] md:gap-6 md:p-8">
                {/* Left: hero copy */}
                <div className="flex min-h-0 flex-col">
                  <div className="inline-flex w-fit items-center gap-2 border border-cyan-300/40 bg-cyan-300/5 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 pulse-dot" />
                    v0.1 · 12 quests live
                  </div>

                  <h2 className="mt-3 font-display font-semibold leading-[1.02] tracking-tight text-white text-[clamp(20px,3.2vw,52px)]">
                    Ship the{" "}
                    <span className="text-cyan-300">small things.</span>
                  </h2>

                  <p className="mt-3 max-w-md text-[clamp(11px,1vw,15px)] leading-relaxed text-slate-400">
                    A calm tracker for tiny developer quests. Pick a challenge,
                    build it, submit your repo, level up.
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                    <Link
                      href="/quests"
                      className="inline-flex items-center gap-1.5 border border-cyan-300/30 bg-cyan-300/10 px-3 py-1.5 font-mono text-[11px] font-medium text-cyan-200 transition hover:bg-cyan-300/20"
                    >
                      Browse Quests <ArrowRight className="h-3 w-3" />
                    </Link>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] font-medium text-slate-200 transition hover:bg-white/[0.08]"
                    >
                      Open Dashboard
                    </Link>
                    <span className="ml-1 hidden font-mono text-[10px] text-slate-500 sm:inline">
                      ›_ quest run --now
                    </span>
                  </div>
                </div>

                {/* Right: mini feed strip */}
                <div className="hidden min-h-0 flex-col md:flex">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      ── live feed
                    </div>
                    <div className="font-mono text-[10px] text-cyan-300/70">
                      ISR · /quests
                    </div>
                  </div>
                  <Hairline className="mt-2" />
                  <div className="mt-1 min-h-0 flex-1 overflow-hidden">
                    {previewQuests.length === 0 ? (
                      <div className="mt-3 font-mono text-[10px] text-slate-500">
                        no featured quests yet
                      </div>
                    ) : (
                      previewQuests.map((q) => (
                        <MiniQuestRow key={q.id} quest={q} />
                      ))
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    {["Next.js", "Prisma", "React", "SQLite"].map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniQuestRow({ quest }: { quest: QuestLite }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 py-1.5 last:border-b-0">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
            quest.status === "COMPLETED"
              ? "bg-emerald-300"
              : quest.status === "IN_PROGRESS"
                ? "bg-amber-300"
                : "bg-cyan-300"
          } ${quest.status === "TODO" ? "pulse-dot" : ""}`}
        />
        <div className="min-w-0 truncate font-mono text-[10px] text-slate-200">
          {quest.title}
        </div>
      </div>
      <StatusChip
        status={quest.status}
        className="shrink-0 !text-[9px] !tracking-wider"
      />
    </div>
  );
}
