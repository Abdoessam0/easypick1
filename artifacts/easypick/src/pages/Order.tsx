import { useLocation, Redirect } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import { getMealById } from "@/lib/meals";
import { Check, Home, Smartphone, Sparkles, Clock, Flame } from "lucide-react";

export default function OrderPage() {
  const { finalChoice, reset } = useEasypick();
  const [, navigate] = useLocation();
  if (!finalChoice) return <Redirect to="/" />;
  const meal = getMealById(finalChoice)!;

  return (
    <Shell>
      <div className="mx-auto max-w-4xl text-center mb-10">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[oklch(0.60_0.14_145)] text-white shadow-glow">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Your order is{" "}
          <span className="text-gradient-primary">on its way!</span>
        </h1>
        <p className="mt-4 text-[15px] text-muted-foreground">
          Show this QR at the counter or wait — the kitchen has your order.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="card-premium flex items-center gap-5 p-6">
          <img
            src={meal.image}
            alt={meal.name}
            className="h-32 w-32 shrink-0 rounded-2xl object-cover"
          />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
              Confirmed order
            </div>
            <h2 className="text-xl font-extrabold leading-tight">{meal.name}</h2>
            <p className="mt-1 text-[13px] text-muted-foreground line-clamp-2">{meal.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.60_0.14_145_/_0.12)] px-3 py-1 text-[12px] font-bold text-[oklch(0.50_0.14_145)]">
                <Sparkles className="h-3 w-3" /> Ready in {meal.prepTime} min
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[12px] font-bold text-primary">
                <Flame className="h-3 w-3" /> {meal.calories} kcal
              </span>
            </div>
          </div>
        </div>

        <div className="card-premium flex flex-col items-center gap-4 p-6 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Show this QR to staff
          </div>
          <FakeQR />
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Smartphone className="h-4 w-4 text-primary" />
            Scan at the counter to confirm
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-3">
        <button
          onClick={() => { reset(); navigate("/"); }}
          className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-[13px] font-bold text-primary-foreground shadow-glow hover:brightness-110 transition"
        >
          <Home className="h-4 w-4" /> Back to home
        </button>
        <button
          onClick={() => navigate("/mode")}
          className="flex items-center gap-2 rounded-full border-2 border-border bg-white px-8 py-4 text-[13px] font-bold text-foreground hover:border-primary/30 hover:bg-primary-soft transition"
        >
          Start a new pick
        </button>
      </div>
    </Shell>
  );
}

function FakeQR() {
  const size = 23;
  let seed = 42;
  return (
    <div className="rounded-2xl bg-white p-3 shadow-soft border border-border ring-2 ring-primary/20">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-44 w-44" shapeRendering="crispEdges" aria-label="QR code">
        <rect width={size} height={size} fill="white" />
        {Array.from({ length: size * size }).map((_, i) => {
          const r = Math.floor(i / size);
          const c = i % size;
          seed = (seed * 1103515245 + 12345) & 0x7fffffff;
          const inCorner = (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
          if (inCorner) {
            const rr = r < 7 ? r : size - 1 - r;
            const cc = c < 7 ? c : c >= size - 7 ? size - 1 - c : c;
            const on = rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4);
            return on ? <rect key={i} x={c} y={r} width={1} height={1} fill="oklch(0.48 0.21 27)" /> : null;
          }
          return seed % 2 === 0 ? <rect key={i} x={c} y={r} width={1} height={1} fill="#1a1a1a" /> : null;
        })}
      </svg>
    </div>
  );
}
