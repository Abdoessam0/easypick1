import { Link } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { Logo } from "@/components/easypick/Logo";
import { Users, MousePointerClick, HelpCircle } from "lucide-react";
import { useEasypick } from "@/lib/easypick-context";

export default function Welcome() {
  const { reset } = useEasypick();
  return (
    <Shell>
      <div className="mx-auto flex max-w-5xl flex-col items-center pt-6 text-center">
        <Logo className="h-16 w-auto" />
        <h1 className="mt-6 text-6xl font-extrabold leading-tight tracking-tight md:text-7xl">
          Welcome to <span className="text-gradient-primary">Easypick</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Let&rsquo;s help you find the perfect meal.
        </p>

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">
          How would you like to choose?
        </p>

        <Link
          to="/mode"
          onClick={() => reset()}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
        >
          Start Choosing
        </Link>

        <div className="glass mt-12 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm">
          <Users className="h-4 w-4 text-primary" />
          <span>Designed for a shared experience. Everyone can explore together!</span>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-20">
        <button className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
          <HelpCircle className="h-4 w-4" />
          HELP
        </button>
      </div>
      <div className="fixed bottom-6 right-6 z-20 flex items-center gap-2 text-sm text-muted-foreground">
        <MousePointerClick className="h-5 w-5 text-primary" />
        <span>
          Tap anywhere
          <br />
          to continue
        </span>
      </div>
    </Shell>
  );
}
