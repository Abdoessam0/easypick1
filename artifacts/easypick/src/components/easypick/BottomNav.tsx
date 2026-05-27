import { useLocation } from "wouter";
import { Home, Check } from "lucide-react";
import { useEasypick } from "@/lib/easypick-context";

const steps = [
  { key: "mode", label: "Mood", paths: ["/mode", "/quick", "/smart"] },
  { key: "results", label: "Pick Items", paths: ["/results"] },
  { key: "compare", label: "Compare", paths: ["/compare"] },
  { key: "choose", label: "Choose", paths: ["/choose", "/order"] },
];

export function BottomNav() {
  const [location, navigate] = useLocation();
  const { reset, mode, mood, compare, finalChoice } = useEasypick();
  const activeIdx = steps.findIndex((s) => s.paths.some((p) => location.startsWith(p)));

  const moodReady = mode === "quick" ? !!mood : mode === "smart" ? true : false;
  const compareReady = compare.length === 2;
  const chooseReady = !!finalChoice;

  const canGo = (key: string) => {
    if (key === "mode") return true;
    if (key === "results") return moodReady;
    if (key === "compare") return compareReady;
    if (key === "choose") return chooseReady;
    return false;
  };

  const goto = (key: string) => {
    if (!canGo(key)) return;
    if (key === "mode") navigate("/mode");
    else if (key === "results") navigate("/results");
    else if (key === "compare") navigate("/compare");
    else if (key === "choose") navigate("/choose");
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 px-4 pb-4 pt-2">
      <div className="mx-auto flex max-w-6xl items-center gap-2">
        <button
          onClick={() => { reset(); navigate("/"); }}
          className="glass flex min-h-[52px] items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-foreground transition hover:bg-primary-soft hover:text-primary shadow-soft"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">HOME</span>
        </button>

        <div className="glass flex flex-1 items-center rounded-2xl px-4 py-3 shadow-soft gap-1">
          {steps.map((s, i) => {
            const isDone = activeIdx > i;
            const isActive = activeIdx === i;
            const enabled = canGo(s.key);

            return (
              <div key={s.key} className="flex flex-1 items-center">
                <button
                  onClick={() => goto(s.key)}
                  disabled={!enabled}
                  className={`flex flex-1 items-center gap-2 rounded-xl px-3 py-1.5 transition min-h-[40px] ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : isDone
                        ? "text-primary hover:bg-primary-soft"
                        : enabled
                          ? "text-foreground/60 hover:bg-primary-soft hover:text-primary"
                          : "cursor-not-allowed text-muted-foreground/40"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : isDone
                          ? "bg-primary text-white"
                          : "border border-current"
                    }`}
                  >
                    {isDone ? <Check className="h-3 w-3" /> : i + 1}
                  </span>
                  <span className="text-xs font-semibold truncate">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <span className={`mx-1 h-px w-4 shrink-0 ${isDone ? "bg-primary/40" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
