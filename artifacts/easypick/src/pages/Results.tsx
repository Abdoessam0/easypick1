import { Link, useLocation, Redirect } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { MealCard } from "@/components/easypick/MealCard";
import { useEasypick } from "@/lib/easypick-context";
import { getMealsByMood, getSmartMatches, getMealById, type Meal, type Prefs } from "@/lib/meals";
import { ChevronLeft, ChevronRight, X, ShoppingBasket, Flame, Heart, Dumbbell, Candy, Zap } from "lucide-react";

const REQUIRED = 2;

export default function ResultsPage() {
  const { mode, mood, prefs, compare, toggleCompare, removeCompare, clearCompare } = useEasypick();
  const [, navigate] = useLocation();

  if (!mode) return <Redirect to="/mode" />;
  if (mode === "quick" && !mood) return <Redirect to="/quick" />;

  let meals: { meal: Meal; match?: number }[] = [];
  if (mode === "quick" && mood) {
    meals = getMealsByMood(mood).map((m) => ({ meal: m }));
  } else {
    meals = getSmartMatches(prefs);
  }

  const canCompare = compare.length === REQUIRED;

  return (
    <Shell>
      <div className="flex items-center gap-4 mb-8">
        <Link
          to={mode === "quick" ? "/quick" : "/smart"}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/80 px-5 py-2 text-sm font-semibold text-foreground/70 shadow-soft hover:text-primary transition shrink-0"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-[3.25rem]">
            Here are your{" "}
            <span className="text-gradient-primary">
              {mode === "smart" ? "personalized matches" : "best matches"}
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {mode === "smart"
              ? "We found these meals that fit your preferences."
              : "We reduced the options to help you decide faster."}
          </p>

          {mode === "quick" && mood && (
            <div className="mt-4 flex items-center justify-center gap-3 text-sm text-muted-foreground flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[12px] font-bold text-primary-foreground">
                {mood.toUpperCase()} MODE
              </span>
              <span className="flex items-center gap-1"><Flame className="h-4 w-4 text-primary" /> High Satiety</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1"><Heart className="h-4 w-4 text-primary" /> Satisfying Choices</span>
            </div>
          )}
          {mode === "smart" && (
            <div className="mt-3 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{meals.length} matches found for you</span>
            </div>
          )}
        </div>

        {mode === "smart" && <PreferenceSummary prefs={prefs} />}

        {meals.length === 0 ? (
          <div className="card-premium mx-auto max-w-md p-10 text-center">
            <h3 className="text-lg font-bold">No matches found</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try changing your mood or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {meals.map(({ meal, match }, idx) => (
              <MealCard
                key={meal.id}
                meal={meal}
                matchPct={mode === "smart" ? match : undefined}
                bestMatch={mode === "quick" && idx === 0}
                selected={compare.includes(meal.id)}
                disabled={compare.length >= REQUIRED}
                onToggle={() => toggleCompare(meal.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-[72px] z-10 px-4">
        <div className="card-premium mx-auto max-w-6xl flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-5">
          <div className="flex items-center gap-3 md:w-56 md:shrink-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
              <ShoppingBasket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">
                Pick 2 items
              </div>
              <div className="text-[12px] text-muted-foreground">to compare</div>
            </div>
          </div>

          <div className="flex flex-1 gap-2">
            {[0, 1].map((i) => {
              const id = compare[i];
              const meal = id ? getMealById(id) : null;
              return (
                <CompareSlot
                  key={i}
                  meal={meal ?? null}
                  onClear={(mid) => removeCompare(mid)}
                  index={i + 1}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {compare.length > 0 && (
              <button
                onClick={clearCompare}
                className="flex min-h-[44px] items-center gap-1 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-foreground/70 hover:bg-primary-soft hover:text-primary transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              disabled={!canCompare}
              onClick={() => navigate("/compare")}
              className="flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              COMPARE NOW <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

const prefConfig = [
  {
    key: "protein" as const,
    label: "Protein",
    labels: ["Balanced", "Normal", "High Protein"],
    Icon: Dumbbell,
  },
  {
    key: "calories" as const,
    label: "Calories",
    labels: ["Light", "Normal", "Filling"],
    Icon: Flame,
  },
  {
    key: "sugar" as const,
    label: "Sugar",
    labels: ["Less Sweet", "Normal", "Sweet OK"],
    Icon: Candy,
  },
  {
    key: "energy" as const,
    label: "Energy",
    labels: ["Light", "Normal", "Boost"],
    Icon: Zap,
  },
];

function PreferenceSummary({ prefs }: { prefs: Prefs }) {
  return (
    <div className="mb-8 card-premium p-4">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
        {prefConfig.map(({ key, label, labels, Icon }) => {
          const val = prefs[key]; // 0 | 1 | 2
          const pct = val === 0 ? 0 : val === 1 ? 50 : 100;
          return (
            <div key={key} className="flex flex-col gap-2">
              {/* Icon + name */}
              <div className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-[13px] font-bold text-foreground">{label}</span>
              </div>

              {/* Slider track */}
              <div className="relative h-[6px] rounded-full bg-border">
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-primary/20"
                  style={{ width: `${pct}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-primary shadow-glow border-2 border-white"
                  style={{ left: `${pct}%` }}
                />
              </div>

              {/* Three labels */}
              <div className="flex justify-between">
                {labels.map((l, i) => (
                  <span
                    key={i}
                    className={`text-[10px] font-semibold leading-tight ${
                      i === val
                        ? "text-primary"
                        : "text-muted-foreground/60"
                    } ${i === 1 ? "text-center" : i === 2 ? "text-right" : "text-left"}`}
                    style={{ width: "33%" }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompareSlot({
  meal,
  onClear,
  index,
}: {
  meal: Meal | null;
  onClear: (id: string) => void;
  index: number;
}) {
  if (meal) {
    return (
      <div className="relative flex flex-1 min-h-[60px] items-center gap-3 rounded-2xl bg-[oklch(0.97_0.015_30)] p-2.5 pr-3">
        <img src={meal.image} alt={meal.name} className="h-11 w-11 rounded-xl object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="truncate text-[13px] font-semibold">{meal.name}</div>
          <div className="text-[11px] text-muted-foreground">{meal.calories} kcal</div>
        </div>
        <button
          onClick={() => onClear(meal.id)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white hover:brightness-110 transition"
          aria-label="Remove"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-1 min-h-[60px] items-center gap-3 rounded-2xl border-2 border-dashed border-border p-2.5 text-muted-foreground">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-border text-sm font-bold text-primary shrink-0">
        +
      </div>
      <div className="text-[12px] font-medium">Add your {index === 1 ? "first" : "second"} meal</div>
    </div>
  );
}
