import { prisma } from "@/lib/prisma";
import { SiteShell } from "@/components/site-header";
import { LaptopHero } from "@/components/laptop-hero";
import { LandingFloating } from "@/components/landing-floating";
import {
  StatsStrip,
  HowItWorks,
  FeaturesGrid,
  FeaturedQuests,
  FinalCta,
} from "@/components/landing-sections";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, questCount, submissionCount] = await Promise.all([
    prisma.quest.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.quest.count(),
    prisma.submission.count(),
  ]);

  const heroFeatured = featured.slice(0, 4);
  const sectionFeatured = featured.slice(0, 3);

  return (
    <SiteShell>
      <div className="relative">
        <LandingFloating />
        <LaptopHero featured={heroFeatured} />
      </div>

      <StatsStrip questCount={questCount} submissionCount={submissionCount} />
      <HowItWorks />
      <FeaturedQuests featured={sectionFeatured} />
      <FeaturesGrid />
      <FinalCta />
    </SiteShell>
  );
}
