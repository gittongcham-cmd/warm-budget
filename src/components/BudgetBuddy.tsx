"use client";

export type BuddyMood = "happy" | "calm" | "worried" | "alert";

const moodStyles: Record<BuddyMood, { cheek: string }> = {
  happy: { cheek: "#ffb1a1" },
  calm: { cheek: "#ffc1ad" },
  worried: { cheek: "#ffb3bd" },
  alert: { cheek: "#f67280" }
};

export function BudgetBuddy({
  mood = "happy",
  message,
  compact = false,
  className = ""
}: {
  mood?: BuddyMood;
  message: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <CatFace mood={mood} size={compact ? 48 : 68} />
      <div className="relative flex-1 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-relaxed text-cocoa shadow-warm ring-1 ring-white/70">
        <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white" />
        <p className="relative">
          <span className="text-clay">모아냥</span>
          <span className="text-cocoa/45"> · </span>
          {message}
        </p>
      </div>
    </div>
  );
}

function CatFace({ mood, size }: { mood: BuddyMood; size: number }) {
  const style = moodStyles[mood];
  const worriedBrows = mood === "worried" || mood === "alert";
  const mouth =
    mood === "happy"
      ? "M43 57 Q48 64 53 57"
      : mood === "calm"
        ? "M43 58 Q48 61 53 58"
        : mood === "worried"
          ? "M43 61 Q48 56 53 61"
          : "M44 60 Q48 63 52 60";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label="모아냥 예산 코치"
      className="shrink-0 drop-shadow-[0_8px_14px_rgba(255,143,112,0.22)]"
    >
      <path d="M20 72 C7 65 6 45 19 40 C30 36 35 48 28 57 C23 63 24 68 34 71" fill="none" stroke="#b36a38" strokeWidth="7" strokeLinecap="round" />
      <path d="M20 72 C7 65 6 45 19 40" fill="none" stroke="#5a4037" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
      <ellipse cx="50" cy="70" rx="24" ry="17" fill="#f7bb73" stroke="#5a4037" strokeWidth="2.8" />
      <path d="M34 66 C38 76 59 77 67 66 C63 81 40 84 31 70 Z" fill="#fff7e7" opacity="0.96" />
      <ellipse cx="32" cy="75" rx="10" ry="7" fill="#fff7e7" stroke="#5a4037" strokeWidth="2.4" />
      <ellipse cx="66" cy="75" rx="10" ry="7" fill="#fff7e7" stroke="#5a4037" strokeWidth="2.4" />

      <g transform="rotate(-12 28 54)">
        <ellipse cx="24" cy="54" rx="10" ry="16" fill="#fff7e7" stroke="#5a4037" strokeWidth="2.6" />
        <ellipse cx="21" cy="49" rx="2.1" ry="2.8" fill="#f6a6a1" />
        <ellipse cx="26" cy="47" rx="2.1" ry="2.8" fill="#f6a6a1" />
        <ellipse cx="30" cy="51" rx="2.1" ry="2.8" fill="#f6a6a1" />
        <path d="M21 57 Q25 52 30 58 Q25 62 21 57Z" fill="#f6a6a1" />
      </g>

      <path d="M20 35 L25 10 L42 27 Z" fill="#f7bb73" stroke="#5a4037" strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M76 35 L71 10 L54 27 Z" fill="#f7bb73" stroke="#5a4037" strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M27 17 L28 31 L38 27 Z" fill="#ffb8ac" opacity="0.92" />
      <path d="M69 17 L68 31 L58 27 Z" fill="#ffb8ac" opacity="0.92" />
      <circle cx="48" cy="42" r="29" fill="#f7bb73" stroke="#5a4037" strokeWidth="2.8" />
      <path d="M32 52 C36 60 60 60 64 52 C61 69 35 70 32 52Z" fill="#fff7e7" opacity="0.98" />
      <path d="M37 18 C40 27 43 30 48 31 C53 30 56 26 59 18" fill="none" stroke="#8e552c" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 14 V29" stroke="#8e552c" strokeWidth="4" strokeLinecap="round" />
      <path d="M29 31 C34 31 38 34 40 38" fill="none" stroke="#8e552c" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      <path d="M67 31 C62 31 58 34 56 38" fill="none" stroke="#8e552c" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      <circle cx="35" cy="51" r="5.2" fill={style.cheek} opacity="0.7" />
      <circle cx="61" cy="51" r="5.2" fill={style.cheek} opacity="0.7" />
      {worriedBrows ? (
        <>
          <path d="M30 34 L40 37" stroke="#5a4037" strokeWidth="3" strokeLinecap="round" />
          <path d="M66 34 L56 37" stroke="#5a4037" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : null}
      <circle cx="37" cy="41" r="7.4" fill="#26313f" stroke="#5a4037" strokeWidth="2" />
      <circle cx="59" cy="41" r="7.4" fill="#26313f" stroke="#5a4037" strokeWidth="2" />
      <circle cx="34.5" cy="38" r="2.3" fill="#ffffff" opacity="0.95" />
      <circle cx="56.5" cy="38" r="2.3" fill="#ffffff" opacity="0.95" />
      <circle cx="39.5" cy="44" r="1.2" fill="#ffffff" opacity="0.55" />
      <circle cx="61.5" cy="44" r="1.2" fill="#ffffff" opacity="0.55" />
      <path d="M46 49 Q48 51 50 49" stroke="#d57677" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d={mouth} stroke="#5a4037" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M24 48 H11" stroke="#5a4037" strokeWidth="1.8" strokeLinecap="round" opacity="0.38" />
      <path d="M25 54 L12 59" stroke="#5a4037" strokeWidth="1.8" strokeLinecap="round" opacity="0.38" />
      <path d="M72 48 H85" stroke="#5a4037" strokeWidth="1.8" strokeLinecap="round" opacity="0.38" />
      <path d="M71 54 L84 59" stroke="#5a4037" strokeWidth="1.8" strokeLinecap="round" opacity="0.38" />
    </svg>
  );
}
