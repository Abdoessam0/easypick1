import { Link, useLocation, Redirect } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import { getMealById } from "@/lib/meals";
import { Check, Home, Smartphone, Sparkles } from "lucide-react";

export default function OrderPage() {
  const { finalChoice, reset } = useEasypick();
  const [, navigate] = useLocation();
  if (!finalChoice) return <Redirect to="/" />;
  const meal = getMealById(finalChoice)!;

  return (
    <Shell>
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-success text-success-foreground shadow-glow">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>
        <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Your order is <span className="text-gradient-primary">on its way!</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Show this QR at the counter or wait — the kitchen has your order.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="glass flex items-center gap-5 rounded-[2rem] p-6">
          <img src={meal.image} alt={meal.name} className="h-32 w-32 rounded-2xl object-cover" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Confirmed order
            </div>
            <h2 className="mt-1 text-2xl font-extrabold">{meal.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{meal.description}</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
              <Sparkles className="h-3 w-3" /> Ready in {meal.prepTime} min
            </div>
          </div>
        </div>

        <div className="glass flex flex-col items-center gap-3 rounded-[2rem] p-6 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Show this QR to staff
          </div>
          <FakeQR />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Smartphone className="h-4 w-4 text-primary" />
            Scan at the counter to confirm
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            reset();
            navigate("/");
          }}
          className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-glow"
        >
          <Home className="h-4 w-4" /> Back to home
        </button>
        <Link
          to="/mode"
          className="rounded-full border border-border bg-card px-7 py-4 text-sm font-bold"
        >
          Start a new pick
        </Link>
      </div>
    </Shell>
  );
}

function FakeQR() {
  const size = 23;
  let seed = 42;
  return (
    <div className="rounded-2xl bg-card p-3 shadow-soft ring-2 ring-primary/30">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-44 w-44"
        shapeRendering="crispEdges"
        aria-label="QR code"
      >
        <rect width={size} height={size} fill="white" />
        {Array.from({ length: size * size }).map((_, i) => {
          const r = Math.floor(i / size);
          const c = i % size;
          seed = (seed * 1103515245 + 12345) & 0x7fffffff;
          const inCorner = (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
          if (inCorner) {
            const rr = r < 7 ? r : size - 1 - r;
            const cc = c < 7 ? c : c >= size - 7 ? size - 1 - c : c;
            const on =
              rr === 0 ||
              rr === 6 ||
              cc === 0 ||
              cc === 6 ||
              (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4);
            return on ? <rect key={i} x={c} y={r} width={1} height={1} /> : null;
          }
          return seed % 2 === 0 ? <rect key={i} x={c} y={r} width={1} height={1} /> : null;
        })}
      </svg>
    </div>
  );
}
