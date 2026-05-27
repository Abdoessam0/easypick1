import { Link, useLocation, Redirect } from "wouter";
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

export default function ComparePage() {
  const { compare, mode, mood, prefs, setFinalChoice } = useEasypick();
  const [, navigate] = useLocation();

  const meals = compare.map((id) => getMealById(id)).filter((m): m is Meal => !!m);
  const hasExactlyTwoMeals = compare.length === 2 && meals.length === 2;

  useEffect(() => {
    if (mode && !hasExactlyTwoMeals) {
      const timer = window.setTimeout(() => navigate("/results"), 1400);
      return () => window.clearTimeout(timer);
    }
  }, [hasExactlyTwoMeals, mode, navigate]);

  if (!mode) return <Redirect to="/mode" />;

  if (!hasExactlyTwoMeals) {
    return (
      <Shell>
        <div className="glass mx-auto mt-16 max-w-lg rounded-[2rem] p-8 text-center shadow-soft">
          <h1 className="text-3xl font-extrabold text-gradient-primary">Pick 2 meals to compare</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Compare works with exactly 2 selected meals. We'll send you back to Results so you can
            finish your selection.
          </p>
          <button
            onClick={() => navigate("/results")}
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow"
          >
            Change selected meals
          </button>
        </div>
      </Shell>
    );
  }

  const ctx: CompareCtx =
    mode === "smart" ? { kind: "smart", prefs } : { kind: "mood", mood: mood ?? "hungry" };

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
            preferHigher: mood === "hungry",
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
    navigate("/choose");
  };

  const [mealA, mealB] = meals;

  return (
    <Shell>
      <Link
        to="/results"
        className="glass mb-6 inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back to results
      </Link>

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Head-to-head <span className="text-gradient-primary">compare</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          We'll help you pick the winner based on your preferences.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl">
        <div className="glass mb-6 flex items-center justify-center gap-3 rounded-[2rem] p-4 shadow-soft">
          <Trophy className="h-5 w-5 text-warning" />
          <span className="text-sm font-semibold">
            Recommended: <span className="font-bold text-primary">{winnerMeal.name}</span>
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
          {[mealA, mealB].map((meal, idx) => {
            const isWinner = meal.id === winnerMeal.id;
            return (
              <div key={meal.id} className={`glass flex flex-col gap-4 rounded-[2rem] p-6 shadow-soft ${isWinner ? "ring-2 ring-primary" : ""}`}>
                {isWinner && (
                  <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary w-fit">
                    <Trophy className="h-3 w-3" /> Recommended
                  </div>
                )}
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-primary-soft/40">
                  <img src={meal.image} alt={meal.name} className="h-full w-full object-cover" />
                </div>
                <h2 className="text-2xl font-extrabold">{meal.name}</h2>
                <p className="text-sm text-muted-foreground">{meal.description}</p>
                <button
                  onClick={() => choose(meal.id)}
                  className={`flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
                    isWinner
                      ? "bg-primary text-primary-foreground shadow-glow hover:brightness-110"
                      : "border border-border bg-card text-foreground hover:bg-primary-soft"
                  }`}
                >
                  {isWinner ? <><Check className="h-4 w-4" /> Choose this</> : "Choose this"}
                </button>
              </div>
            );
          })}

          <div className="flex flex-col gap-3 pt-8">
            {metrics.map((metric) => {
              const va = metric.get(mealA);
              const vb = metric.get(mealB);
              const better = va === vb ? "tie" : metric.preferHigher ? (va > vb ? "a" : "b") : (va < vb ? "a" : "b");
              const Icon = metric.icon;
              return (
                <div key={metric.key} className="flex flex-col items-center gap-1 rounded-2xl bg-card p-3 text-center shadow-soft">
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{metric.label}</div>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className={better === "a" ? "text-primary font-bold" : "text-muted-foreground"}>{metric.display(mealA)}</span>
                    <span className="text-border">vs</span>
                    <span className={better === "b" ? "text-primary font-bold" : "text-muted-foreground"}>{metric.display(mealB)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/results")}
            className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-soft hover:bg-primary-soft"
          >
            <RefreshCw className="h-4 w-4" /> Change selection
          </button>
        </div>
      </div>
    </Shell>
  );
}
