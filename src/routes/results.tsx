import { createFileRoute, useNavigate, Link, Navigate } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { PageTitle } from "@/components/easypick/PageTitle";
import { MealCard } from "@/components/easypick/MealCard";
import { useEasypick } from "@/lib/easypick-context";
import { getMealsByMood, getSmartMatches, getMealById, type Meal } from "@/lib/meals";
import { ChevronLeft, ChevronRight, X, ShoppingBasket, Sparkles, Trash2 } from "lucide-react";

export const Route = createFileRoute("/results")({
  component: ResultsPage,
});

const REQUIRED_COMPARE_COUNT = 3;

function ResultsPage() {
  const { mode, mood, prefs, compare, toggleCompare, removeCompare, clearCompare } = useEasypick();
  const nav = useNavigate();

  if (!mode) return <Navigate to="/mode" />;
  if (mode === "quick" && !mood) return <Navigate to="/quick" />;

  let meals: { meal: Meal; match?: number }[] = [];
  if (mode === "quick" && mood) {
    meals = getMealsByMood(mood).map((m) => ({ meal: m }));
  } else {
    meals = getSmartMatches(prefs);
  }

  const canCompare = compare.length === REQUIRED_COMPARE_COUNT;
  const trayMessage =
    compare.length === 0
      ? "Pick 3 meals to compare"
      : compare.length === 1
        ? "Pick 2 more meals to compare"
        : compare.length === 2
          ? "Pick 1 more meal to compare"
          : "3 meals selected";

  return (
    <Shell>
      <Link
        to={mode === "quick" ? "/quick" : "/smart"}
        className="glass mb-6 inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <PageTitle
        title="Here are your"
        accent={mode === "smart" ? "personalized matches" : "best matches"}
        subtitle={
          mode === "smart"
            ? "Meals tailored to your nutrition preferences."
            : "We narrowed the options to help you decide faster."
        }
      />

      <div className="mx-auto mt-8 max-w-7xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            {meals.length} matches found for you
          </div>
        </div>

        {meals.length === 0 ? (
          <div className="glass mx-auto max-w-md rounded-3xl p-10 text-center shadow-soft">
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
                disabled={compare.length >= REQUIRED_COMPARE_COUNT}
                onToggle={() => toggleCompare(meal.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-24 z-10 px-4">
        <div className="glass mx-auto flex max-w-6xl flex-col gap-3 rounded-[2rem] p-4 shadow-soft md:flex-row md:items-center md:gap-5">
          <div className="flex items-center gap-3 md:w-64 md:shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
              <ShoppingBasket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-bold leading-tight">
                {compare.length === REQUIRED_COMPARE_COUNT
                  ? "3 meals selected"
                  : "Pick 3 meals to compare"}
              </div>
              <div className="text-xs text-muted-foreground">{trayMessage}</div>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const id = compare[i];
              const meal = id ? getMealById(id) : null;
              return (
                <CompareSlot
                  key={i}
                  meal={meal ?? null}
                  onClear={(id) => removeCompare(id)}
                  index={i + 1}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {compare.length > 0 && (
              <button
                onClick={clearCompare}
                className="flex min-h-[44px] items-center gap-1 rounded-full bg-card px-3 py-2 text-xs font-bold text-foreground/70 shadow-soft hover:bg-primary-soft"
                title="Clear all"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">Clear all</span>
              </button>
            )}
            <button
              disabled={!canCompare}
              onClick={() => nav({ to: "/compare" })}
              className="flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Compare now <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Shell>
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
      <div className="flex min-h-[56px] items-center gap-2 rounded-2xl bg-primary-soft/40 p-2 pr-3">
        <img src={meal.image} alt={meal.name} className="h-10 w-10 rounded-xl object-cover" />
        <div className="flex-1 truncate text-xs font-semibold">{meal.name}</div>
        <button
          onClick={() => onClear(meal.id)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-label="Remove"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }
  return (
    <div className="flex min-h-[56px] items-center gap-2 rounded-2xl border-2 border-dashed border-border p-2 pr-3 text-muted-foreground">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card text-xs font-bold text-primary">
        {index}
      </div>
      <div className="text-xs">Add meal {index}</div>
    </div>
  );
}
