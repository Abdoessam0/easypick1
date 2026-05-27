import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { PageTitle } from "@/components/easypick/PageTitle";
import { useEasypick } from "@/lib/easypick-context";
import type { LevelTriple, Prefs } from "@/lib/meals";
import { Dumbbell, Flame, Candy, ChevronRight, ChevronLeft, Heart, Zap } from "lucide-react";

export const Route = createFileRoute("/smart")({
  component: SmartPage,
});

const controls: {
  key: keyof Prefs;
  icon: React.ElementType;
  title: string;
  q: string;
  labels: [string, string, string];
}[] = [
  {
    key: "energy",
    icon: Zap,
    title: "Energy",
    q: "How energized should the meal feel?",
    labels: ["Light", "Balanced", "Energizing"],
  },
  {
    key: "protein",
    icon: Dumbbell,
    title: "Protein",
    q: "How much protein do you want?",
    labels: ["Balanced", "Normal", "High Protein"],
  },
  {
    key: "sugar",
    icon: Candy,
    title: "Sugar",
    q: "How sweet would you like it?",
    labels: ["Less Sweet", "Normal", "Sweet OK"],
  },
  {
    key: "calories",
    icon: Flame,
    title: "Calories",
    q: "What kind of meal fits your day?",
    labels: ["Light", "Normal", "Filling"],
  },
];

function SmartPage() {
  const { prefs, setPrefs, setMode } = useEasypick();
  const nav = useNavigate();

  const setLevel = (k: keyof Prefs, v: LevelTriple) => {
    setMode("smart");
    setPrefs({ ...prefs, [k]: v });
  };

  return (
    <Shell>
      <Link
        to="/mode"
        className="glass mb-6 inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <PageTitle
        title="Let's make it"
        accent="just right for you"
        subtitle="Set your Energy, Protein, Sugar, and Calories preferences. We'll handle the rest."
      />

      <section className="glass mx-auto mt-8 flex max-w-5xl flex-col gap-2 rounded-[2rem] p-6 shadow-soft md:p-8">
        {controls.map((s, idx) => {
          const Icon = s.icon;
          const val = prefs[s.key];
          return (
            <div
              key={s.key}
              className={`flex flex-col gap-4 py-5 md:flex-row md:items-center md:gap-6 ${
                idx < controls.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-4 md:w-64 md:shrink-0">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-soft">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.q}</div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => {
                    const active = val === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setLevel(s.key, i as LevelTriple)}
                        className={`min-h-[56px] rounded-2xl px-3 py-3 text-sm font-bold transition ${
                          active
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "bg-card text-foreground/70 shadow-soft hover:bg-primary-soft"
                        }`}
                      >
                        {s.labels[i]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        <div className="glass-soft mt-2 flex items-center gap-3 rounded-2xl p-4">
          <Heart className="h-5 w-5 text-primary" />
          <p className="text-sm text-foreground/75">
            Smart Pick uses your nutrition preferences to personalize the best matches.
          </p>
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => nav({ to: "/results" })}
          className="inline-flex min-h-[56px] items-center gap-3 rounded-full bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
        >
          Show best matches <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </Shell>
  );
}
