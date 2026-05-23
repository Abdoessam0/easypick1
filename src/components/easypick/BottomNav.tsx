import { Link, useLocation } from "@tanstack/react-router";
import { Home, Smile, Search, GitCompare, Heart, Check } from "lucide-react";
import { useEasypick } from "@/lib/easypick-context";

const steps = [
  { key: "mood", label: "Mood", icon: Smile, paths: ["/mode", "/quick", "/smart"] },
  { key: "results", label: "Results", icon: Search, paths: ["/results"] },
  { key: "compare", label: "Compare", icon: GitCompare, paths: ["/compare"] },
  { key: "choose", label: "Choose", icon: Heart, paths: ["/choose", "/order"] },
];

export function BottomNav() {
  const loc = useLocation();
  const { reset } = useEasypick();
  const activeIdx = steps.findIndex((s) =>
    s.paths.some((p) => loc.pathname.startsWith(p))
  );

  return (
    <nav className="fixed inset-x-0 bottom-4 z-20 mx-auto flex max-w-6xl items-center justify-between gap-2 px-6">
      <div className="glass flex items-center gap-2 rounded-full px-2 py-2 shadow-soft">
        <Link
          to="/"
          onClick={() => reset()}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary-soft transition"
        >
          <Home className="h-4 w-4" />
          HOME
        </Link>
      </div>

      <div className="glass flex flex-1 items-center justify-around gap-1 rounded-full px-4 py-2 shadow-soft">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isDone = activeIdx > i;
          const isActive = activeIdx === i;
          return (
            <div key={s.key} className="flex items-center gap-3 flex-1 justify-center">
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : isDone
                      ? "text-primary"
                      : "text-muted-foreground"
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
              </div>
              {i < steps.length - 1 && (
                <span className="h-px w-6 bg-border" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
