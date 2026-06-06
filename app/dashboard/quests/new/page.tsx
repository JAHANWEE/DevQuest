import { SectionHeading } from "@/components/section-heading";
import { GlassCard } from "@/components/glass-card";
import { QuestForm } from "@/components/quest-form";

export default function NewQuestPage() {
  return (
    <>
      <SectionHeading
        title="New Quest"
        subtitle="Create a small, clear quest that developers can actually finish."
      />

      <GlassCard className="p-6 sm:p-8">
        <p className="mb-6 rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-3 text-sm text-cyan-100">
          Tip: pick one clear outcome. A good quest has a name, a short
          description, and an obvious &quot;done&quot; state.
        </p>
        <QuestForm mode="create" />
      </GlassCard>
    </>
  );
}
