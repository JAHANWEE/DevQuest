// API Routes are used for external/programmatic CRUD access. For internal UI
// form mutations inside Next.js, Server Actions are used (see app/actions/).
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { slugify } from "@/lib/slugify";
import {
  isDifficulty,
  isStatus,
  required,
} from "@/lib/validations";

async function uniqueSlug(base: string, ignoreId?: string) {
  let candidate = base;
  let suffix = 1;
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

// GET /api/quests/[id]
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const quest = await prisma.quest.findUnique({
      where: { id },
      include: {
        submissions: { orderBy: { createdAt: "desc" } },
        bookmarks: true,
        _count: {
          select: { submissions: true, bookmarks: true },
        },
      },
    });
    if (!quest) {
      return errorResponse("Quest not found", "No quest with that id", 404);
    }
    return successResponse("Quest fetched successfully", quest);
  } catch (error) {
    console.error("GET /api/quests/[id] error", error);
    return errorResponse("Could not fetch quest", "Server error", 500);
  }
}

// PATCH /api/quests/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return errorResponse("Invalid JSON body", "Body must be JSON", 400);
    }

    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Quest not found", "No quest with that id", 404);
    }

    const data: Prisma.QuestUpdateInput = {};

    if (typeof body.title === "string") {
      const title = body.title.trim();
      if (!required(title))
        return errorResponse("Validation failed", "Title cannot be empty", 400);
      data.title = title;
    }

    if (typeof body.description === "string") {
      const description = body.description.trim();
      if (!required(description))
        return errorResponse(
          "Validation failed",
          "Description cannot be empty",
          400
        );
      data.description = description;
    }

    if (typeof body.category === "string") {
      const category = body.category.trim();
      if (!required(category))
        return errorResponse(
          "Validation failed",
          "Category cannot be empty",
          400
        );
      data.category = category;
    }

    if (typeof body.difficulty === "string") {
      if (!isDifficulty(body.difficulty))
        return errorResponse(
          "Validation failed",
          "Difficulty must be BEGINNER, INTERMEDIATE, or ADVANCED",
          400
        );
      data.difficulty = body.difficulty;
    }

    if (typeof body.status === "string") {
      if (!isStatus(body.status))
        return errorResponse(
          "Validation failed",
          "Status must be TODO, IN_PROGRESS, or COMPLETED",
          400
        );
      data.status = body.status;
    }

    if (typeof body.isFeatured === "boolean") {
      data.isFeatured = body.isFeatured;
    }

    // If title changed, regenerate slug to keep URLs in sync.
    if (typeof data.title === "string" && data.title !== existing.title) {
      const baseSlug = slugify(data.title) || existing.slug;
      data.slug =
        baseSlug === existing.slug
          ? existing.slug
          : await uniqueSlug(baseSlug, id);
    }

    const quest = await prisma.quest.update({ where: { id }, data });
    return successResponse("Quest updated successfully", quest);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return errorResponse(
        "Duplicate quest",
        "A quest with that title already exists",
        409
      );
    }
    console.error("PATCH /api/quests/[id] error", error);
    return errorResponse("Could not update quest", "Server error", 500);
  }
}

// DELETE /api/quests/[id]
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const existing = await prisma.quest.findUnique({ where: { id } });
    if (!existing) {
      return errorResponse("Quest not found", "No quest with that id", 404);
    }
    await prisma.quest.delete({ where: { id } });
    return successResponse("Quest deleted successfully", { id });
  } catch (error) {
    console.error("DELETE /api/quests/[id] error", error);
    return errorResponse("Could not delete quest", "Server error", 500);
  }
}
