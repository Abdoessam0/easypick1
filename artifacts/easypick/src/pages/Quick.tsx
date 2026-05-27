import { Link, useLocation } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import burger from "@/assets/meal-burger.jpg";
import salmon from "@/assets/meal-salmon.jpg";
import soup from "@/assets/meal-soup.jpg";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { Mood } from "@/lib/meals";

const moods: {
  key: Mood;
  label: string;
  color: string;
  textColor: string;
  desc: string;
  summary: string;
  img: string;
}[] = [
  {
    key: "hungry",
    label: "HUNGRY",
    color: "bg-red-50",
    textColor: "text-primary",
    desc: "Filling & satisfying meals",
    summary: "We'll prioritize satiety and filling portions.",
    img: burger,
  },
  {
    key: "light",
    label: "LIGHT",
    color: "bg-emerald-50",
    textColor: "text-emerald-600",
    desc: "Fresh & balanced choices",
    summary: "We'll prioritize lower calories and balanced nutrition.",
    img: salmon,
  },
  {
    key: "fast",
    label: "FAST",
    color: "bg-orange-50",
    textColor: "text-orange-500",
    desc: "Ready in minutes",
    summary: "We'll prioritize the fastest prep times.",
    img: soup,
  },
];

export default function QuickPage() {
  const { mood, setMood, setMode } = useEasypick();
  const [, navigate] = useLocation();

  return (
    <Shell>
      <Link
        to="/mode"
        className="mb-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/80 px-5 py-2 text-sm font-semibold text-foreground/70 shadow-soft hover:text-primary transition"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mx-auto max-w-4xl text-center mb-10">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-[3.5rem]">
          What are you{" "}
          <span className="text-gradient-primary">craving today?</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-sm mx-auto">
          Choose a mood and we'll narrow the options for you.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3 mb-10">
        {moods.map((m) => {
          const active = mood === m.key;
          return (
            <button
              key={m.key}
              onClick={() => {
                setMode("quick");
                setMood(m.key);
              }}
              className={`card-premium relative flex flex-col items-center gap-4 p-6 text-center transition-all duration-200 ${
                active ? "ring-2 ring-primary shadow-glow" : ""
              }`}
            >
              <div
                className={`w-full overflow-hidden rounded-2xl ${m.color}`}
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={m.img}
                  alt={m.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className={`text-2xl font-extrabold tracking-widest ${m.textColor}`}>
                {m.label}
              </div>
              <div className="text-sm text-muted-foreground leading-snug">{m.desc}</div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-border text-muted-foreground"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-5xl flex flex-col items-center gap-4">
        <button
          disabled={!mood}
          onClick={() => navigate("/results")}
          className="inline-flex min-h-[56px] items-center gap-3 rounded-full bg-primary px-12 py-4 text-[15px] font-bold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
        >
          SHOW BEST MATCHES <ChevronRight className="h-5 w-5" />
        </button>
        {!mood && (
          <p className="text-sm text-muted-foreground">
            Pick a mood to continue.
          </p>
        )}
      </div>
    </Shell>
  );
}
