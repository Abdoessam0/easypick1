import { Link, useLocation } from "wouter";
import { Shell } from "@/components/easypick/Shell";
import { useEasypick } from "@/lib/easypick-context";
import burger from "@/assets/meal-burger.jpg";
import moodLight from "@/assets/mood-light.png";
import moodFast from "@/assets/mood-fast.png";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import type { Mood } from "@/lib/meals";

const moods: {
  key: Mood;
  label: string;
  labelColor: string;
  desc: string;
  img: string;
  imgBg: string;
  imgClass: string;
}[] = [
  {
    key: "hungry",
    label: "HUNGRY",
    labelColor: "text-primary",
    desc: "Filling & satisfying meals",
    img: burger,
    imgBg: "bg-[oklch(0.97_0.015_30)]",
    imgClass: "object-cover",
  },
  {
    key: "light",
    label: "LIGHT",
    labelColor: "text-emerald-600",
    desc: "Fresh & balanced choices",
    img: moodLight,
    imgBg: "bg-[oklch(0.97_0.04_145)]",
    imgClass: "object-contain p-2",
  },
  {
    key: "fast",
    label: "FAST",
    labelColor: "text-orange-500",
    desc: "Ready in minutes",
    img: moodFast,
    imgBg: "bg-[oklch(0.97_0.015_30)]",
    imgClass: "object-contain p-2",
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
              className={`card-premium relative flex flex-col items-center gap-5 p-6 text-center transition-all duration-200 ${
                active ? "ring-2 ring-primary shadow-glow" : ""
              }`}
            >
              {active && (
                <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                  <Star className="h-3.5 w-3.5 fill-current" />
                </div>
              )}

              <div
                className={`w-full overflow-hidden rounded-2xl ${m.imgBg}`}
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={m.img}
                  alt={m.label}
                  loading="lazy"
                  className={`h-full w-full ${m.imgClass}`}
                />
              </div>

              <div className={`text-2xl font-extrabold tracking-widest ${m.labelColor}`}>
                {m.label}
              </div>
              <div className="text-sm text-muted-foreground leading-snug -mt-2">{m.desc}</div>

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition ${
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
          className="inline-flex min-h-[56px] items-center gap-3 rounded-full bg-primary px-14 py-4 text-[15px] font-bold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
        >
          SHOW BEST MATCHES <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </Shell>
  );
}
