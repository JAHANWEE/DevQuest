import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const quests = [
  {
    title: "Build a REST API with CRUD",
    slug: "build-a-rest-api-with-crud",
    description:
      "Design and build a small REST API with create, read, update, and delete endpoints. Use any language you like. Add proper status codes, validation, and a short README. Focus on clarity over complexity.",
    difficulty: "INTERMEDIATE" as const,
    category: "Backend",
    status: "IN_PROGRESS" as const,
    isFeatured: true,
  },
  {
    title: "Create a Portfolio Landing Page",
    slug: "create-a-portfolio-landing-page",
    description:
      "Build a single-page portfolio that introduces you, lists a few projects, and links to your social profiles. Keep it minimal, responsive, and accessible. Deploy it somewhere public when done.",
    difficulty: "BEGINNER" as const,
    category: "Frontend",
    status: "TODO" as const,
    isFeatured: true,
  },
  {
    title: "Build a Notes App with Database",
    slug: "build-a-notes-app-with-database",
    description:
      "Create a tiny notes app where users can create, edit, and delete notes. Use a real database, not localStorage. Add search and a soft delete flow. Keep the UI calm and readable.",
    difficulty: "INTERMEDIATE" as const,
    category: "Full Stack",
    status: "TODO" as const,
    isFeatured: true,
  },
  {
    title: "Learn Server Actions",
    slug: "learn-server-actions",
    description:
      "Build a small form that uses Server Actions to mutate data on the server. Compare the experience against a traditional API route. Write down what feels easier and what felt confusing.",
    difficulty: "INTERMEDIATE" as const,
    category: "Next.js",
    status: "TODO" as const,
    isFeatured: false,
  },
  {
    title: "Deploy a Next.js App",
    slug: "deploy-a-nextjs-app",
    description:
      "Take any small Next.js project and ship it to a public URL. Set environment variables, set up a database if needed, and verify the deployed version matches local behavior. Write a deployment note for your future self.",
    difficulty: "BEGINNER" as const,
    category: "DevOps",
    status: "COMPLETED" as const,
    isFeatured: false,
  },
  {
    title: "Build a CLI Habit Tracker",
    slug: "build-a-cli-habit-tracker",
    description:
      "Make a tiny command line habit tracker. It should let you add habits, mark them done for today, and show a simple streak. Store data in a local JSON file. Add a few small flags and friendly output.",
    difficulty: "BEGINNER" as const,
    category: "CLI",
    status: "TODO" as const,
    isFeatured: false,
  },
  {
    title: "Create a GitHub Profile README",
    slug: "create-a-github-profile-readme",
    description:
      "Write a clean GitHub profile README that introduces you, lists what you are currently learning, and links to a few of your projects. Use a calm layout. Keep it human, not a wall of badges.",
    difficulty: "BEGINNER" as const,
    category: "Profile",
    status: "COMPLETED" as const,
    isFeatured: true,
  },
  {
    title: "Build a Small Blog with ISR",
    slug: "build-a-small-blog-with-isr",
    description:
      "Build a small blog that uses Incremental Static Regeneration. Posts should be cached, regenerated in the background, and revalidated on demand when you publish a new one. Keep routing and data fetching simple.",
    difficulty: "ADVANCED" as const,
    category: "Next.js",
    status: "TODO" as const,
    isFeatured: false,
  },
];

async function main() {
  console.log("Resetting DevQuest data...");

  // Clear old data safely before inserting fresh demo data.
  await prisma.submission.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.quest.deleteMany();

  for (const quest of quests) {
    await prisma.quest.create({ data: quest });
  }

  // Seed a small bookmark and submission so the dashboard is not empty.
  const featured = await prisma.quest.findFirst({
    where: { slug: "build-a-notes-app-with-database" },
  });

  if (featured) {
    await prisma.bookmark.create({
      data: { questId: featured.id },
    });
    await prisma.submission.create({
      data: {
        questId: featured.id,
        name: "Maya R.",
        githubUrl: "https://github.com/example/notes-app",
        notes:
          "Used Prisma + SQLite. Added search and soft delete. Wrote a tiny seed script for demo data.",
      },
    });
  }

  console.log(`Seeded ${quests.length} quests.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
