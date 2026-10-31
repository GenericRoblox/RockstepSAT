import type { Question } from "../types";
import { skillById } from "../curriculum";
import { RW_ITEMS } from "./rw";
import { MATH_ITEMS } from "./math";

export type BankItem = Omit<Question, "id" | "subject" | "source">;

function withIds(items: BankItem[]): Question[] {
  const counters: Record<string, number> = {};
  return items.map((item) => {
    const key = `${item.skill}-${item.level}`;
    counters[key] = (counters[key] ?? 0) + 1;
    return {
      ...item,
      id: `b-${key}-${counters[key]}`,
      subject: skillById(item.skill).subject,
      source: "bank" as const,
    };
  });
}

export const BANK: Question[] = withIds([...RW_ITEMS, ...MATH_ITEMS]);

export const BANK_BY_ID: Record<string, Question> = Object.fromEntries(BANK.map((q) => [q.id, q]));
