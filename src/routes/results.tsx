import { createFileRoute, useNavigate, Link, Navigate } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { PageTitle } from "@/components/easypick/PageTitle";
import { MealCard } from "@/components/easypick/MealCard";
import { useEasypick } from "@/lib/easypick-context";
import {
  getMealsByMood,
  getSmartMatches,
  getMealById,
  type Meal,
} from "@/lib/meals";
import {
  Flame,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/results")({
  component: ResultsPage,
});

function ResultsPage() {
  const { mode, mood, prefs, compare, toggleCompare, removeCompare } =
    useEasypick();
  const nav = useNavigate();

  if (!mode) return <Navigate to="/mode" />;
  if (mode === "quick" && !mood) return <Navigate to="/quick" />;

  let meals: { meal: Meal; match?: number }[] = [];
  if (mode === "quick" && mood) {
    meals = getMealsByMood(mood).map((m) => ({ meal: m }));
  } else {
    meals = getSmartMatches(prefs);
  }

  const canCompare = compare.length === 2;
  const slot1 = compare[0] ? getMealById(compare[0]) : null;
  const slot2 = compare[1] ? getMealById(compare[1]) : null;

  return (
    <Shell>
      <Link
        to={mode === "quick" ? "/quick" : "/smart"}
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <PageTitle
        title="Here are your"
        accent={mode === "smart" ? "personalized matches" : "best matches"}
        subtitle={
          mode === "smart"
            ? "We found these meals that fit your preferences."
            : "We reduced the options to help you decide faster."
        }
      />

      {mode === "quick" && (
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-4 text-sm">
          <Pill icon={<Flame className="h-4 w-4" />} label="High Satiety" />
          <Pill icon={<Clock className="h-4 w-4" />} label="Comfort Food" />
          <Pill icon={<Heart className="h-4 w-4" />} label="Satisfying Choices" />
        </div>
      )}

      {mode === "smart" && (
        <div className="glass mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-2 rounded-3xl p-4 text-sm md:grid-cols-4">
          {(["protein", "calories", "sugar", "energy"] as const).map((k) => {
            const v = prefs[k];
            const labels: Record<string, [string, string, string]> = {
              protein: ["Balanced", "Normal", "High Protein"],
              calories: ["Light", "Normal", "Filling"],
              sugar: ["Less Sweet", "Normal", "Sweet OK"],
              energy: ["Light", "Normal", "Boost"],
            };
            return (
              <div key={k} className="flex flex-col items-center gap-1 px-3">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {k}
                </div>
                <div className="font-bold text-primary">{labels[k][v]}</div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-6 rounded-full ${
                        i === v ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mx-auto mt-8 max-w-7xl">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            {meals.length} matches found for you
          </div>
          <div className="text-sm text-muted-foreground">
            Sort by: <span className="font-semibold text-foreground">Best Match</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {meals.map(({ meal, match }, idx) => (
            <MealCard
              key={meal.id}
              meal={meal}
              matchPct={mode === "smart" ? match : undefined}
              bestMatch={mode === "quick" && idx === 0}
              selected={compare.includes(meal.id)}
              onToggle={() => toggleCompare(meal.id)}
            />
          ))}
        </div>
      </div>

      {/* Compare tray */}
      <div className="fixed inset-x-0 bottom-24 z-10 px-6">
        <div className="glass mx-auto flex max-w-6xl flex-col items-center gap-3 rounded-[2rem] p-4 shadow-soft md:flex-row md:gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft">
              <ShoppingBasket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-bold leading-tight">Pick 2 meals</div>
              <div className="text-xs text-muted-foreground">
                to compare side by side
              </div>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-3">
            <CompareSlot meal={slot1} onClear={(id) => removeCompare(id)} index={1} />
            <CompareSlot meal={slot2} onClear={(id) => removeCompare(id)} index={2} />
          </div>

          <button
            disabled={!canCompare}
            onClick={() => nav({ to: "/compare" })}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            COMPARE NOW <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Shell>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-primary">
      {icon}
      {label}
    </div>
  );
}

function CompareSlot({
  meal,
  onClear,
  index,
}: {
  meal: Meal | null | undefined;
  onClear: (id: string) => void;
  index: number;
}) {
  if (meal) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-primary-soft/40 p-2 pr-3">
        <img
          src={meal.image}
          alt={meal.name}
          className="h-12 w-12 rounded-xl object-cover"
        />
        <div className="flex-1 text-sm font-semibold">{meal.name}</div>
        <button
          onClick={() => onClear(meal.id)}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-border p-2 pr-3 text-muted-foreground">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card">
        <Plus className="h-5 w-5 text-primary" />
      </div>
      <div className="text-sm">Add meal {index}</div>
    </div>
  );
}
