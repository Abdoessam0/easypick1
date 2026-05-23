import type { ReactNode } from "react";

export function PageTitle({
  title,
  accent,
  subtitle,
  align = "center",
}: {
  title: string;
  accent?: string;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
        {title} {accent && <span className="text-gradient-primary">{accent}</span>}
      </h1>
      {subtitle && (
        <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
