import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { PageTitle } from "@/components/easypick/PageTitle";
import { useEasypick } from "@/lib/easypick-context";
import type { LevelTriple, Prefs } from "@/lib/meals";
import {
  Dumbbell,
  Flame,
  Candy,
  Zap,
  ChevronRight,
  ChevronLeft,
  Heart,
  Sparkles,
} from "lucide-react";
import chickenBowl from "@/assets/meal-chicken-bowl.jpg";
import pesto from "@/assets/meal-pesto-pasta.jpg";
import lentil from "@/assets/meal-lentil.jpg";

export const Route = createFileRoute("/smart")({
  component: SmartPage,
});

const sliders: {
  key: keyof Prefs;
  icon: React.ElementType;
  title: string;
  q: string;
  labels: [string, string, string];
}[] = [
  {
    key: "protein",
    icon: Dumbbell,
    title: "Protein",
    q: "How much protein do you want?",
    labels: ["Balanced", "Normal", "High Protein"],
  },
  {
    key: "calories",
    icon: Flame,
    title: "Calories",
    q: "What kind of meal fits your day?",
    labels: ["Light", "Normal", "Filling"],
  },
  {
    key: "sugar",
    icon: Candy,
    title: "Sugar",
    q: "How sweet would you like it?",
    labels: ["Less Sweet", "Normal", "Sweet OK"],
  },
  {
    key: "energy",
    icon: Zap,
    title: "Energy",
    q: "How much energy do you need?",
    labels: ["Light", "Normal", "Boost"],
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
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-[1fr_2fr]">
        <aside className="glass flex flex-col gap-5 rounded-[2rem] p-8">
          <h2 className="text-3xl font-extrabold leading-tight">
            Let&rsquo;s make it{" "}
            <span className="text-gradient-primary">just right for you</span>
          </h2>
          <p className="text-muted-foreground">
            Move the sliders to set your preferences. We&rsquo;ll handle the rest!
          </p>
          <div className="my-4 flex aspect-square w-full max-w-[260px] items-center justify-center self-center rounded-full bg-primary-soft/50 p-6">
            <img
              src={chickenBowl}
              alt="meal"
              loading="lazy"
              className="w-full rounded-full object-cover"
            />
          </div>
          <div className="glass-soft flex items-center gap-3 rounded-2xl p-4">
            <Heart className="h-5 w-5 text-primary" />
            <p className="text-sm">
              The more accurate you set, the better we match!
            </p>
          </div>
        </aside>

        <section className="glass flex flex-col gap-2 rounded-[2rem] p-6">
          {sliders.map((s, idx) => {
            const Icon = s.icon;
            const val = prefs[s.key];
            return (
              <div
                key={s.key}
                className={`flex items-center gap-5 py-5 ${
                  idx < sliders.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-soft">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="w-44 shrink-0">
                  <div className="text-lg font-bold">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.q}</div>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="relative flex items-center">
                    <div className="absolute inset-x-3 h-1 rounded-full bg-border" />
                    <div
                      className="absolute h-1 rounded-full bg-primary transition-all"
                      style={{
                        left: "0.75rem",
                        width: `calc(${val * 50}% - ${val * 0.75}rem)`,
                      }}
                    />
                    <div className="relative flex w-full justify-between">
                      {[0, 1, 2].map((i) => (
                        <button
                          key={i}
                          onClick={() => setLevel(s.key, i as LevelTriple)}
                          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition ${
                            val === i
                              ? "border-primary bg-primary text-primary-foreground shadow-glow scale-110"
                              : "border-border bg-card text-transparent"
                          }`}
                          aria-label={s.labels[i]}
                        >
                          +
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between px-1 text-xs font-semibold">
                    {s.labels.map((l, i) => (
                      <span
                        key={l}
                        className={
                          val === i ? "text-primary" : "text-muted-foreground"
                        }
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <div className="mx-auto mt-8 max-w-7xl">
        <div className="glass flex flex-col items-center justify-between gap-4 rounded-[2rem] p-5 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-bold">We&rsquo;ll find meals</div>
              <div className="text-sm text-primary font-semibold">
                that match your vibe!
              </div>
            </div>
            <div className="ml-2 hidden gap-2 md:flex">
              {[chickenBowl, pesto, lentil].map((s, i) => (
                <img
                  key={i}
                  src={s}
                  alt=""
                  loading="lazy"
                  className="h-12 w-12 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => nav({ to: "/results" })}
            className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
          >
            Show My Matches <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Shell>
  );
}
