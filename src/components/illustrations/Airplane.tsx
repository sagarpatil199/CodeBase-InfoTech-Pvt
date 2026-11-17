import { Student } from "./Student";

const NAVY = "#142B55";

/**
 * Yellow propeller plane flown by a student, facing right.
 * Drawn around its own centre in a 300 × 170 box (origin at top-left).
 */
export function Airplane({ transform }: { transform?: string }) {
  return (
    <g transform={transform}>
      {/* Back wing */}
      <path
        d="M128 92 98 52h28l36 40z"
        fill="#E8B43A"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Pilot, mostly hidden by the fuselage */}
      <Student
        transform="translate(104 4) scale(.62)"
        shirt="#4CAF50"
        pose="wave"
        backpack={false}
      />
      {/* Goggles and scarf */}
      <g stroke={NAVY} strokeWidth="2.2">
        <path d="M118 18q18-10 36 0" fill="none" strokeWidth="3" />
        <circle cx="128" cy="19" r="6" fill="#F59A65" />
        <circle cx="144" cy="19" r="6" fill="#F59A65" />
      </g>
      <path
        d="M118 48c-14 2-26-2-34 4 8 2 18 4 30 2z"
        fill="#F25F5C"
        stroke={NAVY}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Tail */}
      <path
        d="M30 70 14 26h26l28 40z"
        fill="#FFC94D"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M22 86h40l6 12H16z"
        fill="#E8B43A"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Fuselage */}
      <path
        d="M24 78c0-14 30-22 70-24l120-6c34 0 52 16 52 34s-18 34-52 34H90c-40 0-66-16-66-38z"
        fill="#FFD447"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M40 92c40 8 120 10 200 2"
        fill="none"
        stroke="#E8A93A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Cockpit rim */}
      <path
        d="M108 56c10-6 40-8 58-4"
        fill="none"
        stroke={NAVY}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Branding */}
      <text
        x="100"
        y="88"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="19"
        fill={NAVY}
      >
        CodeBase
      </text>
      <rect x="212" y="70" width="28" height="24" rx="6" fill={NAVY} />
      <path
        d="M223 76l-5 6 5 6M229 76l5 6-5 6"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Front wing */}
      <path
        d="M120 104h70l-20 44h-30z"
        fill="#FFC94D"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Nose and propeller */}
      <path
        d="M262 62c14 4 22 12 22 22s-8 18-22 22c4-14 4-30 0-44z"
        fill="#F25F5C"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse
        cx="288"
        cy="84"
        rx="6"
        ry="38"
        fill="#C9D2E3"
        opacity=".7"
        stroke={NAVY}
        strokeWidth="2"
      />
      <circle cx="286" cy="84" r="6" fill={NAVY} />
    </g>
  );
}
