import type { ReactNode } from "react";

/**
 * Ribbon eyebrow, heading and lede. `level` lets a section be the page's
 * <h1> on its own route and an <h2> on the homepage.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  level = 2,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  level?: 1 | 2;
  align?: "left" | "center";
  id?: string;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="ribbon">{eyebrow}</p>}
      <Heading
        id={id}
        className={`${eyebrow ? "mt-5" : ""} ${
          level === 1
            ? "text-[2.25rem] font-extrabold sm:text-5xl lg:text-[3.4rem]"
            : "h2"
        }`}
      >
        {title}
      </Heading>
      {lede && (
        <p className={`lede mt-5 ${centered ? "mx-auto" : ""}`}>{lede}</p>
      )}
    </div>
  );
}
