"use client";

import { ArrowRight, MapPin } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { CloudSvg, MumbaiSkyline } from "@/components/illustrations/Scenery";
import { Student } from "@/components/illustrations/Student";
import { DOORS, Train, TRAIN_RATIO } from "@/components/illustrations/Train";
import { LogoMark } from "@/components/Logo";
import { company } from "@/data/company";
import { featuredCourse } from "@/data/courses";
import { routes } from "@/data/navigation";
import { HOME_REPLAY_EVENT } from "@/lib/homeReplay";

/* ---------- Timeline (seconds) ---------- */
const T = {
  city: 0.1,
  trainStart: 0.45,
  trainDuration: 2.5,
  get arrive() {
    return this.trainStart + this.trainDuration;
  },
};
/** Gentle deceleration: quick at first, then a long, smooth brake. */
const BRAKE: [number, number, number, number] = [0.22, 0.75, 0.28, 1];
const SOFT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/** Riders who step into the doorways once the train has stopped. */
function Riders({ show, reduce }: { show: boolean; reduce: boolean }) {
  const rider = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    transition: { duration: 0.5, ease: SOFT, delay: reduce ? 0 : i * 0.12 },
  });
  const fx = DOORS.front.x;
  return (
    <g>
      <motion.g {...rider(0)}>
        <Student
          transform={`translate(${fx + 22} 108) scale(.56)`}
          shirt="#F59A65"
          hair="ponytail"
          backpack={false}
        />
      </motion.g>
      <motion.g {...rider(1)}>
        <Student
          transform={`translate(${fx - 4} 100) scale(.62)`}
          shirt="#4CAF50"
          pose="wave"
        />
      </motion.g>
      <motion.g {...rider(2)}>
        <Student
          transform={`translate(${fx + 46} 100) scale(.62)`}
          shirt="#7B6FE0"
          hair="neat"
          glasses
          facing="left"
          pants="#2F4E8C"
        />
      </motion.g>
      <motion.g {...rider(3)}>
        <Student
          transform={`translate(${DOORS.front2.x + 12} 100) scale(.62)`}
          shirt="#4FB3E8"
          pose="cheer"
          hair="spiky"
        />
      </motion.g>
      <motion.g {...rider(4)}>
        <Student
          transform={`translate(${DOORS.rear.x + 18} 100) scale(.62)`}
          shirt="#FFC94D"
          hair="ponytail"
          pose="laptop"
          backpack={false}
        />
      </motion.g>
    </g>
  );
}

/** Mumbai station-name-board styled company panel. */
function StationBoard() {
  return (
    <div className="card relative overflow-hidden p-0">
      <div className="bg-yellow border-ink flex items-center gap-3 border-b-2 px-5 py-4 sm:px-6">
        <LogoMark className="size-12 shrink-0" />
        <div className="min-w-0">
          <p className="font-display text-ink text-2xl leading-tight font-extrabold sm:text-[1.7rem]">
            {company.brandName}
          </p>
          <p className="text-ink/80 text-sm font-semibold">
            {company.legalName}
          </p>
        </div>
      </div>
      <div className="grid gap-3 px-5 py-5 sm:px-6">
        <p className="bg-orange/25 text-ink inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-bold">
          {company.primaryBusiness}
        </p>
        <p className="text-ink flex items-center gap-2 font-semibold">
          <MapPin
            className="text-orange-deep size-5 shrink-0"
            aria-hidden="true"
          />
          {company.location.display}
        </p>
        <p className="border-line text-muted border-t pt-3 text-[0.9375rem]">
          <span className="text-ink font-semibold">Next stop:</span>{" "}
          {featuredCourse.name}
        </p>
      </div>
    </div>
  );
}

