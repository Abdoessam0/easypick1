import { Brain, Zap, Utensils } from "lucide-react";
import { useEasypick } from "@/lib/easypick-context";

export function ModeBadge() {
  const { mode, mood } = useEasypick();
  if (!mode) return null;

  if (mode === "smart") {
    return (
      <div className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-primary">
        <Brain className="h-4 w-4" />
        SMART PICK
      </div>
    );
  }

  const moodLabel = mood
    ? mood === "hungry"
      ? "HUNGRY MODE"
      : mood === "light"
        ? "LIGHT MODE"
        : "FAST MODE"
    : "QUICK PICK";
  const Icon = mood === "light" ? Utensils : mood === "fast" ? Zap : Utensils;
  return (
    <div className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-primary">
      <Icon className="h-4 w-4" />
      {moodLabel}
    </div>
  );
}
