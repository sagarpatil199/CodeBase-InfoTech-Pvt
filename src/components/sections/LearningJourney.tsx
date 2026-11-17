"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import { Bush, Cloud, Tree } from "@/components/illustrations/Scenery";
import { Student } from "@/components/illustrations/Student";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StageIcon, stageTints } from "@/components/StageIcon";
import { TechLogo } from "@/components/TechIcon";
import { featuredCourse } from "@/data/courses";
import { learningStages } from "@/data/technologies";
import { ProgrammeCard } from "./ProgrammeCard";

const NAVY = "#142B55";

/* ---------- The road: a smooth curve through fixed knots ---------- */
type Pt = [number, number];
const KNOTS: Pt[] = [
  [-40, 395],
  [150, 350],
  [290, 372],
  [410, 300],
  [520, 250],
  [650, 268],
  [780, 282],
  [880, 205],
  [975, 150],
  [1090, 150],
  [1240, 88],
];
/** Indexes of KNOTS where the five milestones stand. */
const PIN_KNOTS = [1, 3, 5, 7, 9];

/** Catmull-Rom spline through the knots, as cubic Bézier segments. */
const ROAD = KNOTS.reduce((d, p, i, a) => {
  if (i === 0) return `M${p[0]} ${p[1]}`;
  const p0 = a[i - 2] ?? a[i - 1];
  const p1 = a[i - 1];
  const p2 = p;
  const p3 = a[i + 1] ?? p;
  const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
  const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
  return `${d} C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
}, "");

/** Fraction of the road's length at each knot (chord approximation). */
const KNOT_FRACTION = (() => {
  const lengths = KNOTS.map((p, i) =>
    i === 0 ? 0 : Math.hypot(p[0] - KNOTS[i - 1][0], p[1] - KNOTS[i - 1][1]),
  );
  const total = lengths.reduce((a, b) => a + b, 0);
  let run = 0;
  return lengths.map((l) => (run += l) / total);
})();
const PIN_AT = PIN_KNOTS.map((k) => KNOT_FRACTION[k]);

const shortTitle = (title: string) => title.split(" ");

/** The illustrated road with signposts and the walking student (md and up). */
function RoadScene() {
  const reduce = Boolean(useReducedMotion());
  const wrapRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const walkerRef = useRef<SVGGElement>(null);
  const [reached, setReached] = useState(reduce ? PIN_AT.length : 0);
  const [walking, setWalking] = useState(false);
  const stopTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 85%", "end 45%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (raw) => {
    const road = roadRef.current;
    const walker = walkerRef.current;
    if (!road || !walker || reduce) return;
    // Walk from just after the start to the last milestone.
    const v = 0.04 + raw * (PIN_AT[PIN_AT.length - 1] + 0.02 - 0.04);
    const len = road.getTotalLength();
    const pt = road.getPointAtLength(v * len);
    walker.setAttribute(
      "transform",
      `translate(${pt.x - 32} ${pt.y - 104}) scale(.64)`,
    );
    setReached(PIN_AT.filter((at) => v >= at - 0.015).length);
    // Legs move only while the visitor is scrolling.
    setWalking(raw > 0.001 && raw < 0.999);
    clearTimeout(stopTimer.current);
    stopTimer.current = setTimeout(() => setWalking(false), 220);
  });

  const start = reduce ? KNOTS[9] : KNOTS[0];

  return (
    <div ref={wrapRef} className="relative">
      <svg
        viewBox="0 0 1200 430"
        className="h-auto w-full"
        role="img"
        aria-label="A student walking along a road past five milestones: Frontend Development, Backend Development, Database Management, Cloud Technologies and Data Engineering."
      >
        {/* Hills and scenery */}
        <path
          d="M0 430V250c120-40 260-60 400-30s260 20 400-30 300-50 400-20v260z"
          fill="#D7EFCB"
        />
        <path
          d="M0 430V330c160-50 340-40 520-10s420 10 680-60v170z"
          fill="#C2E4B3"
        />
        <Cloud transform="translate(70 40) scale(1.1)" />
        <Cloud transform="translate(640 20) scale(.9)" />
        <Tree transform="translate(-30 300) scale(.6)" />
        <Tree transform="translate(1110 330) scale(.55)" />
        <Bush transform="translate(560 420) scale(.8)" />
        <Bush transform="translate(250 428) scale(.7)" fill="#9DD48E" />
        <Bush transform="translate(980 420) scale(.75)" />

        {/* Road */}
        <path
          d={ROAD}
          fill="none"
          stroke={NAVY}
          strokeWidth="50"
          strokeLinecap="round"
        />
        <path
          ref={roadRef}
          d={ROAD}
          fill="none"
          stroke="#F3DFB4"
          strokeWidth="44"
          strokeLinecap="round"
        />
        <path
          d={ROAD}
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeDasharray="14 16"
          strokeLinecap="round"
        />

        {/* Finish flag */}
        <g stroke={NAVY} strokeWidth="2.4" strokeLinejoin="round">
          <path
            d="M1196 96V40"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M1170 42h24v28h-24l8-14z" fill="#F59A65" />
        </g>

        {/* The walker */}
        <g
          ref={walkerRef}
          transform={`translate(${start[0] - 32} ${start[1] - 104}) scale(.64)`}
          className={walking ? "is-walking" : undefined}
        >
          <Student pose="walk" />
        </g>

        {/* Milestones (drawn over the walker so their text stays readable) */}
        {PIN_KNOTS.map((k, i) => {
          const [x, y] = KNOTS[k];
          const stage = learningStages[i];
          const on = i < reached;
          const [line1, ...rest] = shortTitle(stage.title);
          return (
            <motion.g
              key={stage.number}
              initial={false}
              animate={{ opacity: on ? 1 : 0.45, y: on ? 0 : 8 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <path
                d={`M${x} ${y - 14}V${y - 64}`}
                stroke="#7A5638"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <rect
                x={x - 100}
                y={y - 130}
                width="206"
                height="70"
                rx="14"
                fill={on ? "#FFFDF5" : "#F1EEE4"}
                stroke={NAVY}
                strokeWidth="2.6"
              />
              <circle
                cx={x - 100}
                cy={y - 130}
                r="18"
                fill={on ? "#F59A65" : "#D8D2C2"}
                stroke={NAVY}
                strokeWidth="2.4"
              />
              <text
                x={x - 100}
                y={y - 124}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontWeight="800"
                fontSize="17"
                fill={NAVY}
              >
                {i + 1}
              </text>
              <text
                x={x - 76}
                y={y - 100}
                fontFamily="var(--font-display)"
                fontWeight="700"
                fontSize="19"
                fill={NAVY}
              >
                {line1}
              </text>
              <text
                x={x - 76}
                y={y - 76}
                fontFamily="var(--font-display)"
                fontWeight="700"
                fontSize="19"
                fill={NAVY}
              >
                {rest.join(" ")}
              </text>
              <circle
                cx={x}
                cy={y}
                r="9"
                fill={on ? "#F59A65" : "#fff"}
                stroke={NAVY}
                strokeWidth="2.6"
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

function StageCard({
  stage,
  index,
}: {
  stage: (typeof learningStages)[number];
  index: number;
}) {
  return (
    <Reveal as="li" delay={index * 0.06} className="h-full">
      <article className="card lift relative flex h-full flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="bg-orange border-ink font-display grid size-10 shrink-0 place-items-center rounded-full border-2 text-sm font-extrabold">
            {stage.number}
          </span>
          <span
            className="border-ink grid size-10 place-items-center rounded-xl border-2"
            style={{ background: stageTints[stage.number] }}
          >
            <StageIcon number={stage.number} className="size-5" />
          </span>
        </div>
        <h3 className="mt-4 text-xl font-bold">{stage.title}</h3>
        <p className="text-muted mt-1.5 text-[0.9375rem]">{stage.summary}</p>
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label={`${stage.title} technologies`}
        >
          {stage.technologies.map((tech) => (
            <li key={tech} className="chip">
              <TechLogo name={tech} className="size-3.5" />
              {tech}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

/** Courses section: the programme as an illustrated five-stage journey. */
export function LearningJourney({
  level = 2,
  showProgrammeCard = true,
  id = "journey",
}: {
  level?: 1 | 2;
  showProgrammeCard?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="band relative overflow-hidden">
      <div className="wrap">
        <SectionHeading
          level={level}
          eyebrow="Courses"
          title={
            <>
              One programme. A complete IT{" "}
              <span className="scribble">learning journey</span>.
            </>
          }
          lede="Build practical skills across software development and data engineering, one stage at a time."
        />
      </div>

      <div className="wrap mt-8 hidden md:block">
        <RoadScene />
      </div>

      <div
        className={`wrap mt-10 grid gap-8 ${showProgrammeCard ? "lg:grid-cols-[minmax(0,25rem)_1fr] lg:items-start" : ""}`}
      >
        {showProgrammeCard && (
          <div className="lg:sticky lg:top-28">
            <ProgrammeCard course={featuredCourse} />
          </div>
        )}
        <div>
          {/* Small-screen walker above the stacked stages */}
          <svg
            viewBox="0 0 300 110"
            className="mx-auto mb-2 h-28 w-auto md:hidden"
            aria-hidden="true"
          >
            <path
              d="M0 104c80-14 200-14 300 0"
              fill="none"
              stroke={NAVY}
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M0 104c80-14 200-14 300 0"
              fill="none"
              stroke="#F3DFB4"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <Student pose="walk" transform="translate(120 -8) scale(.66)" />
          </svg>
          <ol
            aria-label="Learning stages"
            className={`grid gap-5 sm:grid-cols-2 ${showProgrammeCard ? "" : "lg:grid-cols-3"}`}
          >
            {learningStages.map((stage, i) => (
              <StageCard key={stage.number} stage={stage} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
