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
    { icon: <TargetIcon />, label: "Personalized\nto You" },
    { icon: <ChartIcon />, label: "Matches Your\nGoals" },
    { icon: <LeafHeartIcon />, label: "Healthier\nChoices" },
    { icon: <CheckShieldIcon />, label: "Better\nDecisions" },
  ];

  const quickBenefits: { icon: React.ReactNode; label: string }[] = [
    { icon: <BoltIcon />, label: "Super\nFast" },
    { icon: <ForkIcon />, label: "Curated\nOptions" },
    { icon: <ChoiceHandIcon />, label: "Easy\n& Simple" },
    { icon: <SmileIcon />, label: "Less Stress\nMore Enjoyment" },
  ];

  return (
    <div className="bg-canvas relative min-h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6 md:px-10">
        <div className="w-8" />
        <div className="flex flex-col items-center gap-0 pt-1">
          <Logo className="h-20 w-auto" />
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

/* ── Smart Pick card icon: hand with X and checkmark circles ── */
function SmartPickCardIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* X circle — upper left */}
      <circle cx="12" cy="11" r="7" />
      <line x1="9.5" y1="8.5" x2="14.5" y2="13.5" />
      <line x1="14.5" y1="8.5" x2="9.5" y2="13.5" />
      {/* Checkmark circle — upper right */}
      <circle cx="36" cy="11" r="7" />
      <polyline points="32.5,11 35,13.5 39.5,8" strokeWidth="2.2" />
      {/* Hand / finger pointing up */}
      <path d="M24 39.5V20.5a2.5 2.5 0 0 1 5 0v5" />
      <path d="M29 25.5a2.5 2.5 0 0 1 5 0v2.5" />
      <path d="M34 28a2.5 2.5 0 0 1 5 0v4C39 38 35.5 43.5 29 43.5H26c-3.5 0-5.5-2-6.5-4.5L16 32a2.5 2.5 0 0 1 4.7-1.7L22 33" />
      <path d="M19.5 25.5V16.5a2.5 2.5 0 0 1 5 0v4" />
    </svg>
  );
}

/* ── Quick Pick card icon: stopwatch with flames ── */
function QuickPickCardIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Flames on the left */}
      <path d="M9 32c0-5 3-8 3-13 0 0 2 3 2 6 1-2 2-5 1-9 3 2 5 6 5 10 0-1 0-3-1-5 2 1 3 4 3 7 0 5-4 9-7 9s-6-2-6-5z" strokeWidth="1.8" />
      {/* Stopwatch body */}
      <circle cx="31" cy="30" r="13" />
      {/* Crown/button on top */}
      <rect x="28" y="14" width="6" height="3.5" rx="1.5" />
      {/* Side loop */}
      <path d="M40 18.5 l2.5-2.5" strokeWidth="2" />
      <circle cx="43.5" cy="15.5" r="1.5" fill="currentColor" strokeWidth="0" />
      {/* Clock hands */}
      <line x1="31" y1="30" x2="31" y2="22" strokeWidth="2.2" />
      <line x1="31" y1="30" x2="36" y2="33" strokeWidth="2.2" />
      {/* Center dot */}
      <circle cx="31" cy="30" r="1.5" fill="currentColor" strokeWidth="0" />
      {/* Tick marks */}
      <line x1="31" y1="18.5" x2="31" y2="20.5" strokeWidth="1.5" />
      <line x1="31" y1="39.5" x2="31" y2="41.5" strokeWidth="1.5" />
      <line x1="19.5" y1="30" x2="21.5" y2="30" strokeWidth="1.5" />
      <line x1="40.5" y1="30" x2="42.5" y2="30" strokeWidth="1.5" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <circle cx="10" cy="10" r="4.5" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="11" width="3.5" height="7" rx="0.8" />
      <rect x="8.25" y="6.5" width="3.5" height="11.5" rx="0.8" />
      <rect x="14.5" y="2" width="3.5" height="16" rx="0.8" />
    </svg>
  );
}

function LeafHeartIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 16.5C10 16.5 3 12.5 3 7.5A4 4 0 0 1 10 5a4 4 0 0 1 7 2.5c0 5-7 9-7 9z" />
    </svg>
  );
}

function CheckShieldIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2L3.5 4.5V10c0 3.5 2.5 6.5 6.5 8 4-1.5 6.5-4.5 6.5-8V4.5L10 2z" />
      <polyline points="7,10 9,12.5 13,8" strokeWidth="1.8" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.5 2L5 11h6l-2.5 7L17 9h-6.5L11.5 2z" fill="currentColor" fillOpacity="0.15" />
      <path d="M11.5 2L5 11h6l-2.5 7L17 9h-6.5L11.5 2z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="2" x2="6" y2="7" />
      <path d="M4 2v3a2 2 0 0 0 4 0V2" />
      <line x1="6" y1="9" x2="6" y2="18" />
      <line x1="14" y1="2" x2="14" y2="18" />
      <path d="M14 2c2 0 3 1.5 3 3.5S16 8 14 8.5" />
    </svg>
  );
}

function ChoiceHandIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V10" />
      <path d="M10 9.5V8a1.5 1.5 0 0 1 3 0v2" />
      <path d="M13 10.5V9a1.5 1.5 0 0 1 3 0v3c0 3.5-2 5.5-5 5.5H9c-2.5 0-4-1.5-4-4v-2.5" />
      <circle cx="4.5" cy="4.5" r="2.2" />
      <polyline points="3.4,4.5 4.3,5.5 5.8,3.3" strokeWidth="1.6" />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <path d="M7 12.5c0.8 1.5 2 2 3 2s2.2-.5 3-2" />
      <circle cx="7.5" cy="8.5" r="0.8" fill="currentColor" />
      <circle cx="12.5" cy="8.5" r="0.8" fill="currentColor" />
    </svg>
  );
}
