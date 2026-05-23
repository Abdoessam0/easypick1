import { createFileRoute, useNavigate, Link, Navigate } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import {
  getMealById,
  metricBetter,
  pickWinner,
  type CompareCtx,
  type Meal,
} from "@/lib/meals";
import {
  Flame,
  Heart,
  Clock,
  Dumbbell,
  DollarSign,
  Trophy,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/compare")({
  component: ComparePage,
});

function ComparePage() {
  const { compare, mode, mood, prefs, setFinalChoice } = useEasypick();
  const nav = useNavigate();

  if (compare.length !== 2) return <Navigate to="/results" />;
  const a = getMealById(compare[0])!;
  const b = getMealById(compare[1])!;

  const ctx: CompareCtx =
    mode === "smart"
      ? { kind: "smart", prefs }
      : { kind: "mood", mood: mood ?? "hungry" };

  const overall = pickWinner(a, b, ctx);

  const rows = [
    {
      key: "calories",
      icon: Flame,
      label: "Calories",
      a: a.calories,
      b: b.calories,
      aDisplay: `${a.calories} kcal`,
      bDisplay: `${b.calories} kcal`,
      preferHigher: mode === "quick" && mood === "hungry",
      max: 1000,
    },
    {
      key: "satiety",
      icon: Heart,
      label: "Satiety",
      a: a.satiety === "High" ? 3 : a.satiety === "Medium" ? 2 : 1,
      b: b.satiety === "High" ? 3 : b.satiety === "Medium" ? 2 : 1,
      aDisplay: a.satiety,
      bDisplay: b.satiety,
      preferHigher: true,
      max: 3,
    },
    {
      key: "prep",
      icon: Clock,
      label: "Prep Time",
      a: a.prepTime,
      b: b.prepTime,
      aDisplay: `${a.prepTime} min`,
      bDisplay: `${b.prepTime} min`,
      preferHigher: false,
      max: 20,
    },
    {
      key: "protein",
      icon: Dumbbell,
      label: "Protein",
      a: a.protein,
      b: b.protein,
      aDisplay: `${a.protein} g`,
      bDisplay: `${b.protein} g`,
      preferHigher: true,
      max: 50,
    },
    {
      key: "price",
      icon: DollarSign,
      label: "Price",
      a: a.price.length,
      b: b.price.length,
      aDisplay: a.price,
      bDisplay: b.price,
      preferHigher: false,
      max: 3,
    },
  ];

  const winnerMeal = overall.winner === "b" ? b : a;

  const choose = (id: string) => {
    setFinalChoice(id);
    nav({ to: "/choose" });
  };

  return (
    <Shell>
      <Link
        to="/results"
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back to results
      </Link>

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Compare Your <span className="text-gradient-primary">Top Picks</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          We&rsquo;ve compared your top choices side by side so you can pick the
          best match.
        </p>
      </div>

      {/* Meal hero row */}
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        <MealHero meal={a} index={1} />
        <div className="flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground shadow-glow">
            VS
          </div>
        </div>
        <MealHero meal={b} index={2} />
      </div>

      {/* Comparison rows */}
      <div className="glass mx-auto mt-6 max-w-6xl rounded-[2rem] p-2 md:p-4">
        {rows.map((r) => {
          const better = metricBetter(r.a, r.b, r.preferHigher);
          const Icon = r.icon;
          return (
            <div
              key={r.key}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border/60 px-2 py-4 last:border-0 md:gap-6 md:px-6"
            >
              <Side
                value={r.aDisplay}
                pct={Math.min(100, (r.a / r.max) * 100)}
                better={better === "a"}
                align="right"
              />
              <div className="flex min-w-[140px] flex-col items-center gap-1">
                <Icon className="h-5 w-5 text-primary" />
                <div className="text-sm font-semibold">{r.label}</div>
              </div>
              <Side
                value={r.bDisplay}
                pct={Math.min(100, (r.b / r.max) * 100)}
                better={better === "b"}
                align="left"
              />
            </div>
          );
        })}
      </div>

      {/* Suggestion */}
      <div className="glass mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-4 rounded-[2rem] p-6 md:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
            <Trophy className="h-7 w-7 text-primary" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Our Suggestion
            </div>
            <div className="text-2xl font-extrabold">{winnerMeal.name}</div>
            <div className="text-sm text-muted-foreground">
              Best match for your{" "}
              <span className="font-semibold text-primary">
                {mode === "smart"
                  ? "Smart Pick"
                  : mood === "hungry"
                    ? "Hungry Mood"
                    : mood === "light"
                      ? "Light Mood"
                      : "Fast Mood"}
              </span>
            </div>
          </div>
        </div>
        <p className="max-w-xs text-sm text-muted-foreground">
          {reasonShort(winnerMeal, ctx)}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => choose(winnerMeal.id)}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow"
          >
            <Check className="h-4 w-4" /> CHOOSE THIS MEAL
          </button>
          <button
            onClick={() => nav({ to: "/results" })}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-bold"
          >
            <RefreshCw className="h-4 w-4" /> COMPARE ANOTHER
          </button>
        </div>
      </div>

      {/* Choose each */}
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-center gap-3 text-sm text-muted-foreground">
        Or pick directly:
        <button
          onClick={() => choose(a.id)}
          className="rounded-full bg-card px-4 py-2 font-semibold shadow-soft hover:bg-primary-soft"
        >
          Choose {a.name} <ChevronRight className="ml-1 inline h-3 w-3" />
        </button>
        <button
          onClick={() => choose(b.id)}
          className="rounded-full bg-card px-4 py-2 font-semibold shadow-soft hover:bg-primary-soft"
        >
          Choose {b.name} <ChevronRight className="ml-1 inline h-3 w-3" />
        </button>
      </div>
    </Shell>
  );
}

