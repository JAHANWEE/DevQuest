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

// GET /api/quests
export async function GET() {
  try {
    const quests = await prisma.quest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { submissions: true, bookmarks: true },
        },
      },
    });
    return successResponse("Quests fetched successfully", quests);
  } catch (error) {
    console.error("GET /api/quests error", error);
    return errorResponse("Could not fetch quests", "Database error", 500);
  }
}

// POST /api/quests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return errorResponse("Invalid JSON body", "Body must be JSON", 400);
    }

    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description =
      typeof body.description === "string" ? body.description.trim() : "";
    const category =
      typeof body.category === "string" ? body.category.trim() : "";
    const difficulty = typeof body.difficulty === "string" ? body.difficulty : "";
    const status = typeof body.status === "string" ? body.status : "TODO";
    const isFeatured =
      typeof body.isFeatured === "boolean" ? body.isFeatured : false;

    if (!required(title))
      return errorResponse("Validation failed", "Title is required", 400);
    if (!required(description))
      return errorResponse(
        "Validation failed",
        "Description is required",
        400
      );
    if (!required(category))
      return errorResponse("Validation failed", "Category is required", 400);
    if (!isDifficulty(difficulty))
      return errorResponse(
        "Validation failed",
        "Difficulty must be BEGINNER, INTERMEDIATE, or ADVANCED",
        400
      );
    if (!isStatus(status))
      return errorResponse(
        "Validation failed",
        "Status must be TODO, IN_PROGRESS, or COMPLETED",
        400
      );

    const baseSlug = slugify(title) || "quest";
    const slug = await uniqueSlug(baseSlug);

    const quest = await prisma.quest.create({
      data: { title, description, category, difficulty, status, isFeatured, slug },
    });

    return successResponse("Quest created successfully", quest, 201);
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
    console.error("POST /api/quests error", error);
    return errorResponse("Could not create quest", "Server error", 500);
  }
}
