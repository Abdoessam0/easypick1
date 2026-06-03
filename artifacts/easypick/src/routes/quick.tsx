import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Logo } from "@/components/easypick/Logo";
import { useEasypick } from "@/lib/easypick-context";
import burger from "@/assets/meal-burger.jpg";
import moodLight from "@/assets/mood-light.png";
import moodFast from "@/assets/mood-fast.png";
import { ChevronRight, ChevronLeft, Check, Globe, ChevronDown, Sparkles } from "lucide-react";
import type { Mood } from "@/lib/meals";

export const Route = createFileRoute("/quick")({
  component: QuickPage,
});

const moods: {
  key: Mood;
  label: string;
  labelColor: string;
  desc: string;
  summary: string;
  img: string;
  imgBg: string;
  imgClass: string;
  accent: string;
}[] = [
  {
    key: "hungry",
    label: "HUNGRY",
    labelColor: "text-primary",
    desc: "Filling & satisfying meals",
    summary: "We'll prioritize satiety and filling portions.",
    img: burger,
    imgBg: "bg-[oklch(0.96_0.025_35)]",
    imgClass: "object-cover",
    accent: "from-red-200/45",
  },
  {
    key: "light",
    label: "LIGHT",
    labelColor: "text-emerald-600",
    desc: "Fresh & balanced choices",
    summary: "We'll prioritize lower calories and balanced nutrition.",
    img: moodLight,
    imgBg: "bg-[oklch(0.95_0.055_145)]",
    imgClass: "object-contain p-4",
    accent: "from-emerald-200/45",
  },
  {
    key: "fast",
    label: "FAST",
    labelColor: "text-orange-500",
    desc: "Ready in minutes",
    summary: "We'll prioritize the fastest prep times.",
    img: moodFast,
    imgBg: "bg-[oklch(0.965_0.025_25)]",
    imgClass: "object-contain p-4",
    accent: "from-orange-200/45",
  },
];

function QuickPage() {
  const { mood, setMood, setMode } = useEasypick();
  const nav = useNavigate();
  const selected = moods.find((m) => m.key === mood);

  return (
    <div className="bg-canvas relative min-h-screen overflow-hidden px-5 pb-12 pt-5 md:px-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl quick-drift" />
      <div className="pointer-events-none absolute -right-28 top-28 h-96 w-96 rounded-full bg-red-200/35 blur-3xl quick-drift-reverse" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-full bg-primary/15 blur-3xl quick-drift" />
      <div className="pointer-events-none absolute left-8 top-44 hidden h-28 w-28 bg-[radial-gradient(circle,var(--primary)_1px,transparent_1.5px)] bg-[length:14px_14px] opacity-20 md:block" />
      <div className="pointer-events-none absolute right-16 bottom-32 hidden h-32 w-32 bg-[radial-gradient(circle,var(--primary)_1px,transparent_1.5px)] bg-[length:14px_14px] opacity-20 md:block" />

      <header className="relative z-10 flex items-center justify-between">
        <Link
          to="/mode"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-sm font-bold text-foreground/70 shadow-soft backdrop-blur transition hover:-translate-x-1 hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Link>
        <button className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-foreground/70 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-primary">
          <Globe className="h-4 w-4" />
          EN
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center pt-4 text-center md:pt-7">
        <Logo className="h-20 w-auto quick-pop md:h-24" />
        <h1 className="quick-rise mt-2 max-w-3xl text-[3.1rem] font-black leading-[1.02] tracking-tight md:text-[4.5rem]">
          What are you
          <span className="block text-gradient-primary">craving today?</span>
        </h1>
        <p className="quick-rise mt-5 max-w-md text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
          Choose a mood and we'll narrow the options for you.
        </p>

        <div className="mt-8 grid w-full grid-cols-1 gap-5 md:mt-9 md:grid-cols-3 md:gap-6">
        {moods.map((m) => {
          const active = mood === m.key;
          return (
            <button
              key={m.key}
              onClick={() => {
                setMode("quick");
                setMood(m.key);
              }}
              className={`quick-card-enter group relative flex min-h-[410px] flex-col items-center overflow-hidden rounded-[2rem] border bg-white p-7 text-center shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-glow ${
                active ? "border-primary/50 ring-2 ring-primary shadow-glow quick-selected" : "border-white/80"
              }`}
              style={{ animationDelay: `${moods.indexOf(m) * 110}ms` }}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${m.accent} via-transparent to-transparent opacity-70`} />
              {active && (
                <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow quick-pop">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <div className={`relative w-full overflow-hidden rounded-[1.6rem] ${m.imgBg}`} style={{ aspectRatio: "4/3" }}>
                <img
                  src={m.img}
                  alt={m.label}
                  loading="lazy"
                  className={`h-full w-full transition duration-500 group-hover:scale-110 ${m.imgClass}`}
                />
              </div>
              <div className={`mt-2 text-3xl font-black tracking-[0.08em] ${m.labelColor}`}>
                {m.label}
              </div>
              <div className="text-base font-medium text-muted-foreground">{m.desc}</div>
              <div className={`mt-auto flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white shadow-soft transition group-hover:scale-110 ${
                active ? "border-primary bg-primary text-white" : "border-primary/15 text-foreground/60"
              }`}>
                <ChevronRight className="h-5 w-5" />
              </div>
            </button>
          );
        })}
        </div>

        <div className="mt-7 flex flex-col items-center gap-4">
          <button
            disabled={!mood}
            onClick={() => nav({ to: "/results" })}
            className="quick-cta-shine inline-flex min-h-[58px] min-w-[300px] items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-12 py-4 text-base font-black uppercase tracking-wide text-primary-foreground shadow-glow transition hover:-translate-y-1 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Show best matches <ChevronRight className="h-5 w-5" />
          </button>

          <div className="flex min-h-[28px] items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>
              {selected
                ? `${selected.label} selected. ${selected.summary}`
                : "Pick a mood. 2 options will be recommended for you."}
            </span>
            </div>
        </div>
      </main>
    </div>
  );
}
