import { Link, useLocation } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import type { LevelTriple, Prefs } from "@/lib/meals";
import chickenBowl from "@/assets/meal-chicken-bowl.jpg";
import shrimp from "@/assets/meal-shrimp.jpg";
import soup from "@/assets/meal-soup.jpg";
import { Dumbbell, Flame, Candy, ChevronRight, ChevronLeft, Zap, Heart, Leaf } from "lucide-react";

const controls: {
  key: keyof Prefs;
  icon: React.ElementType;
  iconBg: string;
  title: string;
  q: string;
  labels: [string, string, string];
}[] = [
  {
    key: "protein",
    icon: Dumbbell,
    iconBg: "bg-[oklch(0.95_0.03_240)]",
    title: "Protein",
    q: "How much protein do you want?",
    labels: ["Balanced", "Normal", "High Protein"],
  },
  {
    key: "calories",
    icon: Flame,
    iconBg: "bg-[oklch(0.96_0.04_30)]",
    title: "Calories",
    q: "What kind of meal fits your day?",
    labels: ["Light", "Normal", "Filling"],
  },
  {
    key: "sugar",
    icon: Candy,
    iconBg: "bg-[oklch(0.96_0.03_340)]",
    title: "Sugar",
    q: "How sweet would you like it?",
    labels: ["Less Sweet", "Normal", "Sweet OK"],
  },
  {
    key: "energy",
    icon: Zap,
    iconBg: "bg-[oklch(0.96_0.04_80)]",
    title: "Energy",
    q: "How much energy do you need?",
    labels: ["Light", "Normal", "Boost"],
  },
];

export default function SmartPage() {
  const { prefs, setPrefs, setMode } = useEasypick();
  const [, navigate] = useLocation();

  const setLevel = (k: keyof Prefs, v: LevelTriple) => {
    setMode("smart");
    setPrefs({ ...prefs, [k]: v });
  };

  const previewMeals = [chickenBowl, shrimp, soup];

  return (
    <Shell>
      <Link
        to="/mode"
        className="mb-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/80 px-5 py-2 text-sm font-semibold text-foreground/70 shadow-soft hover:text-primary transition"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
        {/* Left panel */}
        <div className="card-premium flex flex-col gap-5 p-7">
          <div>
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight">
              Let's make it{" "}
              <span className="text-gradient-primary">just right for you</span>
              <span className="ml-1 text-primary">✦</span>
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

        {/* Right sliders panel */}
        <div className="card-premium overflow-hidden">
          <div className="flex flex-col divide-y divide-border">
            {controls.map((s) => {
              const Icon = s.icon;
              const val = prefs[s.key];
              return (
                <div key={s.key} className="flex flex-col gap-5 p-6">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${s.iconBg}`}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[16px] font-bold">{s.title}</div>
                      <div className="text-[13px] text-muted-foreground">{s.q}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="relative px-1">
                      <input
                        type="range"
                        min={0}
                        max={2}
                        step={1}
                        value={val}
                        onChange={(e) => {
                          setMode("smart");
                          setLevel(s.key, Number(e.target.value) as LevelTriple);
                        }}
                        className="smart-slider w-full"
                      />
                    </div>
                    <div className="grid grid-cols-3 text-[12px] font-semibold text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Leaf className="h-3 w-3 text-emerald-500" />
                        <span className={val === 0 ? "text-primary font-bold" : ""}>{s.labels[0]}</span>
                      </div>
                      <div className={`text-center ${val === 1 ? "text-primary font-bold" : ""}`}>{s.labels[1]}</div>
                      <div className={`text-right ${val === 2 ? "text-primary font-bold" : ""}`}>{s.labels[2]}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-5 max-w-6xl">
        <div className="card-premium flex flex-col items-center gap-5 p-5 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft">
              <span className="text-lg">✦</span>
            </div>
            <div>
              <div className="font-bold text-sm">
                We'll find meals that{" "}
                <span className="text-gradient-primary">match your vibe!</span>
              </div>
              <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
                <span className="text-[oklch(0.60_0.14_145)] font-semibold">3 tasty matches are ready for you</span>
                <span className="text-[oklch(0.60_0.14_145)]">✓</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {previewMeals.map((img, i) => (
                <div
                  key={i}
                  className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm"
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/results")}
              className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-primary px-9 py-3 text-[15px] font-bold text-primary-foreground shadow-glow transition hover:brightness-110 active:scale-[0.98]"
            >
              Show My Matches <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
