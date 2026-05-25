import { createFileRoute, useNavigate, Link, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import { getMealById, pickWinner, scoreMeal, type CompareCtx, type Meal } from "@/lib/meals";
import {
  Flame,
  Heart,
  Clock,
  Dumbbell,
  DollarSign,
  Candy,
  Trophy,
  ChevronLeft,
  RefreshCw,
  Check,
  Zap,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/compare")({
  component: ComparePage,
});

const REQUIRED_COMPARE_COUNT = 3;

function ComparePage() {
  const { compare, mode, mood, prefs, setFinalChoice } = useEasypick();
  const nav = useNavigate();

  const meals = compare.map((id) => getMealById(id)).filter((m): m is Meal => !!m);
  const hasExactlyThreeMeals =
    compare.length === REQUIRED_COMPARE_COUNT && meals.length === REQUIRED_COMPARE_COUNT;

  useEffect(() => {
    if (mode && !hasExactlyThreeMeals) {
      const timer = window.setTimeout(() => nav({ to: "/results" }), 1400);
      return () => window.clearTimeout(timer);
    }
  }, [hasExactlyThreeMeals, mode, nav]);

  if (!mode) return <Navigate to="/mode" />;

  if (!hasExactlyThreeMeals) {
    return (
      <Shell>
        <div className="glass mx-auto mt-16 max-w-lg rounded-[2rem] p-8 text-center shadow-soft">
          <h1 className="text-3xl font-extrabold text-gradient-primary">Pick 3 meals to compare</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Compare works with exactly 3 selected meals. We'll send you back to Results so you can
            finish your selection.
          </p>
          <button
            onClick={() => nav({ to: "/results" })}
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow"
          >
            Change selected meals
          </button>
        </div>
      </Shell>
    );
  }

  const ctx: CompareCtx =
    mode === "smart" ? { kind: "smart", prefs } : { kind: "mood", mood: mood ?? "Hungry" };

  let winnerMeal = meals[0];
  if (ctx.kind === "smart") {
    let best = -Infinity;
    for (const m of meals) {
      const s = scoreMeal(m, ctx.prefs);
      if (s > best) {
        best = s;
        winnerMeal = m;
      }
    }
  } else {
    winnerMeal = meals.reduce((a, b) => {
      const res = pickWinner(a, b, ctx);
      return res.winner === "b" ? b : a;
    });
  }

  type Metric = {
    key: string;
    icon: React.ElementType;
    label: string;
    get: (m: Meal) => number;
    display: (m: Meal) => string;
    preferHigher: boolean;
    bestLabel?: string;
  };

  const energyValue = (m: Meal) => Math.round(m.calories * 0.6 + m.protein * 4);
  const fitValue = (m: Meal) => scoreMeal(m, prefs);

  const metrics: Metric[] =
    mode === "smart"
      ? [
          {
            key: "energy",
            icon: Zap,
            label: "Energy",
            get: energyValue,
            display: (m) => `${energyValue(m)} pts`,
            preferHigher: prefs.energy >= 1,
          },
          {
            key: "protein",
            icon: Dumbbell,
            label: "Protein",
            get: (m) => m.protein,
            display: (m) => `${m.protein} g`,
            preferHigher: true,
          },
          {
            key: "sugar",
            icon: Candy,
            label: "Sugar",
            get: (m) => m.sugar,
            display: (m) => `${m.sugar} g`,
            preferHigher: prefs.sugar === 2,
          },
          {
            key: "calories",
            icon: Flame,
            label: "Calories",
            get: (m) => m.calories,
            display: (m) => `${m.calories} kcal`,
            preferHigher: prefs.calories === 2,
          },
          {
            key: "fit",
            icon: Target,
            label: "Preference fit",
            get: fitValue,
            display: (m) => `${Math.round(fitValue(m) * 100)}%`,
            preferHigher: true,
            bestLabel: "Best fit",
          },
        ]
      : [
          {
            key: "price",
            icon: DollarSign,
            label: "Price",
            get: (m) => m.price.length,
            display: (m) => m.price,
            preferHigher: false,
          },
          {
            key: "calories",
            icon: Flame,
            label: "Calories",
            get: (m) => m.calories,
            display: (m) => `${m.calories} kcal`,
            preferHigher: mood === "Hungry",
          },
          {
            key: "prep",
            icon: Clock,
            label: "Prep time",
            get: (m) => m.prepTime,
            display: (m) => `${m.prepTime} min`,
            preferHigher: false,
          },
          {
            key: "satiety",
            icon: Heart,
            label: "Satiety",
            get: (m) => (m.satiety === "High" ? 3 : m.satiety === "Medium" ? 2 : 1),
            display: (m) => m.satiety,
            preferHigher: true,
          },
        ];

  const choose = (id: string) => {
    setFinalChoice(id);
    nav({ to: "/choose" });
  };

  return (
    <Shell>
      <Link
        to="/results"
        className="glass mb-6 inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back to results
      </Link>

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Compare your <span className="text-gradient-primary">top 3 picks</span>
        </h1>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          Three meals, side by side. Our suggestion is highlighted below.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
        {meals.map((m, i) => (
          <MealHero key={m.id} meal={m} index={i + 1} winner={m.id === winnerMeal.id} />
        ))}
      </div>

      <div className="glass mx-auto mt-6 max-w-6xl rounded-[2rem] p-4 shadow-soft md:p-6">
        {metrics.map((mt) => {
          const vals = meals.map((m) => mt.get(m));
          const best = mt.preferHigher ? Math.max(...vals) : Math.min(...vals);
          return (
            <div
              key={mt.key}
              className="grid items-center gap-3 border-b border-border/60 py-4 last:border-0"
              style={{ gridTemplateColumns: "repeat(3, 1fr) 140px" }}
            >
              {meals.map((m) => {
                const isBest = mt.get(m) === best && vals.filter((v) => v === best).length === 1;
                return (
                  <div key={m.id} className="flex flex-col items-center gap-1 text-center">
                    <div
                      className={`text-sm font-bold ${isBest ? "text-primary" : "text-foreground/70"}`}
                    >
                      {mt.display(m)}
                    </div>
                    {isBest && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary">
                        {mt.bestLabel ?? "Better"}
                      </span>
                    )}
                  </div>
                );
              })}
              <div className="flex flex-col items-center gap-1 border-l border-border pl-3">
                <mt.icon className="h-5 w-5 text-primary" />
                <div className="text-xs font-semibold">{mt.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass mx-auto mt-6 flex max-w-6xl flex-col gap-4 rounded-[2rem] p-6 shadow-glow md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
            <Trophy className="h-7 w-7 text-primary" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Our suggestion
            </div>
            <div className="text-2xl font-extrabold">{winnerMeal.name}</div>
            <p className="mt-2 max-w-md text-sm text-foreground/70">
              {reasonShort(winnerMeal, ctx)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => choose(winnerMeal.id)}
            className="flex min-h-[52px] items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow"
          >
            <Check className="h-4 w-4" /> Choose this meal
          </button>
          <button
            onClick={() => nav({ to: "/results" })}
            className="flex min-h-[52px] items-center gap-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-bold"
          >
            <RefreshCw className="h-4 w-4" /> Change selected meals
          </button>
        </div>
      </div>
    </Shell>
  );
}

function reasonShort(meal: Meal, ctx: CompareCtx) {
  if (ctx.kind === "smart") {
    return `It has the strongest preference fit across energy, protein, sugar, and calories, with ${meal.protein}g protein and ${meal.calories} kcal.`;
  }
  if (ctx.mood === "Hungry") {
    return `It wins for a Hungry mood because it has ${meal.satiety.toLowerCase()} satiety, a filling calorie load, and strong value.`;
  }
  if (ctx.mood === "Light") {
    return `It wins for a Light mood because it keeps calories manageable while still feeling satisfying.`;
  }
  return `It wins for a Fast mood because it is ready in ${meal.prepTime} minutes with clear value and enough satiety.`;
}

function MealHero({ meal, index, winner }: { meal: Meal; index: number; winner: boolean }) {
  return (
    <div
      className={`glass relative flex items-center gap-4 rounded-[2rem] p-4 ${
        winner ? "ring-2 ring-primary shadow-glow" : ""
      }`}
    >
      <div className="absolute -left-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-glow">
        {index}
      </div>
      {winner && (
        <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
          Suggested
        </div>
      )}
      <div className="aspect-square w-28 shrink-0 overflow-hidden rounded-2xl bg-primary-soft/40">
        <img src={meal.image} alt={meal.name} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-extrabold leading-tight">{meal.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{meal.description}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold">
            <Flame className="h-3.5 w-3.5 text-primary" /> {meal.calories}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold">
            <Clock className="h-3.5 w-3.5 text-primary" /> {meal.prepTime}m
          </span>
          <span className="inline-flex items-center gap-1 font-semibold">
            <DollarSign className="h-3.5 w-3.5 text-primary" /> {meal.price}
          </span>
        </div>
      </div>
    </div>
  );
}
