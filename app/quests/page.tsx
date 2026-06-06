import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { QuestCard } from "@/components/quest-card";
import { EmptyState } from "@/components/empty-state";
import { SiteShell } from "@/components/site-header";

// ISR: the public quest board is cached and regenerated every 60 seconds.
export const revalidate = 60;

export default async function QuestsPage() {
  const quests = await prisma.quest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <SiteShell>
      <PageShell>
        <SectionHeading
          title="Quest Board"
          subtitle="Browse small developer challenges and pick what you want to build next."
        />

        {quests.length === 0 ? (
          <EmptyState
            title="No quests found"
            description="Create your first developer quest from the dashboard."
            cta={{ href: "/dashboard/quests/new", label: "Create a quest" }}
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quests.map((quest) => (
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
      </PageShell>
    </SiteShell>
  );
}
