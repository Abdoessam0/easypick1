import { useLocation } from "wouter";
import { Brain, Zap, RefreshCw, Repeat } from "lucide-react";
import { useEasypick } from "@/lib/easypick-context";

export function ModeStatusBar() {
  const { mode, restartSelection, changeMode } = useEasypick();
  const [, navigate] = useLocation();

  if (!mode) return null;

  const isSmart = mode === "smart";
  const Icon = isSmart ? Brain : Zap;
  const label = isSmart ? "Smart Pick" : "Quick Pick";

  return (
    <div className="glass mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-full px-4 py-2 shadow-soft">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="leading-tight">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Current mode
          </div>
          <div className="text-sm font-bold text-foreground">{label}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            changeMode();
            navigate("/mode");
          }}
          className="flex min-h-[40px] items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-soft transition hover:bg-primary-soft"
        >
          <Repeat className="h-4 w-4" />
          Change mode
        </button>
        <button
          onClick={() => {
            restartSelection();
            navigate(isSmart ? "/smart" : "/quick");
          }}
          className="flex min-h-[40px] items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
        >
          <RefreshCw className="h-4 w-4" />
          Restart selection
        </button>
      </div>
    </div>
  );
}
