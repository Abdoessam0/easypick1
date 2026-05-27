import { Link, useLocation } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import type { LevelTriple, Prefs } from "@/lib/meals";
import chickenBowl from "@/assets/meal-chicken-bowl.jpg";
import { Dumbbell, Flame, Candy, ChevronRight, ChevronLeft, Zap, Heart, Sparkles } from "lucide-react";

const controls: {
  key: keyof Prefs;
  icon: React.ElementType;
  title: string;
  q: string;
  labels: [string, string, string];
  color: string;
}[] = [
  {
    key: "protein",
    icon: Dumbbell,
    title: "Protein",
    q: "How much protein do you want?",
    labels: ["Balanced", "Normal", "High Protein"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    key: "calories",
    icon: Flame,
    title: "Calories",
    q: "What kind of meal fits your day?",
    labels: ["Light", "Normal", "Filling"],
    color: "bg-orange-50 text-orange-500",
  },
  {
    key: "sugar",
    icon: Candy,
    title: "Sugar",
    q: "How sweet would you like it?",
    labels: ["Less Sweet", "Normal", "Sweet OK"],
    color: "bg-pink-50 text-pink-500",
  },
  {
    key: "energy",
    icon: Zap,
    title: "Energy",
    q: "How much energy do you need?",
    labels: ["Light", "Normal", "Boost"],
    color: "bg-yellow-50 text-yellow-600",
  },
];

export default function SmartPage() {
  const { prefs, setPrefs, setMode } = useEasypick();
  const [, navigate] = useLocation();

  const setLevel = (k: keyof Prefs, v: LevelTriple) => {
    setMode("smart");
    setPrefs({ ...prefs, [k]: v });
  };

  return (
    <Shell>
      <Link
        to="/mode"
        className="mb-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/80 px-5 py-2 text-sm font-semibold text-foreground/70 shadow-soft hover:text-primary transition"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
        <div className="card-premium flex flex-col gap-5 p-7">
          <div>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
              Let's make it{" "}
              <span className="text-gradient-primary">just right for you</span>
            </h2>
            <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">
              Move the sliders to set your preferences. We'll handle the rest!
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[oklch(0.97_0.015_30)]">
            <img
              src={chickenBowl}
              alt="Meal preview"
              className="w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-primary-soft p-3.5">
            <Heart className="h-4 w-4 text-primary shrink-0" />
            <p className="text-[13px] text-foreground/70 leading-snug">
              The more accurate you set, the better we match!
            </p>
          </div>
        </div>

        <div className="card-premium overflow-hidden">
          <div className="flex flex-col divide-y divide-border">
            {controls.map((s) => {
              const Icon = s.icon;
              const val = prefs[s.key];
              return (
                <div key={s.key} className="flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[16px] font-bold">{s.title}</div>
                      <div className="text-[13px] text-muted-foreground">{s.q}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[0, 1, 2].map((i) => {
                      const active = val === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setLevel(s.key, i as LevelTriple)}
                          className={`min-h-[52px] rounded-2xl px-3 py-3 text-[13px] font-bold transition-all duration-150 ${
                            active
                              ? "bg-primary text-primary-foreground shadow-glow scale-[1.02]"
                              : "bg-[oklch(0.97_0.015_30)] text-foreground/70 hover:bg-primary-soft hover:text-primary"
                          }`}
                        >
                          {i === 0 && <span className="mr-1 text-emerald-500">●</span>}
                          {s.labels[i]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl">
        <div className="card-premium flex flex-col items-center gap-5 p-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <div>
              <div className="font-bold text-sm">We'll find meals that match your vibe!</div>
              <div className="text-[13px] text-muted-foreground">3 tasty matches are ready for you</div>
            </div>
          </div>

          <button
            onClick={() => navigate("/results")}
            className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-primary px-10 py-3 text-[15px] font-bold text-primary-foreground shadow-glow transition hover:brightness-110 active:scale-[0.98]"
          >
            Show My Matches <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Shell>
  );
}
