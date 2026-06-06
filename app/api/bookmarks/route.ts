// API Routes are used for external/programmatic CRUD access. For internal UI
// form mutations inside Next.js, Server Actions are used (see app/actions/).
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { required } from "@/lib/validations";

// GET /api/bookmarks
export async function GET() {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        quest: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            difficulty: true,
            status: true,
          },
        },
      },
    });
    return successResponse("Bookmarks fetched successfully", bookmarks);
  } catch (error) {
    console.error("GET /api/bookmarks error", error);
    return errorResponse("Could not fetch bookmarks", "Server error", 500);
  }
}

// POST /api/bookmarks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return errorResponse("Invalid JSON body", "Body must be JSON", 400);
    }

    const questId = typeof body.questId === "string" ? body.questId.trim() : "";
    if (!required(questId))
      return errorResponse("Validation failed", "questId is required", 400);

    const quest = await prisma.quest.findUnique({ where: { id: questId } });
    if (!quest) {
      return errorResponse("Quest not found", "No quest with that id", 404);
    }

    const existing = await prisma.bookmark.findFirst({ where: { questId } });
    if (existing) {
      return successResponse("Bookmark already exists", existing, 200);
    }

    const bookmark = await prisma.bookmark.create({ data: { questId } });
    return successResponse("Bookmark created successfully", bookmark, 201);
  } catch (error) {
    console.error("POST /api/bookmarks error", error);
    return errorResponse("Could not create bookmark", "Server error", 500);
  }
}

// DELETE /api/bookmarks
// Body: { questId?: string, bookmarkId?: string }
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return errorResponse("Invalid JSON body", "Body must be JSON", 400);
    }

    const questId =
      typeof body.questId === "string" ? body.questId.trim() : "";
    const bookmarkId =
      typeof body.bookmarkId === "string" ? body.bookmarkId.trim() : "";

    if (!required(questId) && !required(bookmarkId)) {
      return errorResponse(
        "Validation failed",
        "Provide questId or bookmarkId",
        400
      );
    }

    if (bookmarkId) {
      const existing = await prisma.bookmark.findUnique({
        where: { id: bookmarkId },
      });
      if (!existing) {
        return errorResponse(
          "Bookmark not found",
          "No bookmark with that id",
          404
        );
      }
      await prisma.bookmark.delete({ where: { id: bookmarkId } });
      return successResponse("Bookmark deleted successfully", { id: bookmarkId });
    }

    const existing = await prisma.bookmark.findFirst({ where: { questId } });
    if (!existing) {
      return errorResponse(
        "Bookmark not found",
        "No bookmark for that quest",
        404
      );
    }
    await prisma.bookmark.deleteMany({ where: { questId } });
    return successResponse("Bookmark deleted successfully", { questId });
  } catch (error) {
    console.error("DELETE /api/bookmarks error", error);
    return errorResponse("Could not delete bookmark", "Server error", 500);
  }
}
