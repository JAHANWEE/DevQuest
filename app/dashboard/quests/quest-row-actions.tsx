"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { QuestStatus } from "@prisma/client";
import {
  deleteQuestAction,
  updateQuestStatusAction,
} from "@/app/actions/quest-actions";

const statuses: { value: QuestStatus; label: string }[] = [
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

export function QuestRowActions({
  questId,
  currentStatus,
}: {
  questId: string;
  currentStatus: QuestStatus;
}) {
  const [status, setStatus] = useState<QuestStatus>(currentStatus);
  const [pending, startTransition] = useTransition();

  function handleStatusChange(next: QuestStatus) {
    setStatus(next);
    const formData = new FormData();
    formData.set("id", questId);
    formData.set("status", next);
    startTransition(() => {
      updateQuestStatusAction(formData);
    });
  }

  function handleDelete() {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Delete this quest? This cannot be undone.");
      if (!ok) return;
    }
    const formData = new FormData();
    formData.set("id", questId);
    startTransition(() => {
      deleteQuestAction(formData);
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <select
        value={status}
        onChange={(event) =>
          handleStatusChange(event.target.value as QuestStatus)
        }
        disabled={pending}
        className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-white focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
        aria-label="Change status"
      >
        {statuses.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Link
        href={`/dashboard/quests/${questId}/edit`}
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/10"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="rounded-lg border border-rose-400/30 px-3 py-1.5 text-xs text-rose-300 transition hover:bg-rose-400/10 disabled:opacity-60"
      >
        Delete
      </button>
    </div>
  );
}
