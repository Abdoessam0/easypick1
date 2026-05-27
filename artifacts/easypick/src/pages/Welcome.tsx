import { useLocation } from "wouter";
import { useEasypick } from "@/lib/easypick-context";
import { Logo } from "@/components/easypick/Logo";
import { Globe, ChevronDown, ChevronRight, HelpCircle, Users, Hand } from "lucide-react";

const smartBenefits = [
  { icon: "🎯", label: "Personalized\nto You" },
  { icon: "📊", label: "Matches Your\nGoals" },
  { icon: "💚", label: "Healthier\nChoices" },
  { icon: "⏱️", label: "Better\nDecisions" },
];

const quickBenefits = [
  { icon: "⚡", label: "Super\nFast" },
  { icon: "🍽️", label: "Curated\nOptions" },
  { icon: "👆", label: "Easy\n& Simple" },
  { icon: "😊", label: "Less Stress\nMore Enjoyment" },
];

export default function Welcome() {
  const { setMode, reset } = useEasypick();
  const [, navigate] = useLocation();

  const goSmart = () => { reset(); setMode("smart"); navigate("/smart"); };
  const goQuick = () => { reset(); setMode("quick"); navigate("/quick"); };

  return (
    <div
      className="bg-canvas relative min-h-screen overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6 md:px-10">
        <div className="w-8" />
        <div className="flex flex-col items-center gap-0 pt-1">
          <Logo className="h-8 w-auto" />
        </div>
        <button className="glass flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground/70">
          <Globe className="h-4 w-4" />
          <span className="text-xs font-semibold">EN</span>
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center text-center px-6 pt-6 pb-4">
        <h1 className="text-[3.2rem] font-extrabold leading-[1.1] tracking-tight md:text-[4rem]">
          Welcome to{" "}
          <span className="text-gradient-primary">Easypick</span>
        </h1>
        <p className="mt-3 text-[16px] text-muted-foreground">
          Let's help you find the perfect meal.
        </p>
        <div className="mt-4 flex flex-col items-center gap-1">
          <p className="text-[17px] font-bold text-primary">
            How would you like to choose?
          </p>
          <div className="h-[3px] w-12 rounded-full bg-primary/60" />
        </div>
      </div>

      {/* Mode cards */}
      <div className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 gap-4 px-6 pb-4 md:grid-cols-2 md:px-10">
        <ModeCard
          icon={<BrainIcon />}
          title={<><span className="text-foreground">SMART </span><span className="text-primary">PICK</span></>}
          desc="Answer a few simple questions and we'll personalize the results for you."
          benefits={smartBenefits}
          cta="START SMART PICK"
          onClick={goSmart}
        />
        <ModeCard
          icon={<ZapIconRed />}
          title={<><span className="text-foreground">QUICK </span><span className="text-primary">PICK</span></>}
          desc="Tell us what you're in the mood for and we'll narrow it down fast."
          benefits={quickBenefits}
          cta="START QUICK PICK"
          onClick={goQuick}
        />
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-6 pb-6 pt-2 md:px-10">
        <button className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/80 px-4 py-2.5 text-sm font-semibold text-foreground/60 shadow-soft">
          <HelpCircle className="h-4 w-4" />
          HELP
        </button>

        <div className="flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur border border-white/80 px-4 py-2.5 text-[13px] text-foreground/60 shadow-soft">
          <Users className="h-4 w-4 text-primary shrink-0" />
          <span>Designed for a shared experience.<br className="hidden sm:block" /> Everyone can explore together!</span>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <Hand className="h-4 w-4 text-primary" />
          <span className="font-semibold text-center">Tap anywhere<br />to continue</span>
        </div>
      </div>
    </div>
  );
}

function ModeCard({
  icon,
  title,
  desc,
  benefits,
  cta,
  onClick,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  desc: string;
  benefits: { icon: string; label: string }[];
  cta: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="card-premium group flex flex-col gap-4 p-6 text-left"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-soft">
          {icon}
        </div>
        <h3 className="text-[1.6rem] font-extrabold leading-tight tracking-tight">{title}</h3>
      </div>

      <p className="text-[14px] text-muted-foreground leading-relaxed">{desc}</p>

      <div className="h-px bg-border" />

      <div className="grid grid-cols-4 gap-2">
        {benefits.map(({ icon: ic, label }, i) => (
          <div key={i} className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[oklch(0.97_0.012_30)] text-[20px]">
              {ic}
            </div>
            <div className="text-[11px] font-semibold leading-tight text-foreground/70 whitespace-pre-line">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-3 text-[15px] font-bold text-primary-foreground shadow-glow group-hover:brightness-110 transition">
        {cta}
        <ChevronRight className="h-4 w-4" />
      </div>
    </button>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 8c-2 0-4 1-5 2.5C13 9 11 8 9 9c-2 1-3 3-3 5 0 1.5.5 3 1.5 4C6 19.5 6 21 7 22.5c1 1.5 2.5 2.5 4 2.5v5h18v-5c1.5 0 3-1 4-2.5 1-1.5 1-3 .5-4.5C34.5 17 35 15.5 35 14c0-2-1-4-3-5-2-1-4 0-5 1.5C26 9 24 8 22 8h-2Z" />
      <path d="M20 8v19M14 16h-4M30 16h-4M14 22h12" />
    </svg>
  );
}

function ZapIconRed() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 6L10 22h12l-4 12L34 18H22L26 6z" fill="currentColor" fillOpacity="0.12" />
      <path d="M22 6L10 22h12l-4 12L34 18H22L26 6z" />
    </svg>
  );
}
