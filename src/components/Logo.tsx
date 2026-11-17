import { company } from "@/data/company";
import { HomeLink } from "./HomeLink";

/** The </> mark on its own, for use inside illustrations and the logo. */
export function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#142B55" />
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="8.5"
        fill="none"
        stroke="#fff"
        strokeOpacity=".18"
      />
      <path
        d="M14.5 13 8 20l6.5 7M25.5 13 32 20l-6.5 7M22.2 10.5l-4.4 19"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Brand logo: mark plus two-line wordmark. `tone="light"` for the navy footer. */
export function Logo({
  tone = "dark",
  onNavigate,
}: {
  tone?: "dark" | "light";
  onNavigate?: () => void;
}) {
  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <HomeLink
      className="inline-flex items-center gap-2.5 rounded-xl"
      aria-label={`${company.brandName} home`}
      onNavigate={onNavigate}
    >
      <LogoMark
        className={`size-10 shrink-0 ${tone === "light" ? "rounded-[10px] ring-2 ring-white/25" : ""}`}
      />
      <span
        className={`font-display text-[1.1rem] leading-[1.05] font-bold tracking-tight ${text}`}
      >
        CodeBase
        <br />
        Infotech
      </span>
    </HomeLink>
  );
}
