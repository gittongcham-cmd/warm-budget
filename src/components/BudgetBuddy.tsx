"use client";

export type BuddyMood = "happy" | "calm" | "worried" | "alert";

const moodStyles: Record<BuddyMood, { cheek: string; mouth: string; eye: string }> = {
  happy: { cheek: "#ffb1a1", mouth: "M32 45 Q40 53 48 45", eye: "M29 33 Q31 31 33 33" },
  calm: { cheek: "#ffc1ad", mouth: "M33 46 Q40 50 47 46", eye: "M29 33 Q31 34 33 33" },
  worried: { cheek: "#ffb3bd", mouth: "M34 49 Q40 45 46 49", eye: "M29 34 Q31 32 33 34" },
  alert: { cheek: "#f67280", mouth: "M36 48 Q40 51 44 48", eye: "M29 31 L33 35" }
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

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      role="img"
      aria-label="모아냥 예산 코치"
      className="shrink-0 drop-shadow-[0_8px_14px_rgba(255,143,112,0.22)]"
    >
      <path d="M18 30 L22 11 L35 23 Z" fill="#fff4dc" stroke="#5a4037" strokeWidth="3" strokeLinejoin="round" />
      <path d="M62 30 L58 11 L45 23 Z" fill="#fff4dc" stroke="#5a4037" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 19 L25 28 L32 24 Z" fill="#ffcab8" opacity="0.9" />
      <path d="M56 19 L55 28 L48 24 Z" fill="#ffcab8" opacity="0.9" />
      <circle cx="40" cy="42" r="25" fill="#fff4dc" stroke="#5a4037" strokeWidth="3" />
      <circle cx="28" cy="43" r="5" fill={style.cheek} opacity="0.7" />
      <circle cx="52" cy="43" r="5" fill={style.cheek} opacity="0.7" />
      {worriedBrows ? (
        <>
          <path d="M25 27 L34 30" stroke="#5a4037" strokeWidth="3" strokeLinecap="round" />
          <path d="M55 27 L46 30" stroke="#5a4037" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : null}
      <path d={style.eye} stroke="#5a4037" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d={style.eye.replaceAll("29", "47").replaceAll("31", "49").replaceAll("33", "51")} stroke="#5a4037" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M39 39 Q40 41 41 39" stroke="#5a4037" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d={style.mouth} stroke="#5a4037" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M15 42 H5" stroke="#5a4037" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M16 48 L6 52" stroke="#5a4037" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M65 42 H75" stroke="#5a4037" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M64 48 L74 52" stroke="#5a4037" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}
