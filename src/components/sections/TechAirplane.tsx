"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Airplane } from "@/components/illustrations/Airplane";
import { Cloud } from "@/components/illustrations/Scenery";
import { SectionHeading } from "@/components/SectionHeading";
import { TechLogo } from "@/components/TechIcon";
import { learningStages } from "@/data/technologies";

const NAVY = "#142B55";

/** Every verified technology, with the stage it belongs to. */
const techCards = learningStages.flatMap((stage) =>
  stage.technologies.map((name) => ({ name, stage })),
);

const CHUTES = [
  "#4FB3E8",
  "#F59A65",
  "#FFC94D",
  "#F48FB1",
  "#8BCF7A",
  "#A28BEA",
];

/** Flight path in the 1200 × 300 scene; the plane comes to rest at its end. */
const FLIGHT = "M-170 250C80 300 240 90 460 120S720 230 840 120";
const PLANE_W = 300;
const PLANE_H = 170;
const FLIGHT_SECONDS = 2.6;

function FlightScene({ go, reduce }: { go: boolean; reduce: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const progress = useMotionValue(reduce ? 1 : 0);

  const place = (p: number) => {
    const path = pathRef.current;
    const plane = planeRef.current;
    if (!path || !plane) return;
    const len = path.getTotalLength();
    const a = path.getPointAtLength(p * len);
    const b = path.getPointAtLength(Math.min(len, p * len + 1));
    const angle =
      p >= 1 ? -4 : (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    plane.setAttribute(
      "transform",
      `translate(${a.x} ${a.y}) rotate(${angle * 0.6}) scale(.62) translate(${-PLANE_W / 2} ${-PLANE_H / 2})`,
    );
  };

  useMotionValueEvent(progress, "change", place);

  useEffect(() => {
    if (!go || reduce) return;
    const controls = animate(progress, 1, {
      duration: FLIGHT_SECONDS,
      ease: [0.45, 0.05, 0.25, 1],
    });
    return () => controls.stop();
  }, [go, reduce, progress]);

  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMidYMid slice"
      className="h-[170px] w-full sm:h-[220px] lg:h-[260px]"
      aria-hidden="true"
    >
      <Cloud transform="translate(120 40) scale(1.2)" />
      <Cloud transform="translate(620 230) scale(.9)" />
      <Cloud transform="translate(1040 50) scale(1.1)" />
      <path ref={pathRef} d={FLIGHT} fill="none" stroke="none" />
      <motion.path
        d={FLIGHT}
        fill="none"
        stroke={NAVY}
        strokeWidth="3"
        strokeDasharray="10 12"
        strokeLinecap="round"
        opacity=".55"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: go || reduce ? 1 : 0 }}
        transition={{ duration: FLIGHT_SECONDS, ease: [0.45, 0.05, 0.25, 1] }}
      />
      {/* Starts at the end point when motion is reduced, off-screen otherwise */}
      <g
        ref={planeRef}
        transform={
          reduce
            ? `translate(840 120) rotate(-2.4) scale(.62) translate(${-PLANE_W / 2} ${-PLANE_H / 2})`
            : "translate(-400 250)"
        }
      >
        <Airplane />
      </g>
    </svg>
  );
}

function Parachute({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 120 74"
      className="chute mx-auto -mb-1 h-14 w-auto sm:h-16"
      aria-hidden="true"
    >
      <path
        d="M8 34C8 4 112 4 112 34z"
        fill={color}
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M8 34c10-8 18-8 26 0 9-8 17-8 26 0 9-8 17-8 26 0 9-8 17-8 26 0"
        fill={color}
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M40 12c-6 6-8 14-6 22M80 12c6 6 8 14 6 22"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".7"
      />
      <path
        d="M10 36 52 72M38 36l16 36M82 36 66 72M110 36 68 72"
        stroke={NAVY}
        strokeWidth="1.8"
      />
    </svg>
  );
}

function TechCard({
  name,
  stage,
  index,
  go,
  reduce,
}: (typeof techCards)[number] & {
  index: number;
  go: boolean;
  reduce: boolean;
}) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    <motion.li
      data-reveal
      className="w-[calc(50%-0.5rem)] sm:w-44 lg:w-52"
      initial={
        reduce ? false : { opacity: 0, y: -170, rotate: index % 2 ? 6 : -6 }
      }
      animate={go || reduce ? { opacity: 1, y: 0, rotate: 0 } : undefined}
      transition={{
        delay: reduce ? 0 : 0.9 + index * 0.13,
        y: { type: "spring", stiffness: 90, damping: 13, mass: 1.1 },
        rotate: { type: "spring", stiffness: 70, damping: 10 },
        opacity: { duration: 0.3 },
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={detailsId}
        className="group block w-full rounded-3xl text-left focus-visible:outline-offset-4"
      >
        <Parachute color={CHUTES[index % CHUTES.length]} />
        <span className="card relative flex h-40 flex-col items-center justify-center overflow-hidden px-3 text-center transition-transform duration-300 group-hover:-translate-y-1 sm:h-44">
          <span
            className={`flex flex-col items-center transition-all duration-300 ${open ? "pointer-events-none scale-90 opacity-0" : "opacity-100"}`}
          >
            <TechLogo name={name} className="size-12 sm:size-14" />
            <span className="font-display mt-3 text-lg leading-tight font-bold">
              {name}
            </span>
            <span className="text-muted mt-1 text-xs font-semibold">
              Stage {stage.number}
            </span>
          </span>
          <span
            id={detailsId}
            className={`absolute inset-0 flex flex-col justify-center gap-1 bg-[#FFF8E1] p-4 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <span className="font-display text-sm font-bold">
              {stage.title}
            </span>
            <span className="text-muted text-[0.8125rem] leading-snug">
              {stage.summary}
            </span>
          </span>
        </span>
      </button>
    </motion.li>
  );
}

/** Technologies section: a plane flies in and the stack parachutes down. */
export function TechAirplane({ level = 2 }: { level?: 1 | 2 }) {
  const reduce = Boolean(useReducedMotion());
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });

  return (
    <section id="technologies" className="sky-bg band relative overflow-hidden">
      <div className="wrap">
        <SectionHeading
          level={level}
          eyebrow="Our technologies"
          title={
            <>
              Industry-relevant technologies{" "}
              <span className="scribble">you&rsquo;ll learn</span>
            </>
          }
          lede="Hands-on experience with the tools used in software development and data engineering. Select a card to see which stage it belongs to."
        />
      </div>

      <div ref={ref} className="relative mt-4">
        <FlightScene go={inView} reduce={reduce} />
        <ul
          className="wrap -mt-6 flex max-w-[62rem] flex-wrap justify-center gap-x-4 gap-y-6 sm:-mt-10 sm:gap-x-6 sm:gap-y-8"
          aria-label="Technologies taught"
        >
          {techCards.map((card, i) => (
            <TechCard
              key={card.name}
              {...card}
              index={i}
              go={inView}
              reduce={reduce}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
