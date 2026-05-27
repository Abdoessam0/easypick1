import { Link, useLocation } from "wouter";
import { Globe, RotateCw } from "lucide-react";
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

  return (
    <div
      className="bg-canvas relative min-h-screen overflow-hidden transition-transform duration-500"
      style={{ transform: isRotatedView ? "rotate(180deg)" : undefined }}
    >
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />

      <header className="relative z-10 flex items-center justify-between gap-3 px-6 pt-5 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          {!onWelcome && (
            <button
              onClick={toggleRotate}
              title="For shared table use"
              className="glass flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary-soft"
            >
              <RotateCw className="h-4 w-4" />
              <span className="hidden sm:inline">Rotate view</span>
            </button>
          )}
          <button className="glass flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Globe className="h-4 w-4" />
            EN
          </button>
        </div>
      </header>

      {showHeaderMode && !onWelcome && mode && (
        <div className="relative z-10 px-6 pt-4 md:px-8">
          <ModeStatusBar />
        </div>
      )}

      <main className="relative z-10 px-6 pb-40 pt-6 md:px-8">{children}</main>

      {!onWelcome && <BottomNav />}
    </div>
  );
}
