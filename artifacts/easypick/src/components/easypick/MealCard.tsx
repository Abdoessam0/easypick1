import type { Meal } from "@/lib/meals";
import { Flame, Clock, Heart, Plus, Check, Star, Dumbbell } from "lucide-react";

const tagColor = (tag: string) => {
  if (["High Protein", "Low Sugar", "Low Calorie", "Fresh"].includes(tag))
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (["Fast Prep", "Quick"].includes(tag))
    return "bg-orange-50 text-orange-600 border-orange-100";
  if (["Best Value"].includes(tag))
    return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-primary-soft text-primary border-primary/10";
};

export function MealCard({
  meal,
  selected,
  onToggle,
  bestMatch,
  matchPct,
  disabled,
}: {
  meal: Meal;
  selected?: boolean;
  onToggle?: () => void;
  bestMatch?: boolean;
  matchPct?: number;
  disabled?: boolean;
}) {
  return (
    <div
      className={`card-premium relative flex flex-col overflow-hidden transition-all duration-200 ${
        selected ? "ring-2 ring-primary shadow-glow" : ""
      }`}
    >
      {bestMatch && !matchPct && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-glow">
          <Star className="h-3 w-3 fill-current" /> BEST MATCH
        </div>
      )}
      {matchPct !== undefined && (
        <div
          className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-bold"
          style={{ background: `oklch(0.60 0.14 145 / 0.92)`, color: "white" }}
        >
          {Math.round(matchPct * 100)}% Match
        </div>
      )}

      {selected && (
        <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-glow">
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden bg-[oklch(0.97_0.015_30)]">
        <img
          src={meal.image}
          alt={meal.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-[17px] font-bold leading-tight tracking-tight">{meal.name}</h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
            {meal.description}
          </p>
        </div>

        {meal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {meal.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${tagColor(t)}`}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto grid grid-cols-3 gap-2 pt-1">
          <NutrientBadge icon={<Flame className="h-3.5 w-3.5" />} value={`${meal.calories}`} label="kcal" />
          <NutrientBadge icon={<Clock className="h-3.5 w-3.5" />} value={`${meal.prepTime}`} label="min" />
          <NutrientBadge icon={<Heart className="h-3.5 w-3.5" />} value={meal.satiety[0]} label="Satiety" />
        </div>

        {onToggle && (
          <button
            onClick={onToggle}
            disabled={disabled && !selected}
            className={`mt-1 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all duration-150 ${
              selected
                ? "bg-primary text-primary-foreground shadow-glow"
                : "bg-primary text-primary-foreground hover:brightness-110 shadow-glow disabled:cursor-not-allowed disabled:opacity-40"
            }`}
          >
            {selected ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.5} /> Added to compare
              </>
            ) : (
              <>
                ADD TO COMPARE <Plus className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function NutrientBadge({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl bg-[oklch(0.97_0.015_30)] py-2">
      <div className="text-primary">{icon}</div>
      <div className="text-[13px] font-bold leading-none">{value}</div>
      <div className="text-[10px] font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

