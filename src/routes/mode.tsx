import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { PageTitle } from "@/components/easypick/PageTitle";
import { useEasypick } from "@/lib/easypick-context";
import {
  Brain,
  Zap,
  Target,
  BarChart3,
  HeartPulse,
  Clock,
  Utensils,
  Smile,
  ChevronRight,
  Timer,
} from "lucide-react";

export const Route = createFileRoute("/mode")({
  component: ModePage,
});

function ModePage() {
  const { setMode } = useEasypick();
  const nav = useNavigate();

  return (
    <Shell showHeaderMode={false}>
      <PageTitle
        title="How would you like to"
        accent="choose?"
        subtitle="Two paths to your perfect meal — pick the one that fits your vibe."
      />

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <ModeCard
          name="SMART"
          accent="PICK"
          color="primary"
          icon={<Brain className="h-12 w-12 text-primary" />}
          desc="Answer a few simple questions and we'll personalize the results for you."
          benefits={[
            { icon: Target, label: "Personalized\nto You" },
            { icon: BarChart3, label: "Matches Your\nGoals" },
            { icon: HeartPulse, label: "Healthier\nChoices" },
            { icon: Clock, label: "Better\nDecisions" },
          ]}
          cta="START SMART PICK"
          onClick={() => {
            setMode("smart");
            nav({ to: "/smart" });
          }}
        />
        <ModeCard
          name="QUICK"
          accent="PICK"
          color="primary"
          icon={<Zap className="h-12 w-12 text-primary" />}
          desc="Tell us what you're in the mood for and we'll narrow it down fast."
          benefits={[
            { icon: Timer, label: "Super\nFast" },
            { icon: Utensils, label: "Curated\nOptions" },
            { icon: Zap, label: "Easy\n& Simple" },
            { icon: Smile, label: "Less Stress\nMore Joy" },
          ]}
          cta="START QUICK PICK"
          onClick={() => {
            setMode("quick");
            nav({ to: "/quick" });
          }}
        />
      </div>

      <div className="mx-auto mt-8 max-w-md text-center text-sm text-muted-foreground">
        You can switch modes anytime — <Link to="/" className="text-primary font-semibold">restart here</Link>.
      </div>
    </Shell>
  );
}

function ModeCard({
  name,
  accent,
  icon,
  desc,
  benefits,
  cta,
  onClick,
}: {
  name: string;
  accent: string;
  color: string;
  icon: React.ReactNode;
  desc: string;
  benefits: { icon: React.ElementType; label: string }[];
  cta: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="glass group relative flex flex-col gap-6 rounded-[2rem] p-8 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft ring-primary-soft">
          {icon}
        </div>
        <div>
          <h3 className="text-3xl font-extrabold tracking-tight">
            {name} <span className="text-gradient-primary">{accent}</span>
          </h3>
        </div>
      </div>

      <p className="text-base text-muted-foreground">{desc}</p>

      <div className="h-px bg-border" />

      <div className="grid grid-cols-4 gap-3">
        {benefits.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <Icon className="h-7 w-7 text-primary/80" strokeWidth={1.7} />
            <div className="whitespace-pre-line text-[11px] font-semibold leading-tight text-foreground/80">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-glow group-hover:brightness-110">
        {cta}
        <ChevronRight className="h-5 w-5" />
      </div>
    </button>
  );
}
