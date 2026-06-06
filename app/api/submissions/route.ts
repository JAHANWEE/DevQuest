// API Routes are used for external/programmatic CRUD access. For internal UI
// form mutations inside Next.js, Server Actions are used (see app/actions/).
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { isValidUrl, required } from "@/lib/validations";

// GET /api/submissions
export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        quest: { select: { id: true, title: true, slug: true } },
      },
    });
    return successResponse("Submissions fetched successfully", submissions);
  } catch (error) {
    console.error("GET /api/submissions error", error);
    return errorResponse(
      "Could not fetch submissions",
      "Server error",
      500
    );
  }
}

// POST /api/submissions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return errorResponse("Invalid JSON body", "Body must be JSON", 400);
    }

    const questId = typeof body.questId === "string" ? body.questId.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const githubUrl =
      typeof body.githubUrl === "string" ? body.githubUrl.trim() : "";
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";

    if (!required(questId))
      return errorResponse("Validation failed", "questId is required", 400);
    if (!required(name))
      return errorResponse("Validation failed", "name is required", 400);
    if (!required(githubUrl) || !isValidUrl(githubUrl))
      return errorResponse(
        "Validation failed",
        "A valid githubUrl is required",
        400
      );

    const quest = await prisma.quest.findUnique({ where: { id: questId } });
    if (!quest) {
      return errorResponse("Quest not found", "No quest with that id", 404);
    }

    const submission = await prisma.submission.create({
      data: {
        questId,
        name,
        githubUrl,
        notes: notes ? notes : null,
      },
    });

    return successResponse("Submission created successfully", submission, 201);
  } catch (error) {
    console.error("POST /api/submissions error", error);
    return errorResponse("Could not create submission", "Server error", 500);
  }
}
