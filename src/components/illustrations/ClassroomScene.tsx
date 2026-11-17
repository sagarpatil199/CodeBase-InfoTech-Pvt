import { Plant } from "./Scenery";
import { Student } from "./Student";

const NAVY = "#142B55";

function Laptop({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      stroke={NAVY}
      strokeWidth="2.4"
      strokeLinejoin="round"
    >
      <path d="M8 0h104l-8 66H16z" fill="#566480" />
      <path
        d="M52 26l-8 8 8 8M68 26l8 8-8 8"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M-6 66h132l-6 10H0z" fill="#8C99B4" />
    </g>
  );
}

function BackLearner({
  x,
  shirt,
  hair,
}: {
  x: number;
  shirt: string;
  hair: "spiky" | "ponytail" | "neat";
}) {
  return (
    <g>
      <Student
        transform={`translate(${x} 214) scale(.55)`}
        shirt={shirt}
        hair={hair}
        pose="laptop"
        backpack={false}
      />
      <rect
        x={x - 20}
        y="292"
        width="96"
        height="12"
        rx="4"
        fill="#E9C99A"
        stroke={NAVY}
        strokeWidth="2"
      />
    </g>
  );
}

/** Mentor guiding a student at a laptop, other learners behind, city window. */
export function ClassroomScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 520"
      className={className}
      role="img"
      aria-label="A mentor guiding a student at a laptop in a bright classroom, with other learners coding in the background"
    >
      <defs>
        <clipPath id="room">
          <rect x="4" y="4" width="792" height="512" rx="32" />
        </clipPath>
      </defs>
      <g clipPath="url(#room)">
        <rect width="800" height="520" fill="#FFF4E2" />

        {/* Window with city view */}
        <rect
          x="430"
          y="36"
          width="340"
          height="230"
          rx="12"
          fill="#CBEFFB"
          stroke={NAVY}
          strokeWidth="3"
        />
        <g fill="#A9D6EC" stroke="#86B8D2" strokeWidth="2">
          <rect x="450" y="150" width="40" height="116" />
          <rect x="500" y="120" width="46" height="146" />
          <rect x="560" y="166" width="38" height="100" />
          <rect x="650" y="110" width="44" height="156" />
          <rect x="706" y="150" width="40" height="116" />
        </g>
        <path d="M600 36v230M430 150h340" stroke={NAVY} strokeWidth="3" />
        <path
          d="M470 60l40 0M690 60l30 0"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Wall code screen */}
        <rect
          x="40"
          y="40"
          width="250"
          height="160"
          rx="14"
          fill={NAVY}
          stroke={NAVY}
          strokeWidth="3"
        />
        <rect x="52" y="52" width="226" height="136" rx="8" fill="#1F3D73" />
        {[
          ["#F59A65", 120],
          ["#FFE69A", 90],
          ["#B8DDAE", 140],
          ["#BDEBFA", 70],
          ["#F9C6D4", 110],
        ].map(([c, w], i) => (
          <rect
            key={i}
            x="66"
            y={66 + i * 22}
            width={w}
            height="9"
            rx="4.5"
            fill={c as string}
          />
        ))}
        <rect
          x="200"
          y="96"
          width="62"
          height="52"
          rx="10"
          fill="#2F5BA8"
          stroke="#BDEBFA"
          strokeWidth="2.5"
        />
        <path
          d="M222 112l-8 10 8 10M240 112l8 10-8 10"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Shelf, books and a hanging plant */}
        <path
          d="M310 120h90"
          stroke="#9A6B44"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {[
          ["#4FB3E8", 316, 40],
          ["#F59A65", 332, 46],
          ["#FFE69A", 348, 36],
        ].map(([c, x, h]) => (
          <rect
            key={x as number}
            x={x as number}
            y={116 - (h as number)}
            width="14"
            height={h as number}
            rx="2"
            fill={c as string}
            stroke={NAVY}
            strokeWidth="2"
          />
        ))}
        <path d="M380 0v40" stroke={NAVY} strokeWidth="2" />
        <path
          d="M366 40h28l-4 18h-20z"
          fill="#E98B5E"
          stroke={NAVY}
          strokeWidth="2.2"
        />
        <path
          d="M372 58c-6 20-2 40-10 60M388 58c6 18 2 36 10 52"
          fill="none"
          stroke="#5FAF55"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Pendant lamp */}
        <path d="M560 0v24" stroke={NAVY} strokeWidth="2.4" />
        <path
          d="M536 44c0-18 48-18 48 0z"
          fill="#3E4A61"
          stroke={NAVY}
          strokeWidth="2.4"
        />
        <circle
          cx="560"
          cy="48"
          r="7"
          fill="#FFE69A"
          stroke={NAVY}
          strokeWidth="2"
        />

        {/* Learners at the back */}
        <BackLearner x={460} shirt="#FFC94D" hair="ponytail" />
        <BackLearner x={660} shirt="#7FA8E8" hair="neat" />

        {/* Floor */}
        <rect y="330" width="800" height="190" fill="#F3E3C6" />

        {/* Mentor and student */}
        <Student
          transform="translate(214 210) scale(1.4)"
          shirt="#4CAF50"
          pose="laptop"
        />
        <Student
          transform="translate(318 132) scale(1.62)"
          shirt="#9CC3F2"
          pants="#2F4E8C"
          hair="neat"
          glasses
          beard
          lanyard
          pose="point"
          backpack={false}
          facing="left"
        />

        {/* Front desk */}
        <path
          d="M30 392h740l-10 34H40z"
          fill="#E6C08E"
          stroke={NAVY}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M44 426h712v100H44z"
          fill="#D9AE78"
          stroke={NAVY}
          strokeWidth="3"
        />
        <path
          d="M300 440v80M500 440v80"
          stroke={NAVY}
          strokeWidth="2"
          opacity=".35"
        />
        <Laptop x={520} y={316} s={1} />

        {/* Books, mug, plant */}
        <rect
          x="70"
          y="360"
          width="120"
          height="16"
          rx="3"
          fill="#F59A65"
          stroke={NAVY}
          strokeWidth="2.4"
        />
        <rect
          x="78"
          y="344"
          width="108"
          height="16"
          rx="3"
          fill="#4FB3E8"
          stroke={NAVY}
          strokeWidth="2.4"
        />
        <rect
          x="64"
          y="376"
          width="128"
          height="16"
          rx="3"
          fill="#FFE69A"
          stroke={NAVY}
          strokeWidth="2.4"
        />
        <path
          d="M640 352h38v40h-38z"
          fill="#fff"
          stroke={NAVY}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M678 360c12 0 12 22 0 22"
          fill="none"
          stroke={NAVY}
          strokeWidth="2.4"
        />
        <path
          d="M654 366l-5 6 5 6M664 366l5 6-5 6"
          fill="none"
          stroke={NAVY}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Plant transform="translate(700 392) scale(.9)" />
      </g>
      <rect
        x="4"
        y="4"
        width="792"
        height="512"
        rx="32"
        fill="none"
        stroke={NAVY}
        strokeWidth="3"
      />
    </svg>
  );
}
