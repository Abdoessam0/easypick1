import type { Meal } from "@/lib/meals";
import { Flame, Clock, Heart, DollarSign, Plus, Check, Star } from "lucide-react";

const goodTags = ["Low Calorie", "High Protein", "Low Sugar", "Fresh"];
const tagColor = (tag: string) => {
  if (goodTags.includes(tag)) return "bg-success/15 text-success";
  if (tag === "Fast Prep") return "bg-primary-soft text-primary";
  if (tag === "Best Value") return "bg-warning/20 text-foreground/80";
  return "bg-primary-soft text-primary";
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
    <div className="glass relative flex flex-col overflow-hidden rounded-3xl shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
      {bestMatch && !matchPct && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-glow">
          <Star className="h-3 w-3 fill-current" /> BEST MATCH
        </div>
      )}
      {matchPct !== undefined && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-success/90 px-3 py-1 text-xs font-bold text-success-foreground">
          {Math.round(matchPct * 100)}% Match
        </div>
      )}
      <div className="absolute right-3 top-3 z-10 rounded-full bg-card/90 px-2.5 py-1 text-xs font-bold text-foreground shadow-soft">
        {meal.price}
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-soft/40">
        <img
          src={meal.image}
          alt={meal.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-xl font-bold leading-tight">{meal.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {meal.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {meal.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tagColor(
                t
              )}`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-4 gap-2 pt-2">
          <Metric icon={<Flame className="h-4 w-4" />} value={`${meal.calories}`} label="kcal" />
          <Metric icon={<Clock className="h-4 w-4" />} value={`${meal.prepTime}`} label="min" />
          <Metric icon={<Heart className="h-4 w-4" />} value={meal.satiety[0]} label="Satiety" />
          <Metric icon={<DollarSign className="h-4 w-4" />} value={meal.price} label="Price" />
        </div>

        {onToggle && (
          <button
            onClick={onToggle}
            disabled={disabled && !selected}
            className={`mt-2 flex min-h-[48px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition ${
              selected
                ? "bg-success text-success-foreground shadow-glow"
                : "bg-primary text-primary-foreground hover:brightness-110 shadow-glow disabled:cursor-not-allowed disabled:opacity-40"
            }`}
          >
            {selected ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                Add to compare <Plus className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-2xl bg-primary-soft/40 py-2">
      <div className="text-primary">{icon}</div>
      <div className="text-sm font-bold leading-none">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

export { Heart };
