import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/section-heading";
import { GlassCard } from "@/components/glass-card";
import { QuestForm } from "@/components/quest-form";

// SSR: dashboard data should always be fresh at request time.
export const dynamic = "force-dynamic";

export default async function EditQuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quest = await prisma.quest.findUnique({ where: { id } });
  if (!quest) notFound();

  return (
    <>
      <SectionHeading
        title="Edit Quest"
        subtitle="Update the details. The slug will refresh if the title changes."
      />
      <GlassCard className="p-6 sm:p-8">
        <QuestForm
          mode="edit"
          quest={{
            id: quest.id,
            title: quest.title,
            description: quest.description,
            category: quest.category,
            difficulty: quest.difficulty,
            status: quest.status,
            isFeatured: quest.isFeatured,
          }}
        />
      </GlassCard>
    </>
  );
}
