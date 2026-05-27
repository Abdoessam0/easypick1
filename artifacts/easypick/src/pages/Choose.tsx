import { Link, useLocation, Redirect } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import { getMealById, type Meal } from "@/lib/meals";
import {
  Check, Flame, Clock, Heart, Dumbbell, Leaf, Candy,
  Zap, ShoppingBag, RefreshCw, Star, Smile, DollarSign,
} from "lucide-react";

export default function ChoosePage() {
  const { finalChoice, compare, mode, mood, reset } = useEasypick();
  const [, navigate] = useLocation();

  if (!finalChoice) return <Redirect to="/results" />;

  const winner = getMealById(finalChoice)!;
  const otherMeals = compare
    .filter((id) => id !== finalChoice)
    .map((id) => getMealById(id))
    .filter((meal): meal is Meal => !!meal);

  const reasons = buildReasons(winner, mode, mood);

  const compareMetrics = [
    { icon: Flame, label: "Calories", val: `${winner.calories} kcal` },
    { icon: Heart, label: "Satiety", val: winner.satiety },
    { icon: Clock, label: "Prep Time", val: `${winner.prepTime} min` },
    { icon: Dumbbell, label: "Protein", val: `${winner.protein}g` },
    { icon: DollarSign, label: "Price", val: winner.price },
  ];

  return (
    <Shell>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(0.60_0.14_145)] text-white shadow-glow">
              <Check className="h-6 w-6" strokeWidth={3} />
            </div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Great <span className="text-gradient-primary">choice!</span>
            </h1>
          </div>
          <p className="text-[15px] text-muted-foreground">
            You picked the best match for your craving.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.5fr_0.85fr]">
          <div className="card-premium relative flex flex-col items-center gap-4 p-6">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-white shadow-glow">
              <Star className="h-3 w-3 fill-current" /> YOUR CHOICE
            </div>

            <div className="w-full overflow-hidden rounded-2xl bg-[oklch(0.97_0.015_30)]" style={{ aspectRatio: "1" }}>
              <img src={winner.image} alt={winner.name} className="h-full w-full object-cover" />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-extrabold">{winner.name}</h2>
              <p className="mt-1.5 text-[13px] text-muted-foreground text-center leading-relaxed">
                {winner.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[13px]">
              {[
                { icon: Flame, val: `${winner.calories}`, lbl: "kcal" },
                { icon: Clock, val: `${winner.prepTime}`, lbl: "min" },
                { icon: Heart, val: winner.satiety, lbl: "Satiety" },
              ].map(({ icon: Icon, val, lbl }) => (
                <div key={lbl} className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-bold">{val}</span>
                  <span className="text-muted-foreground">{lbl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium p-6">
            <h3 className="text-[18px] font-extrabold mb-1">Why it&rsquo;s the best match for you</h3>
            <p className="text-[13px] text-muted-foreground mb-5">
              Based on your {mode === "smart" ? "Smart Pick preferences" : `${mood ?? "quick"} mood`}.
            </p>

            {otherMeals[0] && (
              <div className="mb-5 pb-5 border-b border-border">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Better choice</div>
                <div className="flex flex-col gap-2">
                  {compareMetrics.map((m) => {
                    const Icon = m.icon;
                    return (
                      <div key={m.label} className="grid grid-cols-[100px_1fr_100px] items-center gap-3 text-[13px]">
                        <span className="font-semibold text-primary text-right">{m.val}</span>
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="bar-track w-full flex gap-0.5">
                            <div className="flex-1 bar-track">
                              <div className="bar-fill-primary" style={{ width: "65%" }} />
                            </div>
                            <div className="flex-1 bar-track">
                              <div className="bar-fill-primary opacity-30" style={{ width: "40%" }} />
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Icon className="h-3 w-3 text-primary" />
                            {m.label}
                          </div>
                        </div>
                        <span className="text-muted-foreground">—</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <ul className="space-y-4">
              {reasons.map((r) => (
                <li key={r.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.60_0.14_145_/_0.12)] text-[oklch(0.60_0.14_145)]">
                    <r.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[13px] text-[oklch(0.50_0.14_145)]">{r.title}</div>
                    <div className="text-[12px] text-muted-foreground leading-snug">{r.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            {otherMeals.slice(0, 1).map((meal) => (
              <div key={meal.id} className="card-premium overflow-hidden">
                <div className="relative">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full object-cover"
                    style={{ aspectRatio: "4/3" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Runner up</div>
                  <div className="font-bold text-[15px]">{meal.name}</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5 line-clamp-2">{meal.description}</div>
                  <div className="mt-3 flex items-center gap-3 text-[12px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-primary" />{meal.calories} kcal</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-primary" />{meal.prepTime} min</span>
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-primary" />{meal.satiety}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="card-premium p-5 flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Smile className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-primary text-[14px]">Thank you!</div>
                <div className="text-[12px] text-muted-foreground leading-snug">
                  Your healthy choice makes a difference. Enjoy your meal!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 card-premium flex flex-col items-center gap-5 p-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-5">
            <div>
              <div className="font-bold text-primary text-sm">Ready to enjoy?</div>
              <div className="text-[13px] text-muted-foreground mt-0.5">
                Show this QR to place your order
              </div>
            </div>
            <QRBlock />
            <div className="hidden sm:flex items-center gap-2 text-[13px] text-muted-foreground">
              <ShoppingBag className="h-4 w-4 text-primary shrink-0" />
              Scan at the counter or show to our staff to confirm your order.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/order")}
              className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-[13px] font-bold text-primary-foreground shadow-glow hover:brightness-110 transition"
            >
              <ShoppingBag className="h-4 w-4" /> SEND ORDER to the kitchen
            </button>
            <button
              onClick={() => navigate("/results")}
              className="flex items-center gap-2 rounded-full border-2 border-border bg-white px-6 py-4 text-[13px] font-bold text-foreground hover:border-primary/30 hover:bg-primary-soft transition"
            >
              <RefreshCw className="h-4 w-4" /> CHOOSE ANOTHER
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function buildReasons(meal: Meal, mode: string | null, mood: string | null) {
  const reasons: { icon: React.ElementType; title: string; body: string }[] = [];
  if (mode === "smart") {
    reasons.push({ icon: Zap, title: "Energy fit", body: "Chosen for the best overall energy fit across the meals you compared." });
    if (meal.protein >= 25) reasons.push({ icon: Dumbbell, title: "High in protein", body: `Helps support your muscles & keeps you full longer.` });
    reasons.push({ icon: Leaf, title: "Light & balanced", body: "Perfect calorie balance for your day." });
    reasons.push({ icon: Candy, title: "Lower in sugar", body: `${meal.sugar}g sugar aligns with your preference.` });
  } else {
    reasons.push({ icon: DollarSign, title: "Clear value", body: `${meal.price} price — simple and easy to justify.` });
    reasons.push({ icon: Flame, title: mood === "light" ? "Fits your calorie target" : "Right calorie load", body: `${meal.calories} kcal matches a ${mood ?? "quick"} mood.` });
    reasons.push({ icon: Clock, title: "Prep time works", body: `Ready in ${meal.prepTime} minutes.` });
    reasons.push({ icon: Heart, title: meal.satiety === "High" ? "High satiety" : "Satisfying portion", body: meal.satiety === "High" ? "Filling enough to keep you satisfied." : "Balanced portion that satisfies without feeling heavy." });
  }
  return reasons.slice(0, 4);
}

function QRBlock() {
  const size = 21;
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < size * size; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    cells.push(seed % 3 !== 0);
  }
  const corner = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
  return (
    <div className="rounded-2xl bg-white p-2.5 shadow-soft border border-border">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-24 w-24" shapeRendering="crispEdges" aria-label="QR code">
        <rect width={size} height={size} fill="white" />
        {Array.from({ length: size }).map((_, r) =>
          Array.from({ length: size }).map((__,c) => {
            const i = r * size + c;
            const on = corner(r,c)
              ? r===0||r===6||c===0||c===6||(r>=2&&r<=4&&c>=2&&c<=4)
              : cells[i];
            return on ? <rect key={i} x={c} y={r} width={1} height={1} fill="#C21318" /> : null;
          })
        )}
      </svg>
    </div>
  );
}
