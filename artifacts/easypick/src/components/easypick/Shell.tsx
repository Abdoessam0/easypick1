import { Link, useLocation } from "wouter";
import { Globe, RotateCw, ChevronDown, Brain, Zap } from "lucide-react";
import { Logo } from "./Logo";
import { BottomNav } from "./BottomNav";
import { ModeStatusBar } from "./ModeStatusBar";
import { useEasypick } from "@/lib/easypick-context";
import type { ReactNode } from "react";

export function Shell({
  children,
  showHeaderMode = true,
}: {
  children: ReactNode;
  showHeaderMode?: boolean;
}) {
  const [location] = useLocation();
  const onWelcome = location === "/";
  const { isRotatedView, toggleRotate, mode } = useEasypick();

  const isSmart = mode === "smart";
  const ModeIcon = isSmart ? Brain : Zap;
  const modeLabel = isSmart ? "Smart Pick" : "Quick Pick";

  return (
    <div
      className="bg-canvas relative min-h-screen overflow-hidden transition-transform duration-500"
      style={{ transform: isRotatedView ? "rotate(180deg)" : undefined }}
    >
      <header className="relative z-10 flex items-center justify-between gap-3 px-6 pt-5 pb-3 md:px-10">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Logo className="h-9 w-auto" />
        </Link>

        <div className="flex-1 flex justify-center">
          {!onWelcome && mode && (
            <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-soft">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft">
                <ModeIcon className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="uppercase tracking-wide text-primary">{modeLabel}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!onWelcome && (
            <button
              onClick={toggleRotate}
              title="For shared table use"
              className="glass flex min-h-[40px] items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-foreground/70 transition hover:bg-primary-soft hover:text-primary"
            >
              <RotateCw className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Rotate</span>
            </button>
          )}
          <button className="glass flex min-h-[40px] items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-foreground/70">
            <Globe className="h-4 w-4" />
            <span className="text-xs font-semibold">EN</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </header>

      {showHeaderMode && !onWelcome && mode && (
        <div className="relative z-10 px-6 pb-2 md:px-10">
          <ModeStatusBar />
        </div>
      )}

      <main className="relative z-10 px-6 pb-44 pt-4 md:px-10">{children}</main>

      {!onWelcome && <BottomNav />}
    </div>
  );
}
