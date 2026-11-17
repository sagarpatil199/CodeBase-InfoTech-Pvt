"use client";

import { motion, type MotionValue } from "motion/react";
import type { ReactNode } from "react";

/**
 * A two-coach Mumbai local train in side view, facing right.
 * viewBox 1400 × 250; wheels touch the bottom edge, the pantograph the top.
 * Doorways are open, as on Mumbai locals; riders are passed in as children.
 */
const NAVY = "#142B55";
const CREAM = "#FFF6E0";
const YELLOW = "#FFD35E";
const MAROON = "#A23B5B";

export const TRAIN_RATIO = 250 / 1400;

/** Doorway interior; the opening the riders stand in. */
export const DOORS = {
  rear: { x: 200, w: 96 },
  front: { x: 860, w: 104 },
  front2: { x: 1150, w: 84 },
} as const;

function Window({ x }: { x: number }) {
  return (
    <g>
      <rect
        x={x}
        y="66"
        width="58"
        height="54"
        rx="9"
        fill="#CBEFFB"
        stroke={NAVY}
        strokeWidth="2.6"
      />
      <path
        d={`M${x + 4} 82h50M${x + 4} 94h50M${x + 4} 106h50`}
        stroke="#8EA2C2"
        strokeWidth="2.4"
      />
      <path
        d={`M${x + 8} 72l12-0`}
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}

function Doorway({ x, w }: { x: number; w: number }) {
  return (
    <g>
      <rect
        x={x}
        y="58"
        width={w}
        height="150"
        rx="6"
        fill="#EDE3C9"
        stroke={NAVY}
        strokeWidth="2.6"
      />
      <rect
        x={x + 6}
        y="64"
        width={w - 12}
        height="56"
        rx="5"
        fill="#D9F2FB"
        opacity=".7"
      />
      <path
        d={`M${x + w / 2} 60v146`}
        stroke="#9AA6BD"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d={`M${x} 200h${w}`} stroke={NAVY} strokeWidth="2.6" />
    </g>
  );
}

function Bogie({
  cx,
  wheelAngle,
}: {
  cx: number;
  wheelAngle?: MotionValue<number>;
}) {
  return (
    <g>
      <rect
        x={cx - 64}
        y="212"
        width="128"
        height="14"
        rx="6"
        fill="#2E3A52"
        stroke={NAVY}
        strokeWidth="2"
      />
      {[cx - 36, cx + 36].map((wx) => (
        <motion.g
          key={wx}
          style={{
            rotate: wheelAngle,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        >
          <circle
            cx={wx}
            cy="233"
            r="16"
            fill="#56638A"
            stroke={NAVY}
            strokeWidth="2.6"
          />
          <circle
            cx={wx}
            cy="233"
            r="5"
            fill="#C9D2E3"
            stroke={NAVY}
            strokeWidth="2"
          />
          <path
            d={`M${wx - 13} 233h26M${wx} 220v26`}
            stroke="#C9D2E3"
            strokeWidth="2.4"
          />
        </motion.g>
      ))}
    </g>
  );
}

function CoachBands({ x0, x1 }: { x0: number; x1: number }) {
  return (
    <>
      <rect
        x={x0 + 1.3}
        y="150"
        width={x1 - x0 - 2.6}
        height="56"
        fill={YELLOW}
      />
      <rect
        x={x0 + 1.3}
        y="140"
        width={x1 - x0 - 2.6}
        height="10"
        fill={MAROON}
      />
      <rect
        x={x0 + 1.3}
        y="50"
        width={x1 - x0 - 2.6}
        height="7"
        fill={MAROON}
        opacity=".85"
      />
    </>
  );
}

export function Train({
  wheelAngle,
  riders,
  className,
}: {
  wheelAngle?: MotionValue<number>;
  riders?: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1400 250"
      className={className}
      role="img"
      aria-label="A Mumbai local train with CodeBase Infotech students at the open doorways"
    >
      {/* Overhead pantograph on the front coach */}
      <g stroke={NAVY} strokeWidth="3" fill="none" strokeLinejoin="round">
        <path d="M762 36 800 6l38 30" />
        <path d="M776 36 800 14l24 22" strokeWidth="2" />
        <path d="M780 4h40" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Coupler */}
      <rect
        x="634"
        y="186"
        width="36"
        height="12"
        rx="4"
        fill="#2E3A52"
        stroke={NAVY}
        strokeWidth="2"
      />

      {/* ---------- Rear coach ---------- */}
      <rect
        x="12"
        y="34"
        width="616"
        height="18"
        rx="9"
        fill="#D7DFEA"
        stroke={NAVY}
        strokeWidth="2.6"
      />
      <rect x="4" y="44" width="632" height="166" rx="12" fill={CREAM} />
      <CoachBands x0={4} x1={636} />
      <rect
        x="4"
        y="44"
        width="632"
        height="166"
        rx="12"
        fill="none"
        stroke={NAVY}
        strokeWidth="2.8"
      />
      {[34, 112].map((x) => (
        <Window key={x} x={x} />
      ))}
      <Doorway x={DOORS.rear.x} w={DOORS.rear.w} />
      {[330, 408, 486, 564].map((x) => (
        <Window key={x} x={x} />
      ))}
      <text
        x="340"
        y="186"
        fontFamily="var(--font-display)"
        fontSize="17"
        fontWeight="700"
        fill={NAVY}
      >
        LADIES · GENERAL
      </text>
      <Bogie cx={110} wheelAngle={wheelAngle} />
      <Bogie cx={530} wheelAngle={wheelAngle} />

      {/* ---------- Front coach with driver's cab ---------- */}
      <path
        d="M676 34h610c10 0 18 8 20 18H676c-6 0-6-18 0-18z"
        fill="#D7DFEA"
        stroke={NAVY}
        strokeWidth="2.6"
      />
      <path d="M668 44h652c46 0 72 36 74 86v80H668z" fill={CREAM} />
      <g clipPath="url(#front-coach)">
        <CoachBands x0={668} x1={1400} />
      </g>
      <clipPath id="front-coach">
        <path d="M668 44h652c46 0 72 36 74 86v80H668z" />
      </clipPath>
      <path
        d="M668 44h652c46 0 72 36 74 86v80H668z"
        fill="none"
        stroke={NAVY}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {[700, 778].map((x) => (
        <Window key={x} x={x} />
      ))}
      <Doorway x={DOORS.front.x} w={DOORS.front.w} />
      {[990, 1068].map((x) => (
        <Window key={x} x={x} />
      ))}
      <Doorway x={DOORS.front2.x} w={DOORS.front2.w} />
      {/* Cab windscreen, destination board, lamps */}
      <path
        d="M1256 66h56c30 0 52 22 58 54h-114z"
        fill="#9FDDF5"
        stroke={NAVY}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M1268 76l20 0"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="1252"
        y="132"
        width="96"
        height="10"
        rx="5"
        fill={NAVY}
        opacity=".15"
      />
      <circle
        cx="1378"
        cy="178"
        r="8"
        fill="#FFF3A3"
        stroke={NAVY}
        strokeWidth="2.4"
      />

      {/* Coach branding */}
      <g transform="translate(704 160)">
        <rect width="30" height="30" rx="8" fill={NAVY} />
        <path
          d="M11 9 6 15l5 6M19 9l5 6-5 6"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="38"
          y="22"
          fontFamily="var(--font-display)"
          fontSize="18"
          fontWeight="800"
          fill={NAVY}
        >
          CodeBase
        </text>
      </g>
      <rect
        x="968"
        y="70"
        width="10"
        height="10"
        rx="2"
        fill="#B9E7A6"
        stroke={NAVY}
        strokeWidth="1.6"
      />

      {/* Skirt */}
      <rect x="20" y="204" width="604" height="9" rx="3" fill="#3E4A61" />
      <rect x="684" y="204" width="680" height="9" rx="3" fill="#3E4A61" />

      <Bogie cx={790} wheelAngle={wheelAngle} />
      <Bogie cx={1250} wheelAngle={wheelAngle} />

      {riders}
    </svg>
  );
}
