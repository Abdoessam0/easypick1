import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import { getMealById, type Meal } from "@/lib/meals";
import {
  Check,
  Flame,
  Clock,
  Heart,
  Dumbbell,
  Leaf,
  Candy,
  Zap,
  ShoppingBag,
  RefreshCw,
  Star,
  Smile,
} from "lucide-react";

export const Route = createFileRoute("/choose")({
  component: ChoosePage,
});

function ChoosePage() {
  const { finalChoice, compare, mode, mood, reset } = useEasypick();
  const nav = useNavigate();

  if (!finalChoice) return <Navigate to="/results" />;

  const winner = getMealById(finalChoice)!;
  const otherId = compare.find((id) => id !== finalChoice);
  const other = otherId ? getMealById(otherId) : null;

  const reasons = buildReasons(winner, mode, mood);

  return (
    <Shell>
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center justify-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-glow">
            <Check className="h-7 w-7" strokeWidth={3} />
          </div>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Great <span className="text-gradient-primary">choice!</span>
          </h1>
        </div>
        <p className="mt-3 text-lg text-muted-foreground">
          You picked the best match for your craving.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1.4fr_0.9fr]">
        {/* Winner */}
        <div className="glass relative flex flex-col items-center gap-3 rounded-[2rem] p-6">
          <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-glow">
            <Star className="h-3 w-3 fill-current" /> YOUR CHOICE
          </div>
          <div className="aspect-square w-full overflow-hidden rounded-3xl bg-primary-soft/40">
            <img
              src={winner.image}
              alt={winner.name}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold">{winner.name}</h2>
          <p className="text-center text-sm text-muted-foreground">
            {winner.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Stat icon={Flame} value={`${winner.calories} kcal`} />
            <Stat icon={Clock} value={`${winner.prepTime} min`} />
            <Stat icon={Heart} value={`${winner.satiety} Satiety`} />
          </div>
        </div>

        {/* Reasons */}
        <div className="glass rounded-[2rem] p-6">
          <h3 className="text-xl font-bold">Why it&rsquo;s the best match for you</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on your{" "}
            {mode === "smart"
              ? "Smart Pick preferences"
              : `${mood} mood`}
            .
          </p>
          <ul className="mt-5 space-y-4">
            {reasons.map((r) => (
              <li key={r.title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                  <r.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-success">{r.title}</div>
                  <div className="text-sm text-muted-foreground">{r.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Alternative */}
        <div className="flex flex-col gap-4">
          {other && (
            <div className="glass-soft rounded-[2rem] p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Runner up
              </div>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={other.image}
                  alt={other.name}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <div>
                  <div className="font-bold">{other.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {other.calories} kcal · {other.prepTime} min
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="glass rounded-[2rem] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
                <Smile className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-primary">Thank you!</div>
                <div className="text-sm text-muted-foreground">
                  Your healthy choice makes a difference. Enjoy your meal!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR action */}
      <div className="glass mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-5 rounded-[2rem] p-6 md:flex-row">
        <div className="flex items-center gap-4">
          <QRBlock />
          <div>
            <div className="font-bold text-primary">Ready to enjoy?</div>
            <div className="text-sm text-muted-foreground">
              Scan the QR code or send the order to the kitchen.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => nav({ to: "/order" })}
            className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-glow"
          >
            <ShoppingBag className="h-4 w-4" /> SEND ORDER
          </button>
          <Link
            to="/results"
            className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-4 text-sm font-bold"
          >
            <RefreshCw className="h-4 w-4" /> CHOOSE ANOTHER
          </Link>
          <button
            onClick={() => {
              reset();
              nav({ to: "/" });
            }}
            className="text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            Start over
          </button>
        </div>
      </div>
    </Shell>
  );
}

function Stat({ icon: Icon, value }: { icon: React.ElementType; value: string }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-primary" />
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function buildReasons(meal: Meal, mode: string | null, mood: string | null) {
  const reasons: { icon: React.ElementType; title: string; body: string }[] = [];

  if (mode === "smart") {
    // Smart Pick: nutrition-focused
    if (meal.protein >= 25) {
      reasons.push({
        icon: Dumbbell,
        title: "High in protein",
        body: `Supports your muscles and keeps you full longer. (${meal.protein}g)`,
      });
    }
    if (meal.sugar <= 8) {
      reasons.push({
        icon: Candy,
        title: "Lower in sugar",
        body: `Fits your preference for less sweet meals. (${meal.sugar}g)`,
      });
    }
    reasons.push({
      icon: Flame,
      title: "Balanced calories",
      body: `${meal.calories} kcal — a balanced load for your day.`,
    });
    reasons.push({
      icon: Leaf,
      title: "Matches your preferences",
      body: "Closest fit to the nutrition sliders you set.",
    });
  } else {
    // Quick Pick: mood-focused (price, calories, prep, satiety)
    reasons.push({
      icon: Flame,
      title: mood === "light" ? "Fits your calorie target" : "Right calorie load",
      body: `${meal.calories} kcal — matches a ${mood ?? "quick"} mood.`,
    });
    if (mood === "fast" || meal.prepTime <= 12) {
      reasons.push({
        icon: Zap,
        title: "Ready quickly",
        body: `On your table in just ${meal.prepTime} minutes.`,
      });
    }
    reasons.push({
      icon: Heart,
      title: meal.satiety === "High" ? "High satiety" : "Satisfying portion",
      body:
        meal.satiety === "High"
          ? "Filling enough to keep you happy."
          : "Balanced portion that satisfies without feeling heavy.",
    });
    reasons.push({
      icon: Dumbbell,
      title: "Good price",
      body: `${meal.price} — solid value for what you get.`,
    });
  }

  return reasons.slice(0, 4);
}

function QRBlock() {
  // Static placeholder QR built as SVG checker pattern — visually believable
  const size = 21;
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < size * size; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    cells.push(seed % 3 !== 0);
  }
  // force corner squares
  const corner = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
  return (
    <div className="rounded-2xl bg-card p-3 shadow-soft">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-32 w-32"
        shapeRendering="crispEdges"
        aria-label="QR code"
      >
        <rect width={size} height={size} fill="white" />
        {Array.from({ length: size }).map((_, r) =>
          Array.from({ length: size }).map((__, c) => {
            const i = r * size + c;
            const on = corner(r, c)
              ? (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) &&
                !(r < 7 && c >= size - 7 && (c === size - 7 || c === size - 1 || r === 0 || r === 6 || (r >= 2 && r <= 4 && c >= size - 5 && c <= size - 3)))
                ? true
                : false
              : cells[i];
            return on ? <rect key={i} x={c} y={r} width={1} height={1} /> : null;
          })
        )}
      </svg>
    </div>
  );
}
