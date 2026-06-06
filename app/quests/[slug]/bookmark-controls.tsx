"use client";

import { useState, useTransition } from "react";
import {
  bookmarkQuestAction,
  deleteBookmarkAction,
} from "@/app/actions/quest-actions";

export function BookmarkControls({
  questId,
  initialBookmarked,
  count,
}: {
  questId: string;
  initialBookmarked: boolean;
  count: number;
}) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !bookmarked;
    setBookmarked(next);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("questId", questId);
        if (next) {
          await bookmarkQuestAction(formData);
        } else {
          await deleteBookmarkAction(formData);
        }
      } catch (error) {
        setBookmarked(!next);
        console.error("Bookmark toggle error", error);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className={
        "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm transition disabled:opacity-60 " +
        (bookmarked
          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200"
          : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10")
      }
      aria-pressed={bookmarked}
    >
      <span aria-hidden>{bookmarked ? "★" : "☆"}</span>
      {bookmarked ? "Bookmarked" : "Bookmark this quest"}
      <span className="text-xs text-slate-500">· {count}</span>
    </button>
  );
}
