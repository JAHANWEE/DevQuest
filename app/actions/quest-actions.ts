// Server Actions are used here because these mutations come directly from forms
// inside our Next.js UI. API Routes are still available separately for external/
// programmatic CRUD access (e.g. /api/quests, /api/submissions, /api/bookmarks).

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import {
  asString,
  isDifficulty,
  isStatus,
  isValidUrl,
  required,
} from "@/lib/validations";

export type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

async function uniqueSlug(base: string, ignoreId?: string) {
  let candidate = base;
  let suffix = 1;
  // Avoid infinite loops by hard capping.
  while (suffix < 50) {
    const existing = await prisma.quest.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === ignoreId) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  return `${base}-${Date.now()}`;
}

export async function createQuestAction(
  _prev: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const title = asString(formData.get("title"));
  const description = asString(formData.get("description"));
  const category = asString(formData.get("category"));
  const difficulty = asString(formData.get("difficulty"));
  const status = asString(formData.get("status")) || "TODO";
  const isFeatured = formData.get("isFeatured") === "on";

  const fieldErrors: Record<string, string> = {};
  if (!required(title)) fieldErrors.title = "Title is required.";
  if (!required(description)) fieldErrors.description = "Description is required.";
  if (!required(category)) fieldErrors.category = "Category is required.";
  if (!isDifficulty(difficulty)) fieldErrors.difficulty = "Choose a valid difficulty.";
  if (!isStatus(status)) fieldErrors.status = "Choose a valid status.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  try {
    const baseSlug = slugify(title) || "quest";
    const slug = await uniqueSlug(baseSlug);
    await prisma.quest.create({
      data: {
        title,
        description,
        category,
        difficulty: difficulty as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
        status: status as "TODO" | "IN_PROGRESS" | "COMPLETED",
        isFeatured,
        slug,
      },
    });
  } catch (error) {
    console.error("createQuestAction error", error);
    return {
      ok: false,
      message: "Could not create the quest. Please try again.",
    };
  }

  revalidatePath("/quests");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/quests");
  redirect("/dashboard/quests");
}

export async function updateQuestAction(
  _prev: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const id = asString(formData.get("id"));
  const title = asString(formData.get("title"));
  const description = asString(formData.get("description"));
  const category = asString(formData.get("category"));
  const difficulty = asString(formData.get("difficulty"));
  const status = asString(formData.get("status"));
  const isFeatured = formData.get("isFeatured") === "on";

  const fieldErrors: Record<string, string> = {};
  if (!required(id)) fieldErrors.id = "Missing quest id.";
  if (!required(title)) fieldErrors.title = "Title is required.";
  if (!required(description)) fieldErrors.description = "Description is required.";
  if (!required(category)) fieldErrors.category = "Category is required.";
  if (!isDifficulty(difficulty)) fieldErrors.difficulty = "Choose a valid difficulty.";
  if (!isStatus(status)) fieldErrors.status = "Choose a valid status.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const existing = await prisma.quest.findUnique({ where: { id } });
  if (!existing) {
    return { ok: false, message: "That quest could not be found." };
  }

  try {
    const baseSlug = slugify(title) || existing.slug;
    const slug =
      baseSlug === existing.slug ? existing.slug : await uniqueSlug(baseSlug, id);

    await prisma.quest.update({
      where: { id },
      data: {
        title,
        description,
        category,
        difficulty: difficulty as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
        status: status as "TODO" | "IN_PROGRESS" | "COMPLETED",
        isFeatured,
        slug,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        ok: false,
        message: "A quest with that title already exists.",
      };
    }
    console.error("updateQuestAction error", error);
    return {
      ok: false,
      message: "Could not update the quest. Please try again.",
    };
  }

  revalidatePath("/quests");
  revalidatePath(`/quests/${existing.slug}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/quests");
  redirect("/dashboard/quests");
}

export async function updateQuestStatusAction(formData: FormData) {
  const id = asString(formData.get("id"));
  const status = asString(formData.get("status"));
  if (!required(id) || !isStatus(status)) return;

  const existing = await prisma.quest.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.quest.update({
    where: { id },
    data: { status: status as "TODO" | "IN_PROGRESS" | "COMPLETED" },
  });

  revalidatePath("/quests");
  revalidatePath(`/quests/${existing.slug}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/quests");
}

export async function deleteQuestAction(formData: FormData) {
  const id = asString(formData.get("id"));
  if (!required(id)) return;

  const existing = await prisma.quest.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.quest.delete({ where: { id } });

  revalidatePath("/quests");
  revalidatePath(`/quests/${existing.slug}`);
  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/quests");
}

export async function createSubmissionAction(
  _prev: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const questId = asString(formData.get("questId"));
  const name = asString(formData.get("name"));
  const githubUrl = asString(formData.get("githubUrl"));
  const notes = asString(formData.get("notes"));

  const fieldErrors: Record<string, string> = {};
  if (!required(questId)) fieldErrors.questId = "Missing quest reference.";
  if (!required(name)) fieldErrors.name = "Your name is required.";
  if (!required(githubUrl) || !isValidUrl(githubUrl))
    fieldErrors.githubUrl = "A valid GitHub URL is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const quest = await prisma.quest.findUnique({
    where: { id: questId },
    select: { id: true, slug: true },
  });
  if (!quest) {
    return { ok: false, message: "That quest could not be found." };
  }

  try {
    await prisma.submission.create({
      data: {
        questId,
        name,
        githubUrl,
        notes: notes || null,
      },
    });
  } catch (error) {
    console.error("createSubmissionAction error", error);
    return {
      ok: false,
      message: "Could not save the submission. Please try again.",
    };
  }

  revalidatePath(`/quests/${quest.slug}`);
  revalidatePath("/dashboard/submissions");
  revalidatePath("/dashboard");

  return {
    ok: true,
    message: "Submission received. Nice work.",
  };
}

export async function bookmarkQuestAction(formData: FormData) {
  const questId = asString(formData.get("questId"));
  if (!required(questId)) return;

  const quest = await prisma.quest.findUnique({ where: { id: questId } });
  if (!quest) return;

  const existing = await prisma.bookmark.findFirst({ where: { questId } });
  if (!existing) {
    await prisma.bookmark.create({ data: { questId } });
  }

  revalidatePath(`/quests/${quest.slug}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/quests");
}

export async function deleteBookmarkAction(formData: FormData) {
  const questId = asString(formData.get("questId"));
  if (!required(questId)) return;

  const quest = await prisma.quest.findUnique({ where: { id: questId } });
  await prisma.bookmark.deleteMany({ where: { questId } });

  revalidatePath(`/quests/${quest?.slug ?? ""}`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/quests");
}
