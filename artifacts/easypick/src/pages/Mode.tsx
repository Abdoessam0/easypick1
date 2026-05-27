import { useLocation } from "wouter";
import { Shell } from "@/components/easypick/Shell";
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

export default function ModePage() {
  const { setMode } = useEasypick();
  const [, navigate] = useLocation();

  return (
    <Shell showHeaderMode={false}>
      <div className="mx-auto max-w-5xl text-center mb-10">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          How would you like to{" "}
          <span className="text-gradient-primary">choose?</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Two simple paths to your perfect meal.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        <ModeCard
          name="Quick Pick"
          icon={<Zap className="h-10 w-10 text-primary" />}
          desc="Fast meal suggestions based on mood, time, price, calories, and satiety."
          benefits={[
            { icon: Timer, label: "Fast" },
            { icon: Utensils, label: "Simple" },
            { icon: Sparkles, label: "Curated" },
            { icon: Smile, label: "Less stress" },
          ]}
          cta="Start Quick Pick"
          onClick={() => { setMode("quick"); navigate("/quick"); }}
        />
        <ModeCard
          name="Smart Pick"
          icon={<Brain className="h-10 w-10 text-primary" />}
          desc="Personalized suggestions based on nutrition goals, preferences, and detailed filters."
          benefits={[
            { icon: Target, label: "Personalized" },
            { icon: HeartPulse, label: "Health-aware" },
            { icon: Sliders, label: "Better control" },
            { icon: GitCompare, label: "Detailed compare" },
          ]}
          cta="Start Smart Pick"
          onClick={() => { setMode("smart"); navigate("/smart"); }}
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
      className="card-premium group flex flex-col gap-6 p-7 text-left"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft">
          {icon}
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight">{name}</h3>
      </div>

      <p className="text-[15px] text-muted-foreground leading-relaxed">{desc}</p>

      <div className="h-px bg-border" />

      <div className="grid grid-cols-4 gap-3">
        {benefits.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
              <Icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.8} />
            </div>
            <div className="text-[11px] font-semibold leading-tight text-foreground/75">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-3.5 text-[15px] font-bold text-primary-foreground shadow-glow group-hover:brightness-110 transition">
        {cta}
        <ChevronRight className="h-4 w-4" />
      </div>
    </button>
  );
}
