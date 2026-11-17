/**
 * The student character used across the site's illustrations.
 * Drawn in a 100 × 170 box with the feet at the bottom. Place it inside an
 * <svg> with a transform, for example `transform="translate(200 40) scale(.8)"`.
 */
const NAVY = "#142B55";
const SKIN = "#FFE0C4";

export type StudentProps = {
  shirt?: string;
  pants?: string;
  hair?: "spiky" | "ponytail" | "neat";
  pose?: "stand" | "wave" | "cheer" | "laptop" | "walk" | "point";
  beard?: boolean;
  lanyard?: boolean;
  glasses?: boolean;
  backpack?: boolean;
  gradCap?: boolean;
  facing?: "right" | "left";
  className?: string;
  transform?: string;
};

function Arm({ d, shirt }: { d: string; shirt: string }) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={NAVY}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d={d}
        fill="none"
        stroke={shirt}
        strokeWidth="8"
        strokeLinecap="round"
      />
    </>
  );
}

function Hand({ x, y }: { x: number; y: number }) {
  return (
    <circle cx={x} cy={y} r="5.5" fill={SKIN} stroke={NAVY} strokeWidth="2.2" />
  );
}

function Hair({ kind }: { kind: NonNullable<StudentProps["hair"]> }) {
  if (kind === "neat")
    return (
      <path
        d="M25 44c-3-19 10-31 26-31s29 11 25 31c-4-9-12-14-24-14-13 0-21 5-27 14z"
        fill="#1F1A24"
        stroke={NAVY}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    );
  if (kind === "ponytail")
    return (
      <>
        <path
          d="M74 30c12 2 16 14 10 26-2-8-6-12-12-14z"
          fill="#1F1A24"
          stroke={NAVY}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M25 46c-4-21 10-33 26-33s29 12 25 33c-6-12-14-16-26-15-10 0-19 5-25 15z"
          fill="#1F1A24"
          stroke={NAVY}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle
          cx="74"
          cy="31"
          r="4"
          fill="#F59A65"
          stroke={NAVY}
          strokeWidth="2"
        />
      </>
    );
  return (
    <path
      d="M23 46c-6-10-2-20 4-24-2-6 4-12 10-10 2-7 12-9 17-4 5-5 15-3 17 4 7 0 11 7 9 13 5 4 6 13 0 21l-4-9-5 6-3-10-7 6-2-9-7 6-3-8-7 7-2-8-6 9z"
      fill="#1F1A24"
      stroke={NAVY}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  );
}

