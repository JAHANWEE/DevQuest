import Link from "next/link";
import type { Quest } from "@prisma/client";
import {
  ArrowRight,
  Compass,
  Code2,
  Send,
  Github,
  Layers,
  Sparkles,
  Zap,
  BookOpen,
  Shield,
} from "./landing-icons";
import {
  SectionLabel,
  GlassPanel,
  CornerCrosses,
  Hairline,
} from "./landing-chrome";
import { QuestCard } from "./quest-card";

type Featured = Quest[];

export function StatsStrip({
  questCount,
  submissionCount,
}: {
  questCount: number;
  submissionCount: number;
}) {
  const stats = [
    {
      k: String(questCount).padStart(2, "0"),
      v: "active quests",
      icon: Layers,
    },
    {
      k: String(submissionCount).padStart(2, "0"),
      v: "submissions",
      icon: Send,
    },
    { k: "60s", v: "ISR revalidate", icon: Zap },
    { k: "100%", v: "open source", icon: Github },
  ];

  return (
    <section className="mx-auto max-w-[1320px] px-4 pb-16">
      <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/5 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.v}
            className="flex items-center gap-3 bg-[#05070b] p-5"
          >
            <s.icon className="h-4 w-4 shrink-0 text-cyan-300/80" />
            <div>
              <div className="font-display text-2xl font-semibold tracking-tight text-white">
                {s.k}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                {s.v}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: Compass,
      n: "01",
      t: "Pick a quest",
      d: "Browse small developer challenges across backend, frontend, and DevOps.",
    },
    {
      icon: Code2,
      n: "02",
      t: "Build the thing",
      d: "Turn a small idea into a working project you can actually finish.",
    },
    {
      icon: Send,
      n: "03",
      t: "Submit progress",
      d: "Add your GitHub link and a few notes about what you learned.",
    },
    {
      icon: Sparkles,
      n: "04",
      t: "Level up",
      d: "Bookmark quests, track your work, and keep shipping the small things.",
    },
  ];

  return (
    <section className="mx-auto max-w-[1320px] px-4 pb-24">
      <SectionLabel className="mb-6">how.devquest.works</SectionLabel>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <GlassPanel key={s.n} className="relative p-5">
            <CornerCrosses />
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">
                step.{s.n}
              </div>
              <s.icon className="h-4 w-4 text-cyan-300/70" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-white">
              {s.t}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{s.d}</p>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}

export function FeaturesGrid() {
  const features = [
    {
      icon: Layers,
      title: "Public quest board",
      body: "SSG / ISR-rendered list of curated developer challenges, filterable by category and difficulty.",
    },
    {
      icon: BookOpen,
      title: "Quest detail + submissions",
      body: "Static detail pages with server-rendered submission feeds and a GitHub-first submission flow.",
    },
    {
      icon: Zap,
      title: "Dashboard that always feels fresh",
      body: "Dynamic-rendered dashboard with full CRUD over quests, submissions, and bookmarks.",
    },
    {
      icon: Shield,
      title: "API + Server Actions",
      body: "Same data layer exposed via Route Handlers for external tools and Server Actions for forms.",
    },
  ];

  return (
    <section className="mx-auto max-w-[1320px] px-4 pb-24">
      <SectionLabel className="mb-6">features.built.in</SectionLabel>
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden border border-white/10 bg-white/[0.025] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.04]"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-300/0 blur-2xl transition group-hover:bg-cyan-300/10" />
            <div className="relative flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-cyan-300/30 bg-cyan-300/5 text-cyan-200">
                <f.icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{f.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturedQuests({ featured }: { featured: Featured }) {
  return (
    <section className="mx-auto max-w-[1320px] px-4 pb-24">
      <div className="mb-6 flex items-end justify-between gap-4">
        <SectionLabel className="mb-0 max-w-md">featured.quests</SectionLabel>
        <Link
          href="/quests"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 transition hover:text-cyan-300"
        >
          view all →
        </Link>
      </div>
      {featured.length === 0 ? (
        <GlassPanel className="p-8 text-center text-sm text-slate-400">
          No featured quests yet.
        </GlassPanel>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((quest) => (
            <QuestCard
              key={quest.id}
              title={quest.title}
              slug={quest.slug}
              description={quest.description}
              category={quest.category}
              difficulty={quest.difficulty}
              status={quest.status}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 pb-24">
      <GlassPanel className="relative overflow-hidden p-10 md:p-16">
        <CornerCrosses />
        <div
          className="absolute inset-0 blueprint-grid opacity-30"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-80 w-80 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--cyan-accent) 22%, transparent), transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">
            cta.final
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
            Your next side project is a{" "}
            <span className="text-cyan-300">quest</span>.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-slate-400 md:text-base">
            Pick a small idea, build it in a weekend, submit your repo. Keep
            shipping the small things.
          </p>
          <Hairline className="my-6 max-w-xl" />
          <div className="flex flex-wrap gap-2">
            <Link
              href="/quests"
              className="inline-flex items-center gap-2 border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 font-mono text-[12px] font-medium text-cyan-200 transition hover:bg-cyan-300/20"
            >
              Browse Quests <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[12px] font-medium text-slate-200 transition hover:bg-white/[0.08]"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
