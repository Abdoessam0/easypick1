import { createContext, useContext, useState, type ReactNode } from "react";
import type { Mood, Prefs } from "./meals";

export type FlowMode = "quick" | "smart" | null;

type EasypickState = {
  mode: FlowMode;
  mood: Mood | null;
  prefs: Prefs;
  compare: string[]; // meal ids, max 3
  finalChoice: string | null;
  isRotatedView: boolean;
};

type EasypickCtx = EasypickState & {
  setMode: (m: FlowMode) => void;
  changeMode: () => void;
  setMood: (m: Mood | null) => void;
  setPrefs: (p: Prefs) => void;
  toggleCompare: (id: string) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  setFinalChoice: (id: string | null) => void;
  toggleRotate: () => void;
  restartSelection: () => void;
  reset: () => void;
};

const defaultPrefs: Prefs = { protein: 1, calories: 1, sugar: 1, energy: 1 };

const MAX_COMPARE = 3;

const Ctx = createContext<EasypickCtx | null>(null);

export function EasypickProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<FlowMode>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [compare, setCompare] = useState<string[]>([]);
  const [finalChoice, setFinalChoice] = useState<string | null>(null);
  const [isRotatedView, setIsRotated] = useState(false);

  const toggleCompare = (id: string) => {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  };

  const clearSelection = () => {
    setMood(null);
    setPrefs(defaultPrefs);
    setCompare([]);
    setFinalChoice(null);
  };

  const value: EasypickCtx = {
    mode,
    mood,
    prefs,
    compare,
    finalChoice,
    isRotatedView,
    setMode,
    changeMode: () => {
      clearSelection();
      setMode(null);
    },
    setMood,
    setPrefs,
    toggleCompare,
    removeCompare: (id) => setCompare((p) => p.filter((x) => x !== id)),
    clearCompare: () => setCompare([]),
    setFinalChoice,
    toggleRotate: () => setIsRotated((v) => !v),
    restartSelection: clearSelection,
    reset: () => {
      setMode(null);
      clearSelection();
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEasypick() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useEasypick must be used inside EasypickProvider");
  return v;
}
