import { Link, useLocation, Redirect } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import { getMealById, scoreMeal, pickWinner, type Meal, type CompareCtx } from "@/lib/meals";
import {
  Check, Flame, Clock, Dumbbell, Candy, Heart,
  Trophy, Leaf, Zap, RefreshCw, Smartphone,
} from "lucide-react";

export default function ChoosePage() {
  const { finalChoice, compare, mode, mood, prefs, reset } = useEasypick();
  const [, navigate] = useLocation();

  if (!finalChoice) return <Redirect to="/results" />;

  const winner = getMealById(finalChoice)!;
  const otherIds = compare.filter((id) => id !== finalChoice);
  const runner = otherIds.length > 0 ? getMealById(otherIds[0]) : null;

  const winnerMatch = mode === "smart" ? Math.round(scoreMeal(winner, prefs) * 100) : null;
  const runnerMatch = runner && mode === "smart" ? Math.round(scoreMeal(runner, prefs) * 100) : null;

  const reasons = buildReasons(winner, mode, mood);

  return (
    <Shell>
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <div className="mb-6 flex items-start gap-3">
          <Link
            to="/compare"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/80 px-4 py-2 text-sm font-semibold text-foreground/70 shadow-soft hover:text-primary transition shrink-0 mt-1"
          >
            ← Back
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-[2.8rem] font-extrabold leading-tight tracking-tight md:text-[3.5rem]">
              Your <span className="text-gradient-primary">result</span> is ready!{" "}
              <span className="text-[2rem]">✦</span>
            </h1>
            <p className="mt-2 text-[15px] text-muted-foreground">
              Based on your preferences, we recommend this meal for you.
            </p>
          </div>
          <div className="w-24 shrink-0" />
        </div>

        {/* Top comparison bar */}
        <div className="card-premium mb-5 p-5">
          <div className="grid grid-cols-[1fr_120px_1fr] items-center gap-4">
            {/* Winner side */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-soft">
                <img src={winner.image} alt={winner.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-[16px] font-extrabold">{winner.name}</div>
                {winnerMatch !== null && (
                  <div className="text-[13px] font-bold text-[oklch(0.60_0.14_145)]">
                    {winnerMatch}% Match
                  </div>
                )}
                <div className="mt-1.5 flex flex-wrap gap-3 text-[12px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Dumbbell className="h-3 w-3 text-primary" />{winner.protein}g Protein</span>
                  <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-primary" />{winner.calories} kcal</span>
                  <span className="flex items-center gap-1"><Candy className="h-3 w-3 text-primary" />{winner.sugar}g Sugar</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-primary" />{winner.prepTime} min</span>
                </div>
              </div>
            </div>

            {/* Trophy center */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[oklch(0.97_0.04_80)] text-3xl">
                🏆
              </div>
              <div className="text-[12px] font-bold text-[oklch(0.60_0.14_80)]">Best Match</div>
            </div>

            {/* Runner side */}
            {runner ? (
              <div className="flex items-center gap-4 flex-row-reverse text-right">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-soft opacity-80">
                  <img src={runner.image} alt={runner.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-[16px] font-extrabold">{runner.name}</div>
                  {runnerMatch !== null && (
                    <div className="text-[13px] font-bold text-muted-foreground">
                      {runnerMatch}% Match
                    </div>
                  )}
                  <div className="mt-1.5 flex flex-wrap gap-3 text-[12px] text-muted-foreground justify-end">
                    <span className="flex items-center gap-1"><Dumbbell className="h-3 w-3 text-primary" />{runner.protein}g Protein</span>
                    <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-primary" />{runner.calories} kcal</span>
                    <span className="flex items-center gap-1"><Candy className="h-3 w-3 text-primary" />{runner.sugar}g Sugar</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-primary" />{runner.prepTime} min</span>
                  </div>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Featured winner */}
        <div className="card-premium mb-5 overflow-hidden">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-[320px_1fr_260px]">
            {/* Image */}
            <div className="relative">
              <div className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-white">
                Recommended for you
              </div>
              <button className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-muted-foreground hover:text-primary transition">
                <Heart className="h-4 w-4" />
              </button>
              <img
                src={winner.image}
                alt={winner.name}
                className="h-full w-full object-cover md:min-h-[300px]"
                style={{ maxHeight: 320 }}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4 p-6">
              <div>
                <h2 className="text-[22px] font-extrabold">{winner.name}</h2>
                <p className="mt-1 text-[13px] text-muted-foreground">{winner.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {winner.tags.map((t) => (
                  <span key={t} className="rounded-full bg-primary-soft px-3 py-1 text-[12px] font-bold text-primary">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-[13px]">
                {[
                  { icon: Dumbbell, val: `${winner.protein}g`, lbl: "Protein" },
                  { icon: Flame, val: `${winner.calories}`, lbl: "kcal" },
                  { icon: Candy, val: `${winner.sugar}g`, lbl: "Sugar" },
                  { icon: Clock, val: `${winner.prepTime}`, lbl: "min" },
                ].map(({ icon: Icon, val, lbl }) => (
                  <div key={lbl} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="font-bold">{val}</span>
                    <span className="text-muted-foreground">{lbl}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-primary-soft px-4 py-3.5">
                <span className="text-lg">✦</span>
                <p className="text-[13px] font-medium text-foreground/80 leading-snug">
                  Great choice! This meal matches your goals and keeps you feeling amazing.
                </p>
              </div>
            </div>

            {/* Why section */}
            <div className="flex flex-col gap-4 border-t border-border p-6 md:border-l md:border-t-0">
              <h3 className="text-[15px] font-extrabold leading-snug">
                Why this is the best match for you?
              </h3>
              <ul className="flex flex-col gap-4">
                {reasons.map((r) => (
                  <li key={r.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.60_0.14_145_/_0.12)]">
                      <r.icon className="h-4 w-4 text-[oklch(0.50_0.14_145)]" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[oklch(0.50_0.14_145)]">{r.title}</div>
                      <div className="text-[12px] text-muted-foreground leading-snug">{r.body}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="card-premium p-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Thank you */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white text-2xl shadow-glow">
                😊
              </div>
              <div>
                <div className="font-extrabold text-primary text-[16px]">Thank you!</div>
                <div className="text-[12px] text-muted-foreground leading-snug mt-0.5">
                  Your healthy choice makes a difference.<br />Enjoy your meal!
                </div>
                <Heart className="mt-1.5 h-4 w-4 text-primary" />
              </div>
            </div>

            {/* QR */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-[13px] font-bold text-muted-foreground">
                Show this QR to place your order
              </div>
              <SmallQR />
            </div>

            {/* Scan */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-[13px] text-muted-foreground leading-snug">
                  Scan at the counter or show to our staff to confirm your order.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3 border-t border-border pt-5">
            <button
              onClick={() => navigate("/order")}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[13px] font-bold text-primary-foreground shadow-glow hover:brightness-110 transition"
            >
              <Check className="h-4 w-4" strokeWidth={2.5} /> PLACE ORDER
            </button>
            <button
              onClick={() => navigate("/results")}
              className="flex items-center gap-2 rounded-full border-2 border-border bg-white px-8 py-3.5 text-[13px] font-bold text-foreground hover:border-primary/30 hover:bg-primary-soft transition"
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
  if (mode === "smart") {
    return [
      { icon: Dumbbell, title: "High in protein", body: "Helps support your muscles & keeps you full longer." },
      { icon: Leaf, title: "Light & balanced", body: "Perfect calorie balance for your day." },
      { icon: Candy, title: "Lower in sugar", body: `Fits your preference for less sweet meals.` },
      { icon: Zap, title: "Sustained energy", body: "Provides steady energy without feeling heavy." },
    ];
  }
  return [
    { icon: Flame, title: mood === "light" ? "Low in calories" : "Right calorie load", body: `${meal.calories} kcal matches a ${mood ?? "quick"} mood perfectly.` },
    { icon: Heart, title: meal.satiety === "High" ? "High satiety" : "Satisfying portion", body: "Filling enough to keep you satisfied." },
    { icon: Clock, title: "Quick to prepare", body: `Ready in ${meal.prepTime} minutes — no long waits.` },
    { icon: Dumbbell, title: "Good protein", body: `${meal.protein}g of protein to keep your energy up.` },
  ];
}

function SmallQR() {
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
    <div className="rounded-2xl bg-white p-2 shadow-soft border border-border">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-24 w-24" shapeRendering="crispEdges" aria-label="QR code">
        <rect width={size} height={size} fill="white" />
        {Array.from({ length: size }).map((_, r) =>
          Array.from({ length: size }).map((__, c) => {
            const i = r * size + c;
            const on = corner(r, c)
              ? r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)
              : cells[i];
            return on ? <rect key={i} x={c} y={r} width={1} height={1} fill="#C21318" /> : null;
          })
        )}
      </svg>
    </div>
  );
}