function HeroScene() {
  const reduce = Boolean(useReducedMotion());
  const progress = useMotionValue(reduce ? 1 : 0);
  const [arrived, setArrived] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(progress, 1, {
      delay: T.trainStart,
      duration: T.trainDuration,
      ease: BRAKE,
    });
    controls.then(() => setArrived(true));
    return () => controls.stop();
  }, [progress, reduce]);

  const trainX = useTransform(progress, (p) => `${(p - 1) * 125}vw`);
  const wheelAngle = useTransform(progress, (p) => (p - 1) * 1600);

  /** Reveal props for content that appears after the train stops. */
  const reveal = (delay: number, y = 18) => ({
    "data-reveal": true,
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: SOFT, delay: reduce ? 0 : delay },
  });

  return (
    <>
      {/* Clouds */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {[
          "top-[7%] left-[3%] w-24 sm:w-32",
          "top-[16%] right-[6%] hidden w-28 sm:block sm:w-40",
          "top-[30%] left-[50%] hidden w-20 xl:block",
        ].map((pos, i) => (
          <motion.div
            key={pos}
            className={`absolute ${pos}`}
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 0.95, x: 0 }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: SOFT }}
          >
            <CloudSvg className="w-full" />
          </motion.div>
        ))}
      </div>

      {/* Text and company panel */}
      <div className="wrap relative grid items-center gap-8 pt-6 pb-4 sm:pt-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12 lg:pt-10">
        <div>
          <motion.p {...reveal(T.arrive + 0.15, 10)} className="ribbon">
            Learn. Build. Innovate.
          </motion.p>
          <motion.h1
            {...reveal(T.arrive + 0.45)}
            className="mt-5 text-[2.2rem] font-extrabold sm:text-5xl lg:text-[3.3rem]"
          >
            Practical IT training for{" "}
            <span className="scribble">software development</span> &amp; data
            engineering
          </motion.h1>
          <motion.p
            {...reveal(T.arrive + 0.6)}
            className="text-muted mt-5 max-w-xl text-lg sm:text-xl"
          >
            Hands-on, job-oriented learning with real-time projects at{" "}
            {company.brandName}, {company.location.city}.{" "}
            {featuredCourse.outcome}
          </motion.p>
          <motion.div
            {...reveal(T.arrive + 0.75)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link
              href={routes.course}
              className="btn btn-primary btn-block-mobile"
            >
              Explore Programme
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href={routes.about}
              className="btn btn-quiet btn-block-mobile"
            >
              About Us
            </Link>
          </motion.div>
        </div>

        <motion.div
          data-reveal
          initial={reduce ? false : { opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.65,
            ease: SOFT,
            delay: reduce ? 0 : T.arrive + 0.2,
          }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <StationBoard />
        </motion.div>
      </div>

      {/* Railway scene */}
      <div
        className="relative order-first [--sky:56px] [--tw:170vw] md:[--tw:125vw] lg:order-none lg:-mt-20 lg:[--sky:130px] lg:[--tw:min(1120px,92vw)]"
        style={
          {
            height: `calc(var(--tw) * ${TRAIN_RATIO} + 76px + var(--sky))`,
          } as CSSProperties
        }
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[38px]"
          style={{
            height: `calc(var(--tw) * ${TRAIN_RATIO} + var(--sky) + 10px)`,
          }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: SOFT, delay: T.city }}
        >
          <MumbaiSkyline className="h-full w-full" />
        </motion.div>

        {/* Overhead wire and masts */}
        <div aria-hidden="true">
          <span
            className="absolute inset-x-0 h-[2px] bg-[#4b5a78]"
            style={{ bottom: `calc(var(--tw) * ${TRAIN_RATIO} + 38px)` }}
          />
          {["6%", "36%", "66%", "94%"].map((left) => (
            <span
              key={left}
              className="absolute bottom-[38px] w-[7px] rounded-t-sm border-2 border-[#142B55] bg-[#7d8ba6]"
              style={{
                left,
                height: `calc(var(--tw) * ${TRAIN_RATIO} + 14px)`,
              }}
            />
          ))}
        </div>

        {/* Track */}
        <div
          aria-hidden="true"
          className="rail-bed absolute inset-x-0 bottom-[22px] h-[18px] border-y-2 border-[#142B55]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[24px] bg-[#A9D79A]"
        />

        {/* The train */}
        <motion.div
          className="absolute right-[3vw] bottom-[36px] lg:right-[max(3vw,calc((100vw-1180px)/2))]"
          style={{ x: trainX, width: "var(--tw)" }}
        >
          <Train
            className="block h-auto w-full"
            wheelAngle={wheelAngle}
            riders={<Riders show={arrived} reduce={reduce} />}
          />
        </motion.div>
      </div>
    </>
  );
}

/**
 * Homepage hero. The train entrance plays on every homepage activation:
 * the scene is keyed, and the key changes when a Home link is clicked on
 * the homepage or the page is restored from the back/forward cache.
 */
export function HeroTrain() {
  const [run, setRun] = useState(0);

  useEffect(() => {
    const replay = () => setRun((n) => n + 1);
    const onPageShow = (e: PageTransitionEvent) => e.persisted && replay();
    window.addEventListener(HOME_REPLAY_EVENT, replay);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener(HOME_REPLAY_EVENT, replay);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return (
    <section
      aria-label="Welcome to CodeBase Infotech"
      className="sky-bg relative -mt-20 overflow-hidden pt-20"
    >
      <div className="flex flex-col">
        <HeroScene key={run} />
      </div>
    </section>
  );
}
