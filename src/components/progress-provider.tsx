"use client";

import * as React from "react";

const STORAGE_KEY = "agent20:progress:v1";

type ProgressState = Readonly<Record<string, boolean>>;

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

function readStored(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as ProgressState;
    }
  } catch {
    // Private windows and blocked site data both land here — start empty.
  }
  return {};
}

interface ProgressProviderProps {
  readonly total: number;
  readonly children: React.ReactNode;
}

export function ProgressProvider({ total, children }: ProgressProviderProps) {
  const [done, setDone] = React.useState<ProgressState>({});

  // Read after mount so the server and first client render agree.
  React.useEffect(() => {
    setDone(readStored());
  }, []);

  const toggle = React.useCallback((id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Progress stays in memory for this visit; nothing else to do.
      }
      return next;
    });
  }, []);

  const reset = React.useCallback(() => {
    setDone({});
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore — the in-memory reset already happened.
    }
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
