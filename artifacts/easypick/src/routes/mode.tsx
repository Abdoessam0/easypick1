import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { PageTitle } from "@/components/easypick/PageTitle";
import { useEasypick } from "@/lib/easypick-context";
import {
  Brain,
  Zap,
  Target,
  HeartPulse,
  Sliders,
  GitCompare,
  Timer,
  Utensils,
  Smile,
  Sparkles,
  ChevronRight,
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
        subtitle="Two simple paths to your perfect meal."
      />

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <ModeCard
          name="Quick Pick"
          icon={<Zap className="h-12 w-12 text-primary" />}
          desc="Fast meal suggestions based on mood, time, price, calories, and satiety."
          benefits={[
            { icon: Timer, label: "Fast" },
            { icon: Utensils, label: "Simple" },
            { icon: Sparkles, label: "Curated" },
            { icon: Smile, label: "Less stress" },
          ]}
          cta="Start Quick Pick"
          onClick={() => {
            setMode("quick");
            nav({ to: "/quick" });
          }}
        />
        <ModeCard
          name="Smart Pick"
          icon={<Brain className="h-12 w-12 text-primary" />}
          desc="Personalized suggestions based on nutrition goals, preferences, and detailed filters."
          benefits={[
            { icon: Target, label: "Personalized" },
            { icon: HeartPulse, label: "Health-aware" },
            { icon: Sliders, label: "Better control" },
            { icon: GitCompare, label: "Detailed compare" },
          ]}
          cta="Start Smart Pick"
          onClick={() => {
            setMode("smart");
            nav({ to: "/smart" });
          }}
        />
      </div>
    </Shell>
  );
}

function ModeCard({
  name,
  icon,
  desc,
  benefits,
  cta,
  onClick,
}: {
  name: string;
  icon: React.ReactNode;
  desc: string;
  benefits: { icon: React.ElementType; label: string }[];
  cta: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="glass group relative flex min-h-[420px] flex-col gap-6 rounded-[2rem] p-8 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-center gap-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft">
          {icon}
        </div>
        <h3 className="text-3xl font-extrabold tracking-tight">{name}</h3>
      </div>

      <p className="text-base text-foreground/75">{desc}</p>

      <div className="h-px bg-border" />

      <div className="grid grid-cols-4 gap-3">
        {benefits.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
            </div>
            <div className="text-[11px] font-semibold leading-tight text-foreground/80">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-glow group-hover:brightness-110">
        {cta}
        <ChevronRight className="h-5 w-5" />
      </div>
    </button>
  );
}
