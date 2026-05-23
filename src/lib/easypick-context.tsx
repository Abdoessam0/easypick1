import { createContext, useContext, useState, type ReactNode } from "react";
import type { Mood, Prefs } from "./meals";

export type FlowMode = "quick" | "smart" | null;

type EasypickState = {
  mode: FlowMode;
  mood: Mood | null;
  prefs: Prefs;
  compare: string[]; // meal ids, max 2
  finalChoice: string | null;
};

type EasypickCtx = EasypickState & {
  setMode: (m: FlowMode) => void;
  setMood: (m: Mood | null) => void;
  setPrefs: (p: Prefs) => void;
  toggleCompare: (id: string) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  setFinalChoice: (id: string | null) => void;
  reset: () => void;
};

const defaultPrefs: Prefs = { protein: 1, calories: 1, sugar: 1, energy: 1 };

const Ctx = createContext<EasypickCtx | null>(null);

export function EasypickProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<FlowMode>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [compare, setCompare] = useState<string[]>([]);
  const [finalChoice, setFinalChoice] = useState<string | null>(null);

  const toggleCompare = (id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const value: EasypickCtx = {
    mode,
    mood,
    prefs,
    compare,
    finalChoice,
    setMode,
    setMood,
    setPrefs,
    toggleCompare,
    removeCompare: (id) => setCompare((p) => p.filter((x) => x !== id)),
    clearCompare: () => setCompare([]),
    setFinalChoice,
    reset: () => {
      setMode(null);
      setMood(null);
      setPrefs(defaultPrefs);
      setCompare([]);
      setFinalChoice(null);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEasypick() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useEasypick must be used inside EasypickProvider");
  return v;
}
