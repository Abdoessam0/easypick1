import { Link } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { Logo } from "@/components/easypick/Logo";
import { Users, ChevronRight, Sparkles } from "lucide-react";
import { useEasypick } from "@/lib/easypick-context";

export default function Welcome() {
  const { reset } = useEasypick();
  return (
    <Shell>
      <div className="mx-auto flex max-w-2xl flex-col items-center pt-10 text-center">
        <Logo className="h-12 w-auto mb-2" />

        <h1 className="mt-8 text-[3.5rem] font-extrabold leading-[1.1] tracking-tight md:text-[4.5rem]">
          Welcome to{" "}
          <span className="text-gradient-primary">Easypick</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-md leading-relaxed">
          Let&rsquo;s help you find the perfect meal — fast, smart, and stress-free.
        </p>

        <Link
          to="/mode"
          onClick={() => reset()}
          className="mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-primary px-12 py-5 text-lg font-bold text-primary-foreground shadow-glow transition hover:brightness-110 active:scale-[0.98]"
        >
          Start Choosing <ChevronRight className="h-5 w-5" />
        </Link>

        <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          2 options will be recommended for you
        </p>

        <div className="mt-12 flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur border border-white/80 px-6 py-3.5 shadow-soft text-sm text-foreground/70">
          <Users className="h-4 w-4 text-primary shrink-0" />
          <span>Designed for a shared experience — everyone can explore together</span>
        </div>
      </div>
    </Shell>
  );
}
