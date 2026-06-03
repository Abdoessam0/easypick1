import { useLocation } from "wouter";
import { Zap, RefreshCw, ArrowLeftRight } from "lucide-react";
import { SmartPickIcon } from "./SmartPickIcon";
import { useEasypick } from "@/lib/easypick-context";

export function ModeStatusBar() {
  const { mode, restartSelection, changeMode } = useEasypick();
  const [, navigate] = useLocation();

  if (!mode) return null;

  const isSmart = mode === "smart";
  const label = isSmart ? "Smart Pick" : "Quick Pick";

  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 px-5 py-2.5 shadow-soft">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft">
          {isSmart ? (
            <SmartPickIcon className="h-4 w-4 text-primary" />
          ) : (
            <Zap className="h-3.5 w-3.5 text-primary" />
          )}
        </div>
        <div className="leading-tight">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current mode</div>
          <div className="text-sm font-bold text-foreground">{label}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            changeMode();
            navigate("/mode");
          }}
          className="flex min-h-[36px] items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-soft transition hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
        >
          <ArrowLeftRight className="h-3.5 w-3.5" />
          Change mode
        </button>
        <button
          onClick={() => {
            restartSelection();
            navigate(isSmart ? "/smart" : "/quick");
          }}
          className="flex min-h-[36px] items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Restart
        </button>
      </div>
    </div>
  );
}
