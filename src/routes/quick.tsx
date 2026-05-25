import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { PageTitle } from "@/components/easypick/PageTitle";
import { useEasypick } from "@/lib/easypick-context";
import burger from "@/assets/meal-burger.jpg";
import salmon from "@/assets/meal-salmon.jpg";
import soup from "@/assets/meal-soup.jpg";
import { ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react";
import type { Mood } from "@/lib/meals";

export const Route = createFileRoute("/quick")({
  component: QuickPage,
});

const moods: {
  key: Mood;
  label: string;
  desc: string;
  summary: string;
  img: string;
}[] = [
  {
    key: "hungry",
    label: "Hungry",
    desc: "Filling meals with higher satiety",
    summary: "We'll prioritize satiety and filling portions.",
    img: burger,
  },
  {
    key: "light",
    label: "Light",
    desc: "Fresh meals with lower calories",
    summary: "We'll prioritize lower calories and balanced nutrition.",
    img: salmon,
  },
  {
    key: "fast",
    label: "Fast",
    desc: "Ready in 15 minutes or less",
    summary: "We'll prioritize the fastest prep times.",
    img: soup,
  },
];

function QuickPage() {
  const { mood, setMood, setMode } = useEasypick();
  const nav = useNavigate();
  const selected = moods.find((m) => m.key === mood);

  return (
    <Shell>
      <Link
        to="/mode"
        className="glass mb-6 inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <PageTitle
        title="What are you"
        accent="craving today?"
        subtitle="Choose a mood and we'll narrow the options for you."
      />

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {moods.map((m) => {
          const active = mood === m.key;
          return (
            <button
              key={m.key}
              onClick={() => {
                setMode("quick");
                setMood(m.key);
              }}
              className={`glass relative flex flex-col items-center gap-4 rounded-[2rem] p-6 text-center transition hover:-translate-y-1 hover:shadow-glow ${
                active
                  ? "ring-2 ring-primary shadow-glow border-primary/50"
                  : ""
              }`}
            >
              {active && (
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <div className="aspect-square w-full overflow-hidden rounded-3xl bg-primary-soft/40">
                <img
                  src={m.img}
                  alt={m.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-2xl font-extrabold tracking-tight text-foreground">
                {m.label}
              </div>
              <div className="text-sm text-muted-foreground">{m.desc}</div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="glass mx-auto mt-8 flex max-w-3xl items-center gap-3 rounded-2xl p-4 text-sm shadow-soft">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-bold">
              You selected:{" "}
              <span className="text-primary">{selected.label}</span>
            </div>
            <div className="text-muted-foreground">{selected.summary}</div>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          disabled={!mood}
          onClick={() => nav({ to: "/results" })}
          className="inline-flex min-h-[56px] items-center gap-3 rounded-full bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Show best matches <ChevronRight className="h-5 w-5" />
        </button>
        {!mood && (
          <div className="text-sm text-muted-foreground">
            Pick a mood to continue.
          </div>
        )}
      </div>
    </Shell>
  );
}
