import { Info } from "lucide-react";
import type { ComponentProps } from "react";
import { Avatar } from "@/components/illustrations/Avatar";
import { Bush, Cloud } from "@/components/illustrations/Scenery";
import { Student } from "@/components/illustrations/Student";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  careerHighlights,
  careerJourney,
  careerNote,
  careerPaths,
} from "@/data/careers";
import { learningStages } from "@/data/technologies";

const boardColors = ["#FFE69A", "#D9D2FB", "#C9E8BE", "#FBD0BA"];
const pathLooks: ComponentProps<typeof Avatar>[] = [
  {
    shirt: "#9CC3F2",
    hair: "spiky",
    glasses: true,
    backpack: false,
    pose: "laptop",
  },
  { shirt: "#FFC94D", hair: "ponytail", backpack: false, pose: "wave" },
  {
    shirt: "#A28BEA",
    hair: "neat",
    glasses: true,
    backpack: false,
    pose: "cheer",
  },
];
const pathTints = ["bg-sky-soft", "bg-[#FDE8EE]", "bg-[#EEEAFD]"];

const stageTitle = (n: string) =>
  learningStages.find((s) => s.number === n)?.title ?? "";

/** The signpost: four arrow boards on a wooden post, with a cheering student. */
function Signpost({ Item }: { Item: "h3" | "h4" }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <svg
        viewBox="0 0 200 220"
        className="pointer-events-none absolute -bottom-2 -left-4 hidden h-64 w-auto sm:block"
        aria-hidden="true"
      >
        <Bush transform="translate(10 216) scale(.9)" />
        <Student
          transform="translate(40 40) scale(1)"
          pose="cheer"
          shirt="#4CAF50"
        />
      </svg>
      <div className="relative sm:pl-36">
        <span
          aria-hidden="true"
          className="border-ink absolute top-0 bottom-0 left-[1.6rem] w-4 rounded-t-md border-2 bg-[#9A6B44] sm:left-[10.6rem]"
        />
        <ol className="relative grid gap-4">
          {careerJourney.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.12} y={0}>
              <div
                className="drop-shadow-[0_4px_0_#142B55]"
                style={{ marginLeft: `${(i % 2) * 0.75}rem` }}
              >
                <div className="bg-ink p-[2.5px] [clip-path:polygon(0_0,calc(100%-2rem)_0,100%_50%,calc(100%-2rem)_100%,0_100%)]">
                  <div
                    className="flex min-h-[4.75rem] items-center gap-3 py-3 pr-10 pl-4 [clip-path:polygon(0_0,calc(100%-2rem)_0,100%_50%,calc(100%-2rem)_100%,0_100%)]"
                    style={{ background: boardColors[i] }}
                  >
                    <span className="border-ink grid size-11 shrink-0 place-items-center rounded-xl border-2 bg-white">
                      <Icon name={step.icon} className="size-5" />
                    </span>
                    <span>
                      <Item className="font-display text-lg leading-tight font-bold">
                        <span className="sr-only">Step {i + 1}: </span>
                        {step.title}
                      </Item>
                      <span className="text-ink/75 block text-sm">
                        {step.description}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Career readiness: no placement claims, only verified learning highlights. */
export function CareerJourney({ level = 2 }: { level?: 1 | 2 }) {
  const Sub = level === 1 ? "h2" : "h3";
  const Item = level === 1 ? "h3" : "h4";

  return (
    <section id="careers" className="band relative overflow-hidden">
      <svg
        viewBox="0 0 80 50"
        className="absolute top-10 right-[8%] hidden w-28 md:block"
        aria-hidden="true"
      >
        <Cloud />
      </svg>
      <div className="wrap grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            level={level}
            eyebrow="Career opportunities"
            title={
              <>
                Placement &amp; career{" "}
                <span className="scribble">readiness</span>
              </>
            }
            lede="We help you build the skills, practical experience and confidence to be ready for industry opportunities."
          />
          <p className="bg-sky-soft border-ink/20 mt-6 flex max-w-xl gap-3 rounded-2xl border p-4 text-[0.9375rem]">
            <Info
              className="text-ink mt-0.5 size-5 shrink-0"
              aria-hidden="true"
            />
            {careerNote}
          </p>
        </div>
        <Signpost Item={Item} />
      </div>

      <div className="wrap mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <Sub className="text-2xl font-bold">How we support your learning</Sub>
          <ul className="mt-5 grid grid-cols-2 gap-4">
            {careerHighlights.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.07}>
                <div className="card lift h-full p-5">
                  <span className="bg-yellow border-ink grid size-11 place-items-center rounded-xl border-2">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <Item className="mt-3 text-lg font-bold">{item.title}</Item>
                  <p className="text-muted mt-1 text-sm">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Sub className="text-2xl font-bold">Career paths to work towards</Sub>
          <ul className="mt-5 grid gap-4">
            {careerPaths.map((path, i) => (
              <Reveal as="li" key={path.title} delay={i * 0.08}>
                <div
                  className={`card lift flex items-center gap-4 p-4 ${pathTints[i]}`}
                >
                  <Avatar {...pathLooks[i]} className="h-20 w-auto shrink-0" />
                  <div>
                    <Item className="text-lg font-bold">{path.title}</Item>
                    <p className="text-muted mt-0.5 text-sm">
                      {path.description}
                    </p>
                    <p className="mt-2 flex flex-wrap gap-1.5">
                      {path.stages.map((n) => (
                        <span key={n} className="chip bg-white/80 text-xs">
                          {n} · {stageTitle(n)}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
