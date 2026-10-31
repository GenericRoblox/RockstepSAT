import type { AppState } from "./types";
import { initialState } from "./engine";

/**
 * All saving goes through this interface. v1 stores progress on the device.
 * To add accounts later, write a SupabaseAdapter with the same two methods
 * (store AppState as one JSON row per user) and swap it in `storage` below.
 */
export interface StorageAdapter {
  load(): Promise<AppState | null>;
  save(state: AppState): Promise<void>;
}

const KEY = "rockstep-sat:v1";

class LocalAdapter implements StorageAdapter {
  async load(): Promise<AppState | null> {
    try {
      const raw = window.localStorage.getItem(KEY);
      return raw ? migrate(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }
  async save(state: AppState): Promise<void> {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked: progress stays in memory for this visit.
    }
  }
}

export const storage: StorageAdapter = new LocalAdapter();

/** Fill in any fields added after a backup was made. */
export function migrate(raw: unknown): AppState | null {
  if (!raw || typeof raw !== "object" || (raw as AppState).version !== 1) return null;
  const base = initialState();
  const r = raw as Partial<AppState>;
  return {
    ...base,
    ...r,
    streak: { ...base.streak, ...(r.streak ?? {}) },
    settings: { ...base.settings, ...(r.settings ?? {}) },
  } as AppState;
}

export function exportBackup(state: AppState): string {
  return JSON.stringify({ app: "rockstep-sat", exportedAt: new Date().toISOString(), state }, null, 2);
}

export function importBackup(text: string): AppState | null {
  try {
    const parsed = JSON.parse(text);
    return migrate(parsed?.state ?? parsed);
  } catch {
    return null;
  }
}
