export function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function required(value: FormDataEntryValue | null | undefined) {
  return typeof value === "string" && value.trim().length > 0;
}

export function asString(value: FormDataEntryValue | null | undefined) {
  if (typeof value !== "string") return "";
  return value.trim();
}

export const DIFFICULTIES = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;
export type DifficultyValue = (typeof DIFFICULTIES)[number];

export const STATUSES = ["TODO", "IN_PROGRESS", "COMPLETED"] as const;
export type StatusValue = (typeof STATUSES)[number];

export function isDifficulty(value: string): value is DifficultyValue {
  return (DIFFICULTIES as readonly string[]).includes(value);
}

export function isStatus(value: string): value is StatusValue {
  return (STATUSES as readonly string[]).includes(value);
}