export function Student({
  shirt = "#4CAF50",
  pants = "#5B7FC4",
  hair = "spiky",
  pose = "stand",
  glasses = false,
  backpack = true,
  gradCap = false,
  beard = false,
  lanyard = false,
  facing = "right",
  className,
  transform,
}: StudentProps) {
  const flip = facing === "left" ? "translate(100 0) scale(-1 1)" : undefined;

  return (
    <g transform={transform} className={className}>
      <g transform={flip}>
        {/* Legs */}
        <g className="leg leg-a">
          <rect
            x="35"
            y="112"
            width="13"
            height="40"
            rx="5"
            fill={pants}
            stroke={NAVY}
            strokeWidth="2.4"
          />
          <path
            d="M33 152h18c3 0 5 2 5 5v3H31v-4c0-2 1-4 2-4z"
            fill="#fff"
            stroke={NAVY}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </g>
        <g className="leg leg-b">
          <rect
            x="52"
            y="112"
            width="13"
            height="40"
            rx="5"
            fill={pants}
            stroke={NAVY}
            strokeWidth="2.4"
          />
          <path
            d="M50 152h18c3 0 5 2 5 5v3H48v-4c0-2 1-4 2-4z"
            fill="#fff"
            stroke={NAVY}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </g>
        <g className="walker-body">
          {/* Backpack */}
          {backpack && (
            <g>
              <rect
                x="14"
                y="70"
                width="22"
                height="42"
                rx="8"
                fill="#3D63C9"
                stroke={NAVY}
                strokeWidth="2.4"
              />
              <path
                d="M20 88l-3 4 3 4M30 88l3 4-3 4"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}

          {/* Back arm (drawn behind the body) */}
          {pose === "walk" && <Arm d="M36 74 L30 100" shirt={shirt} />}

          {/* Body */}
          <path
            d="M30 116V74c0-6 5-10 11-10h18c6 0 11 4 11 10v42z"
            fill={shirt}
            stroke={NAVY}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Hoodie strings */}
          <path
            d="M46 66v10M54 66v10"
            stroke={NAVY}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {backpack && (
            <path
              d="M36 66c2 14 2 30 0 46"
              fill="none"
              stroke="#2A4AA0"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}

          {/* Head */}
          <circle
            cx="50"
            cy="42"
            r="25"
            fill={SKIN}
            stroke={NAVY}
            strokeWidth="2.4"
          />
          <ellipse cx="34" cy="53" rx="5" ry="3" fill="#F7A8A8" opacity=".75" />
          <ellipse cx="66" cy="53" rx="5" ry="3" fill="#F7A8A8" opacity=".75" />
          <circle cx="41" cy="46" r="3" fill={NAVY} />
          <circle cx="59" cy="46" r="3" fill={NAVY} />
          <circle cx="42" cy="45" r="1" fill="#fff" />
          <circle cx="60" cy="45" r="1" fill="#fff" />
          <path
            d="M44 55q6 6 12 0"
            fill="#E85D5D"
            stroke={NAVY}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {beard && (
            <path
              d="M27 50c2 14 11 22 23 22s21-8 23-22c-4 6-8 8-12 8-4-3-18-3-22 0-4 0-8-2-12-8z"
              fill="#3A3140"
              stroke={NAVY}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          )}
          {beard && (
            <path
              d="M44 61q6 4 12 0"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
          {glasses && (
            <g fill="none" stroke={NAVY} strokeWidth="2.2">
              <circle cx="41" cy="46" r="7.5" />
              <circle cx="59" cy="46" r="7.5" />
              <path d="M48.5 46h3" />
            </g>
          )}
          <Hair kind={hair} />
          {gradCap && (
            <g stroke={NAVY} strokeWidth="2.2" strokeLinejoin="round">
              <path d="M28 22 50 12l22 10-22 10z" fill="#222B45" />
              <path d="M38 27v8c8 4 16 4 24 0v-8" fill="#222B45" />
              <path d="M72 22v14" fill="none" />
              <circle cx="72" cy="38" r="2.5" fill="#FFC94D" />
            </g>
          )}

          {lanyard && (
            <g>
              <path
                d="M40 66l10 22 10-22"
                fill="none"
                stroke="#2A4AA0"
                strokeWidth="2.4"
              />
              <rect
                x="44"
                y="88"
                width="12"
                height="15"
                rx="2"
                fill="#fff"
                stroke={NAVY}
                strokeWidth="1.8"
              />
            </g>
          )}

          {/* Front arms by pose */}
          {pose === "stand" && (
            <>
              <Arm d="M34 74 L30 104" shirt={shirt} />
              <Arm d="M66 74 L70 104" shirt={shirt} />
              <Hand x={30} y={107} />
              <Hand x={70} y={107} />
            </>
          )}
          {pose === "walk" && (
            <>
              <Arm d="M64 74 L74 98" shirt={shirt} />
              <Hand x={75} y={101} />
            </>
          )}
          {pose === "point" && (
            <>
              <Arm d="M34 74 L30 104" shirt={shirt} />
              <Arm d="M66 74 L94 96" shirt={shirt} />
              <Hand x={30} y={107} />
              <Hand x={97} y={98} />
              <path
                d="M100 98l7 1"
                stroke={NAVY}
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M100 98l7 1"
                stroke="#FFE0C4"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </>
          )}
          {pose === "wave" && (
            <>
              <Arm d="M34 74 L30 104" shirt={shirt} />
              <Arm d="M66 74 L84 52" shirt={shirt} />
              <Hand x={30} y={107} />
              <Hand x={86} y={48} />
            </>
          )}
          {pose === "cheer" && (
            <>
              <Arm d="M34 74 L30 104" shirt={shirt} />
              <Arm d="M66 74 L80 40" shirt={shirt} />
              <Hand x={30} y={107} />
              <circle
                cx="81"
                cy="34"
                r="7"
                fill={SKIN}
                stroke={NAVY}
                strokeWidth="2.2"
              />
            </>
          )}
          {pose === "laptop" && (
            <>
              <Arm d="M34 74 L44 98" shirt={shirt} />
              <Arm d="M66 74 L64 98" shirt={shirt} />
              <path
                d="M38 82h40l-4 26H34z"
                fill="#7C8BA6"
                stroke={NAVY}
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path
                d="M52 90l-4 4 4 4M62 90l4 4-4 4"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Hand x={44} y={102} />
              <Hand x={64} y={102} />
            </>
          )}
        </g>
      </g>
    </g>
  );
}
