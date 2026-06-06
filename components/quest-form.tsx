"use client";

import { useActionState } from "react";
import type { Difficulty, QuestStatus } from "@prisma/client";
import {
  createQuestAction,
  updateQuestAction,
  type ActionState,
} from "@/app/actions/quest-actions";
import { FormField } from "@/components/form-field";
import { TextareaField } from "@/components/textarea-field";
import { SubmitButton } from "@/components/submit-button";

const initialState: ActionState = { ok: false, message: "" };

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

const statuses: { value: QuestStatus; label: string }[] = [
  { value: "TODO", label: "Todo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

type QuestFormProps =
  | {
      mode: "create";
      quest?: undefined;
    }
  | {
      mode: "edit";
      quest: {
        id: string;
        title: string;
        description: string;
        category: string;
        difficulty: Difficulty;
        status: QuestStatus;
        isFeatured: boolean;
      };
    };

export function QuestForm(props: QuestFormProps) {
  const [state, formAction] = useActionState(
    props.mode === "create" ? createQuestAction : updateQuestAction,
    initialState
  );

  const values = props.mode === "edit" ? props.quest : null;
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
      {values ? <input type="hidden" name="id" value={values.id} /> : null}

      <div className="sm:col-span-2">
        <FormField
          label="Title"
          name="title"
          placeholder="e.g. Build a CLI habit tracker"
          required
          defaultValue={values?.title}
          {...(errors.title ? { "aria-invalid": true } : {})}
        />
        {errors.title ? (
          <p className="mt-1.5 text-xs text-rose-300">{errors.title}</p>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <TextareaField
          label="Description"
          name="description"
          placeholder="What should someone build, and what does done look like?"
          required
          defaultValue={values?.description}
          {...(errors.description ? { "aria-invalid": true } : {})}
        />
        {errors.description ? (
          <p className="mt-1.5 text-xs text-rose-300">
            {errors.description}
          </p>
        ) : null}
      </div>

      <div>
        <FormField
          label="Category"
          name="category"
          placeholder="e.g. Frontend, Backend, DevOps"
          required
          defaultValue={values?.category}
          {...(errors.category ? { "aria-invalid": true } : {})}
        />
        {errors.category ? (
          <p className="mt-1.5 text-xs text-rose-300">{errors.category}</p>
        ) : null}
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-200">
          Difficulty
        </span>
        <select
          name="difficulty"
          defaultValue={values?.difficulty ?? "BEGINNER"}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
        >
          {difficulties.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.difficulty ? (
          <p className="mt-1.5 text-xs text-rose-300">{errors.difficulty}</p>
        ) : null}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-200">
          Status
        </span>
        <select
          name="status"
          defaultValue={values?.status ?? "TODO"}
          className="w-full rounded-xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
        >
          {statuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.status ? (
          <p className="mt-1.5 text-xs text-rose-300">{errors.status}</p>
        ) : null}
      </label>

      <label className="flex items-center gap-3 self-end rounded-xl border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm text-slate-200">
        <input
          type="checkbox"
          name="isFeatured"
          defaultChecked={values?.isFeatured ?? false}
          className="h-4 w-4 rounded border-white/20 bg-black/40 text-cyan-300 focus:ring-cyan-400/30"
        />
        <span>Feature on the home page</span>
      </label>

      <div className="sm:col-span-2 flex items-center justify-between gap-3">
        <p
          className={
            "text-xs " + (state.ok ? "text-emerald-300" : "text-slate-500")
          }
        >
          {state.message || "Your quest will appear on the public board."}
        </p>
        <SubmitButton
          pendingLabel={props.mode === "create" ? "Creating..." : "Saving..."}
        >
          {props.mode === "create" ? "Create quest" : "Save changes"}
        </SubmitButton>
      </div>
    </form>
  );
}
