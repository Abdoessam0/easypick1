import { Link, useLocation } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { Logo } from "./Logo";
import { ModeBadge } from "./ModeBadge";
import { BottomNav } from "./BottomNav";
import type { ReactNode } from "react";

export function Shell({
  children,
  showHeaderMode = true,
}: {
  children: ReactNode;
  showHeaderMode?: boolean;
}) {
  const loc = useLocation();
  const onWelcome = loc.pathname === "/";
  return (
    <div className="bg-canvas relative min-h-screen overflow-hidden">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/3 h-2 w-2 rounded-full bg-primary/40" />

      <header className="relative z-10 flex items-center justify-between px-8 pt-6">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-10 w-auto" />
        </Link>

        <div className="flex-1 flex justify-center">
          {showHeaderMode && !onWelcome && <ModeBadge />}
        </div>

        <button className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
          <Globe className="h-4 w-4" />
          EN
        </button>
      </header>

      <main className="relative z-10 px-8 pb-32 pt-6">{children}</main>

      {!onWelcome && <BottomNav />}
    </div>
  );
}
