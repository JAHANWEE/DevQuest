"use client";

import { useActionState, useEffect } from "react";
import {
  createSubmissionAction,
  type ActionState,
} from "@/app/actions/quest-actions";
import { FormField } from "@/components/form-field";
import { TextareaField } from "@/components/textarea-field";
import { SubmitButton } from "@/components/submit-button";

const initialState: ActionState = { ok: false, message: "" };

export function SubmissionForm({ questId }: { questId: string }) {
  const [state, formAction] = useActionState(
    createSubmissionAction,
    initialState
  );

  useEffect(() => {
    if (state.ok && typeof window !== "undefined") {
      const form = document.getElementById(
        `submission-form-${questId}`
      ) as HTMLFormElement | null;
      form?.reset();
    }
  }, [state, questId]);

  const errors = state.fieldErrors ?? {};

  return (
    <form
      id={`submission-form-${questId}`}
      action={formAction}
      className="space-y-4"
    >
      <input type="hidden" name="questId" value={questId} />

      <FormField
        label="Your name"
        name="name"
        placeholder="e.g. Sam K."
        required
        {...(errors.name ? { "aria-invalid": true } : {})}
      />
      {errors.name ? (
        <p className="-mt-2 text-xs text-rose-300">{errors.name}</p>
      ) : null}

      <FormField
        label="GitHub repository URL"
        name="githubUrl"
        type="url"
        placeholder="https://github.com/you/project"
        required
        {...(errors.githubUrl ? { "aria-invalid": true } : {})}
      />
      {errors.githubUrl ? (
        <p className="-mt-2 text-xs text-rose-300">{errors.githubUrl}</p>
      ) : null}

      <TextareaField
        label="Notes (optional)"
        name="notes"
        placeholder="A short note about your approach or what you learned."
      />

      <div className="flex items-center justify-between gap-3">
        <p
          className={
            "text-xs " + (state.ok ? "text-emerald-300" : "text-slate-500")
          }
        >
          {state.message || "Submissions are stored with the quest."}
        </p>
        <SubmitButton pendingLabel="Submitting...">Submit work</SubmitButton>
      </div>
    </form>
  );
}
