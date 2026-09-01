"use client";

import * as React from "react";

const STORAGE_KEY = "agent20:progress:v1";

type ProgressState = Readonly<Record<string, boolean>>;

/**
 * Progress lives in localStorage, which is external to React. `useSyncExternalStore`
 * is the right primitive for that: the server and the hydrating client both see
 * EMPTY, then React re-reads the real value once mounted — no effect, no flash of
 * mismatched markup.
 */
const EMPTY: ProgressState = Object.freeze({});

const listeners = new Set<() => void>();
let cache: ProgressState | null = null;

function load(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as ProgressState;
      }
    }
  } catch {
    // Private windows and blocked site data land here — start empty.
  }
  return EMPTY;
}

function getSnapshot(): ProgressState {
  cache ??= load();
  return cache;
}

function getServerSnapshot(): ProgressState {
  return EMPTY;
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function commit(next: ProgressState): void {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Progress still holds for this visit; nothing else to do.
  }
  for (const listener of listeners) listener();
}

interface ProgressContextValue {
  readonly done: ProgressState;
  readonly count: number;
  readonly total: number;
  readonly toggle: (id: string) => void;
  readonly reset: () => void;
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

export function useProgress(): ProgressContextValue {
  const ctx = React.useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used inside <ProgressProvider>");
  }
  return ctx;
}

interface ProgressProviderProps {
  readonly total: number;
  readonly children: React.ReactNode;
}

export function ProgressProvider({ total, children }: ProgressProviderProps) {
  const done = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggle = React.useCallback((id: string) => {
    const current = getSnapshot();
    commit({ ...current, [id]: !current[id] });
  }, []);

  const reset = React.useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The in-memory reset below still applies.
    }
    cache = EMPTY;
    for (const listener of listeners) listener();
  }, []);

  const count = React.useMemo(
    () => Object.values(done).filter(Boolean).length,
    [done],
  );

  const value = React.useMemo<ProgressContextValue>(
    () => ({ done, count, total, toggle, reset }),
    [done, count, total, toggle, reset],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}
