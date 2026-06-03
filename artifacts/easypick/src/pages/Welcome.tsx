import { useLocation } from "wouter";
import { useEasypick } from "@/lib/easypick-context";
import { Logo } from "@/components/easypick/Logo";
import { Globe, ChevronDown, ChevronRight, HelpCircle, Users } from "lucide-react";

export default function Welcome() {
  const { setMode, reset } = useEasypick();
  const [, navigate] = useLocation();

  const goSmart = () => { reset(); setMode("smart"); navigate("/smart"); };
  const goQuick = () => { reset(); setMode("quick"); navigate("/quick"); };

  const smartBenefits: { icon: React.ReactNode; label: string }[] = [
    { icon: <span className="text-2xl leading-none">🎯</span>, label: "Personalized\nto You" },
    { icon: <span className="text-2xl leading-none">📊</span>, label: "Matches Your\nGoals" },
    { icon: <span className="text-2xl leading-none">💚</span>, label: "Healthier\nChoices" },
    { icon: <span className="text-2xl leading-none">🛡️</span>, label: "Better\nDecisions" },
  ];

  const quickBenefits: { icon: React.ReactNode; label: string }[] = [
    { icon: <span className="text-2xl leading-none">⚡</span>, label: "Super\nFast" },
    { icon: <span className="text-2xl leading-none">🍽️</span>, label: "Curated\nOptions" },
    { icon: <span className="text-2xl leading-none">👆</span>, label: "Easy\n& Simple" },
    { icon: <span className="text-2xl leading-none">😊</span>, label: "Less Stress\nMore Enjoyment" },
  ];

  return (
    <div className="bg-canvas relative min-h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6 md:px-10">
        <div className="w-8" />
        <div className="flex flex-col items-center gap-0 pt-1">
          <Logo className="h-14 w-auto" />
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
          icon={<SmartPickCardIcon />}
          title={<><span className="text-foreground">SMART </span><span className="text-primary">PICK</span></>}
          desc="Answer a few simple questions and we'll personalize the results for you."
          benefits={smartBenefits}
          cta="START SMART PICK"
          onClick={goSmart}
        />
        <ModeCard
          icon={<QuickPickCardIcon />}
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
  benefits: { icon: React.ReactNode; label: string }[];
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
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[oklch(0.97_0.012_30)] text-primary">
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

/* ── Smart Pick card icon: rounded brain matching reference ── */
function SmartPickCardIcon() {
  return (
    <svg viewBox="0 0 44 44" className="h-10 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {/* Left hemisphere — full rounded lobe */}
      <path d="M21 11 C19 8,13 7,9 11 C6 14,5 19,7 22 C5 25,5 30,9 33 C12 35,17 36,21 34 L21 11Z" />
      {/* Left folds */}
      <path d="M21 18 C18 17,14 18,12 21" />
      <path d="M21 27 C18 26,14 27,12 30" />

      {/* Right hemisphere — mirror lobe */}
      <path d="M23 11 C25 8,31 7,35 11 C38 14,39 19,37 22 C39 25,39 30,35 33 C32 35,27 36,23 34 L23 11Z" />
      {/* Right folds */}
      <path d="M23 18 C26 17,30 18,32 21" />
      <path d="M23 27 C26 26,30 27,32 30" />

      {/* Center gap line */}
      <line x1="22" y1="11" x2="22" y2="34" strokeWidth="1" stroke="white" />
    </svg>
  );
}

/* ── Quick Pick card icon: bold lightning bolt ── */
function QuickPickCardIcon() {
  return (
    <svg viewBox="0 0 44 44" className="h-10 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M25 5L10 24h12l-3 15L37 20H25L25 5z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M25 5L10 24h12l-3 15L37 20H25L25 5z" />
    </svg>
  );
}
