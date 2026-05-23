import logo from "@/assets/logo.png";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return <img src={logo} alt="Easypick" className={className} />;
}
