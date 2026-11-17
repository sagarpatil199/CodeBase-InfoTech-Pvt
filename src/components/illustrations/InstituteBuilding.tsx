import { Bush, Cloud, Plant, Tree } from "./Scenery";
import { Student } from "./Student";

const NAVY = "#142B55";

/** The institute building with a classroom visible through the glass front. */
export function InstituteBuilding({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 520"
      className={className}
      role="img"
      aria-label="Illustration of the CodeBase Infotech institute building, with learners in the classroom and a student arriving"
    >
      <Cloud transform="translate(380 30) scale(1.1)" />
      <Cloud transform="translate(30 70) scale(.8)" />
      <Tree transform="translate(4 470) scale(.95)" />

      {/* Building */}
      <path
        d="M90 470V200h420v270z"
        fill="#FFF4E2"
        stroke={NAVY}
        strokeWidth="3"
      />
      <path
        d="M70 206l230-96 230 96z"
        fill="#F7D9B4"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="140"
        y="132"
        width="320"
        height="76"
        rx="12"
        fill="#fff"
        stroke={NAVY}
        strokeWidth="3"
      />
      <rect x="156" y="146" width="48" height="48" rx="10" fill={NAVY} />
      <path
        d="M174 160l-8 10 8 10M186 160l8 10-8 10"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="216"
        y="168"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="22"
        fill={NAVY}
      >
        CodeBase Infotech
      </text>
      <rect x="216" y="176" width="196" height="20" rx="10" fill="#FFE69A" />
      <text
        x="314"
        y="191"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="700"
        fontSize="13"
        fill={NAVY}
      >
        IT Training &amp; Education
      </text>

      {/* Glass classroom front */}
      <rect
        x="150"
        y="236"
        width="300"
        height="200"
        rx="8"
        fill="#D9F2FB"
        stroke={NAVY}
        strokeWidth="3"
      />
      <path d="M150 300h300" stroke="#9FCFE4" strokeWidth="2" />
      <rect
        x="250"
        y="252"
        width="100"
        height="62"
        rx="8"
        fill="#1F3D73"
        stroke={NAVY}
        strokeWidth="2.4"
      />
      <path
        d="M290 270l-9 10 9 10M310 270l9 10-9 10"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Student
        transform="translate(176 300) scale(.62)"
        shirt="#F48FB1"
        hair="ponytail"
        pose="laptop"
        backpack={false}
      />
      <Student
        transform="translate(360 300) scale(.62)"
        shirt="#7FA8E8"
        hair="neat"
        pose="laptop"
        backpack={false}
        glasses
      />
      <rect
        x="166"
        y="378"
        width="268"
        height="12"
        rx="4"
        fill="#E6C08E"
        stroke={NAVY}
        strokeWidth="2.2"
      />
      <path d="M300 236v200" stroke={NAVY} strokeWidth="3" />
      <rect
        x="150"
        y="436"
        width="300"
        height="34"
        fill="#E9E4D6"
        stroke={NAVY}
        strokeWidth="3"
      />

      {/* Board on the step */}
      <g transform="translate(408 360)">
        <path
          d="M8 110 24 0h76l16 110"
          fill="none"
          stroke="#9A6B44"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <rect
          x="16"
          y="6"
          width="92"
          height="76"
          rx="8"
          fill="#2F3B35"
          stroke="#9A6B44"
          strokeWidth="6"
        />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path
              d={`M28 ${24 + i * 20}l4 4 8-8`}
              fill="none"
              stroke="#FFE69A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="46"
              y={20 + i * 20}
              width={[46, 38, 50][i]}
              height="6"
              rx="3"
              fill="#fff"
              opacity=".85"
            />
          </g>
        ))}
      </g>

      {/* Ground, plants, student */}
      <path d="M0 520v-50h560v50z" fill="#C2E4B3" />
      <path d="M0 470h560" stroke={NAVY} strokeWidth="3" />
      <Plant transform="translate(100 470) scale(.9)" />
      <Bush transform="translate(440 520) scale(1)" />
      <Student
        transform="translate(30 330) scale(1.05)"
        shirt="#4CAF50"
        facing="right"
        pose="wave"
      />
    </svg>
  );
}