function reasonShort(meal: Meal, ctx: CompareCtx) {
  if (ctx.kind === "smart") {
    return "Best aligned with your sliders across protein, calories, sugar, and energy.";
  }
  if (ctx.mood === "hungry") return "Higher in satiety and protein to keep you full and satisfied for longer.";
  if (ctx.mood === "light") return "Lower in calories with balanced nutrition that fits a lighter mood.";
  return `Ready in just ${meal.prepTime} minutes — perfect when time matters.`;
}

function MealHero({ meal, index }: { meal: Meal; index: number }) {
  return (
    <div className="glass relative flex items-center gap-5 rounded-[2rem] p-5">
      <div className="absolute -left-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-glow">
        {index}
      </div>
      <div className="aspect-square w-40 shrink-0 overflow-hidden rounded-2xl bg-primary-soft/40">
        <img src={meal.image} alt={meal.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-extrabold leading-tight">{meal.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{meal.description}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold">
            <Flame className="h-3.5 w-3.5 text-primary" /> {meal.calories} kcal
          </span>
          <span className="inline-flex items-center gap-1 font-semibold">
            <Clock className="h-3.5 w-3.5 text-primary" /> {meal.prepTime} min
          </span>
          <span className="inline-flex items-center gap-1 font-semibold">
            <Heart className="h-3.5 w-3.5 text-primary" /> {meal.satiety} Satiety
          </span>
        </div>
      </div>
    </div>
  );
}

function Side({
  value,
  pct,
  better,
  align,
}: {
  value: string;
  pct: number;
  better: boolean;
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <div className="flex w-20 shrink-0 flex-col items-end gap-1">
        <div className={`text-sm font-bold ${better ? "text-primary" : ""}`}>
          {value}
        </div>
        {better && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">
            ★ Better
          </span>
        )}
      </div>
      <div
        className={`relative h-2 flex-1 overflow-hidden rounded-full bg-border/70`}
      >
        <div
          className={`absolute top-0 h-full rounded-full ${
            better ? "bg-primary shadow-glow" : "bg-primary/40"
          } ${align === "right" ? "right-0" : "left-0"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
