import { Link, useLocation, Redirect } from "wouter";
import { useEffect } from "react";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import { getMealById, pickWinner, scoreMeal, type CompareCtx, type Meal } from "@/lib/meals";
import {
  Flame, Heart, Clock, Dumbbell, DollarSign, Candy,
  Trophy, ChevronLeft, RefreshCw, Check, Zap, Target, X, Star,
} from "lucide-react";

export default function ComparePage() {
  const { compare, mode, mood, prefs, setFinalChoice } = useEasypick();
  const [, navigate] = useLocation();

  const meals = compare.map((id) => getMealById(id)).filter((m): m is Meal => !!m);
  const hasTwo = compare.length === 2 && meals.length === 2;

  useEffect(() => {
    if (mode && !hasTwo) {
      const t = window.setTimeout(() => navigate("/results"), 1400);
      return () => window.clearTimeout(t);
    }
  }, [hasTwo, mode, navigate]);

  if (!mode) return <Redirect to="/mode" />;

  if (!hasTwo) {
    return (
      <Shell>
        <div className="card-premium mx-auto mt-16 max-w-lg p-10 text-center">
          <h1 className="text-3xl font-extrabold text-gradient-primary">Pick 2 meals to compare</h1>
          <p className="mt-3 text-sm text-muted-foreground">Redirecting to Results…</p>
          <button
            onClick={() => navigate("/results")}
            className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-glow"
          >
            Go to Results
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
      if (s > best) { best = s; winnerMeal = m; }
    }
  } else {
    winnerMeal = meals.reduce((a, b) => (pickWinner(a, b, ctx).winner === "b" ? b : a));
  }

  type Metric = {
    key: string; icon: React.ElementType; label: string;
    get: (m: Meal) => number; display: (m: Meal) => string; preferHigher: boolean;
  };

  const energyValue = (m: Meal) => Math.round(m.calories * 0.6 + m.protein * 4);
  const fitValue = (m: Meal) => scoreMeal(m, prefs);

  const metrics: Metric[] = mode === "smart"
    ? [
        { key: "energy", icon: Zap, label: "Energy", get: energyValue, display: (m) => `${energyValue(m)} pts`, preferHigher: prefs.energy >= 1 },
        { key: "protein", icon: Dumbbell, label: "Protein", get: (m) => m.protein, display: (m) => `${m.protein}g`, preferHigher: true },
        { key: "sugar", icon: Candy, label: "Sugar", get: (m) => m.sugar, display: (m) => `${m.sugar}g`, preferHigher: prefs.sugar === 2 },
        { key: "calories", icon: Flame, label: "Calories", get: (m) => m.calories, display: (m) => `${m.calories} kcal`, preferHigher: prefs.calories === 2 },
        { key: "fit", icon: Target, label: "Preference fit", get: fitValue, display: (m) => `${Math.round(fitValue(m) * 100)}%`, preferHigher: true },
      ]
    : [
        { key: "calories", icon: Flame, label: "Calories", get: (m) => m.calories, display: (m) => `${m.calories} kcal`, preferHigher: mood === "hungry" },
        { key: "satiety", icon: Heart, label: "Satiety", get: (m) => (m.satiety === "High" ? 3 : m.satiety === "Medium" ? 2 : 1), display: (m) => m.satiety, preferHigher: true },
        { key: "prep", icon: Clock, label: "Prep Time", get: (m) => m.prepTime, display: (m) => `${m.prepTime} min`, preferHigher: false },
        { key: "protein", icon: Dumbbell, label: "Protein", get: (m) => m.protein, display: (m) => `${m.protein}g`, preferHigher: true },
        { key: "price", icon: DollarSign, label: "Price", get: (m) => m.price.length, display: (m) => m.price, preferHigher: false },
      ];

  const choose = (id: string) => { setFinalChoice(id); navigate("/choose"); };
  const [mealA, mealB] = meals;

  return (
    <Shell>
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/results"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/80 px-5 py-2 text-sm font-semibold text-foreground/70 shadow-soft hover:text-primary transition shrink-0"
        >
          <ChevronLeft className="h-4 w-4" /> Back to results
        </Link>
      </div>

      <div className="mx-auto max-w-5xl text-center mb-8">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-[3.25rem]">
          Compare Your{" "}
          <span className="text-gradient-primary">Top Picks</span>
          <span className="ml-2 text-2xl">✦</span>
        </h1>
        <p className="mt-3 text-muted-foreground text-[15px]">
          We've compared your top choices side by side<br />
          so you can pick the best match.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-[1fr_240px_1fr] gap-4 items-start">
          {[mealA, mealB].map((meal, idx) => {
            const isWinner = meal.id === winnerMeal.id;
            return (
              <div
                key={meal.id}
                className={`card-premium flex flex-col gap-4 p-5 transition-all ${
                  isWinner ? "ring-2 ring-primary shadow-glow" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                      isWinner ? "bg-primary text-white" : "bg-[oklch(0.96_0.01_30)] text-foreground/60"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  {isWinner && (
                    <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                      <Trophy className="h-3 w-3" /> Recommended
                    </div>
                  )}
                </div>

                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[oklch(0.97_0.015_30)]">
                  <img src={meal.image} alt={meal.name} className="h-full w-full object-cover" />
                </div>

                <div>
                  <h2 className="text-[18px] font-extrabold leading-tight">{meal.name}</h2>
                  <p className="mt-1 text-[13px] text-muted-foreground line-clamp-2">{meal.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {meal.tags.slice(0, 2).map((t) => (
                    <span key={t} className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: <Dumbbell className="h-3.5 w-3.5" />, val: `${meal.protein}g`, lbl: "Protein" },
                    { icon: <Flame className="h-3.5 w-3.5" />, val: `${meal.calories}`, lbl: "kcal" },
                    { icon: <Clock className="h-3.5 w-3.5" />, val: `${meal.prepTime}`, lbl: "min" },
                  ].map(({ icon, val, lbl }) => (
                    <div key={lbl} className="flex flex-col items-center gap-0.5 rounded-xl bg-[oklch(0.97_0.015_30)] py-2">
                      <div className="text-primary">{icon}</div>
                      <div className="text-[13px] font-bold">{val}</div>
                      <div className="text-[10px] text-muted-foreground">{lbl}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => choose(meal.id)}
                  className={`flex min-h-[48px] items-center justify-center gap-2 rounded-2xl text-[13px] font-bold transition ${
                    isWinner
                      ? "bg-primary text-primary-foreground shadow-glow hover:brightness-110"
                      : "border-2 border-border bg-white text-foreground hover:border-primary/30 hover:bg-primary-soft"
                  }`}
                >
                  {isWinner ? (
                    <><Check className="h-4 w-4" strokeWidth={2.5} /> CHOOSE THIS MEAL</>
                  ) : (
                    `Choose ${meal.name.split(" ")[0]}`
                  )}
                </button>
              </div>
            );
          })}

          <div className="flex flex-col gap-2 sticky top-4">
            <div className="flex items-center justify-center mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-sm font-black shadow-glow">
                VS
              </div>
            </div>

            {metrics.map((metric) => {
              const va = metric.get(mealA);
              const vb = metric.get(mealB);
              const maxVal = Math.max(va, vb) || 1;
              const better = va === vb ? "tie" : metric.preferHigher ? (va > vb ? "a" : "b") : (va < vb ? "a" : "b");
              const Icon = metric.icon;

              return (
                <div key={metric.key} className="card-premium p-3">
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{metric.label}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-semibold mb-1">
                    <span className={better === "a" ? "text-primary font-bold" : "text-muted-foreground"}>
                      {metric.display(mealA)}
                    </span>
                    <div className="flex flex-1 gap-0.5">
                      <div className="flex-1 bar-track">
                        <div
                          className="bar-fill-primary ml-auto"
                          style={{ width: `${(va / maxVal) * 100}%` }}
                        />
                      </div>
                      <div className="flex-1 bar-track">
                        <div
                          className="bar-fill-primary"
                          style={{ width: `${(vb / maxVal) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className={better === "b" ? "text-primary font-bold" : "text-muted-foreground"}>
                      {metric.display(mealB)}
                    </span>
                  </div>

                  {better !== "tie" && (
                    <div className={`flex items-center gap-1 text-[10px] font-bold ${better === "a" ? "justify-start" : "justify-end"}`}>
                      <Star className="h-2.5 w-2.5 text-warning fill-current" />
                      <span className="text-muted-foreground">Better</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 card-premium p-5 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-warning/15">
              <Trophy className="h-7 w-7 text-warning" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Our Suggestion</div>
              <div className="font-extrabold text-[16px]">{winnerMeal.name}</div>
              <div className="text-[13px] text-muted-foreground">
                Best match for your {mode === "smart" ? "preferences" : `${mood ?? ""} mood`}
              </div>
            </div>
          </div>

          <div className="flex-1 text-[13px] text-muted-foreground hidden sm:block">
            {mode === "smart"
              ? "Higher preference fit, better overall balance for your nutrition goals."
              : `Higher in satiety and protein to keep you full and satisfied for longer.`}
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <button
              onClick={() => choose(winnerMeal.id)}
              className="flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-7 py-3 text-[13px] font-bold text-primary-foreground shadow-glow hover:brightness-110 transition"
            >
              <Check className="h-4 w-4" strokeWidth={2.5} /> CHOOSE THIS MEAL
            </button>
            <button
              onClick={() => navigate("/results")}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground hover:text-primary transition"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Compare another pair
            </button>
          </div>
        </div>

        {meals.filter((m) => m.id !== winnerMeal.id).map((m) => (
          <p key={m.id} className="mt-2 text-center text-[13px] text-muted-foreground">
            or choose{" "}
            <button
              onClick={() => choose(m.id)}
              className="font-semibold text-primary hover:underline"
            >
              {m.name}
            </button>
          </p>
        ))}
      </div>
    </Shell>
  );
}
