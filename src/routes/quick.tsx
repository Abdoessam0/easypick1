import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Shell } from "@/components/easypick/Shell";
import { PageTitle } from "@/components/easypick/PageTitle";
import { useEasypick } from "@/lib/easypick-context";
import burger from "@/assets/meal-burger.jpg";
import light from "@/assets/mood-light.png";
import fast from "@/assets/mood-fast.png";
import { ChevronRight, Star, ChevronLeft } from "lucide-react";
import type { Mood } from "@/lib/meals";

export const Route = createFileRoute("/quick")({
  component: QuickPage,
});

const moods: {
  key: Mood;
  label: string;
  color: string;
  desc: string;
  img: string;
}[] = [
  {
    key: "hungry",
    label: "HUNGRY",
    color: "text-primary",
    desc: "Filling & satisfying meals",
    img: burger,
  },
  {
    key: "light",
    label: "LIGHT",
    color: "text-success",
    desc: "Fresh & balanced choices",
    img: light,
  },
  {
    key: "fast",
    label: "FAST",
    color: "text-primary",
    desc: "Ready in minutes",
    img: fast,
  },
];

function QuickPage() {
  const { mood, setMood, setMode } = useEasypick();
  const nav = useNavigate();

  return (
    <Shell>
      <Link
        to="/mode"
        className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary"
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
              className={`glass relative flex flex-col items-center gap-4 rounded-[2rem] p-6 transition hover:-translate-y-1 hover:shadow-glow ${
                active ? "ring-primary-soft border-primary/50" : ""
              }`}
            >
              <div className="flex aspect-square w-full items-center justify-center rounded-3xl bg-primary-soft/40 p-6">
                <img
                  src={m.img}
                  alt={m.label}
                  loading="lazy"
                  className="max-h-56 w-auto object-contain"
                />
              </div>
              <div className="text-2xl font-extrabold tracking-wide">
                <span className={m.color}>{m.label}</span>
              </div>
              <div className="text-sm text-muted-foreground">{m.desc}</div>
              <div
                className={`mt-2 flex h-10 w-10 items-center justify-center rounded-full transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-card text-primary shadow-soft"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          disabled={!mood}
          onClick={() => nav({ to: "/results" })}
          className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          SHOW BEST MATCHES <ChevronRight className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="h-4 w-4 text-primary" />
          {mood ? "Curated options ready for you." : "Pick a mood to continue."}
        </div>
      </div>
    </Shell>
  );
}
