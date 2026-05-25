import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Home, Layers, Search, GitCompare, Heart, Check } from "lucide-react";
import { useEasypick } from "@/lib/easypick-context";

const steps = [
  { key: "mode", label: "Mode", icon: Layers, paths: ["/mode", "/quick", "/smart"] },
  { key: "results", label: "Results", icon: Search, paths: ["/results"] },
  { key: "compare", label: "Compare", icon: GitCompare, paths: ["/compare"] },
  { key: "choose", label: "Choose", icon: Heart, paths: ["/choose", "/order"] },
];

export function BottomNav() {
  const loc = useLocation();
  const nav = useNavigate();
  const { reset, mode, mood, prefs, compare, finalChoice } = useEasypick();
  const activeIdx = steps.findIndex((s) =>
    s.paths.some((p) => loc.pathname.startsWith(p))
  );

  const moodReady = mode === "quick" ? !!mood : mode === "smart" ? !!prefs : false;
  const compareReady = compare.length === 3;
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
    if (key === "mode") nav({ to: "/mode" });
    else if (key === "results") nav({ to: "/results" });
    else if (key === "compare") nav({ to: "/compare" });
    else if (key === "choose") nav({ to: "/choose" });
  };

  return (
    <nav className="fixed inset-x-0 bottom-4 z-20 mx-auto flex max-w-6xl items-center justify-between gap-2 px-4">
      <div className="glass flex items-center gap-2 rounded-full p-2 shadow-soft">
        <Link
          to="/"
          onClick={() => reset()}
          className="flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-primary-soft"
        >
          <Home className="h-4 w-4" />
          HOME
        </Link>
      </div>

      <div className="glass flex flex-1 items-center justify-around gap-1 rounded-full px-3 py-2 shadow-soft">
        {steps.map((s, i) => {
          const isDone = activeIdx > i;
          const isActive = activeIdx === i;
          const enabled = canGo(s.key);
          return (
            <div key={s.key} className="flex flex-1 items-center gap-2 justify-center">
              <button
                onClick={() => goto(s.key)}
                disabled={!enabled}
                className={`flex min-h-[44px] items-center gap-2 rounded-full px-3 py-1.5 transition ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : isDone
                      ? "text-primary hover:bg-primary-soft"
                      : enabled
                        ? "text-foreground/70 hover:bg-primary-soft"
                        : "cursor-not-allowed text-muted-foreground/50"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-primary-foreground/20"
                      : isDone
                        ? "bg-primary-soft text-primary"
                        : "border border-border"
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className="text-sm font-semibold">{s.label}</span>
              </button>
              {i < steps.length - 1 && <span className="h-px w-4 bg-border" />}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
