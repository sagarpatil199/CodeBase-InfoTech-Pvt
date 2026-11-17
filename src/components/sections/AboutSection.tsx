import { ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Avatar } from "@/components/illustrations/Avatar";
import { ClassroomScene } from "@/components/illustrations/ClassroomScene";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { company } from "@/data/company";
import { routes } from "@/data/navigation";

/** One character per audience group, in the order of company.audience. */
const audienceLooks: ComponentProps<typeof Avatar>[] = [
  { shirt: "#4CAF50", hair: "spiky" },
  { shirt: "#3A3F55", hair: "neat", gradCap: true, backpack: false },
  { shirt: "#9CC3F2", hair: "neat", glasses: true, backpack: false },
  { shirt: "#FFC94D", hair: "ponytail", pose: "cheer", backpack: false },
];
const audienceTints = [
  "bg-sky-soft",
  "bg-[#FFF3D1]",
  "bg-[#EAF5E5]",
  "bg-[#FDE8EE]",
];

export function AboutSection({
  level = 2,
  showMoreLink = true,
}: {
  level?: 1 | 2;
  showMoreLink?: boolean;
}) {
  const Sub = level === 1 ? "h2" : "h3";
  const Item = level === 1 ? "h3" : "h4";
  return (
    <section
      id="about"
      className="band bg-sky-soft/60 relative overflow-hidden"
    >
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeading
            level={level}
            eyebrow={company.tagline}
            title={
              <>
                Practical IT training for{" "}
                <span className="scribble">real career opportunities</span>
              </>
            }
          />
          <p className="mt-6 text-lg sm:text-xl">{company.introduction}</p>
          {showMoreLink && (
            <Link
              href={routes.about}
              className="btn btn-quiet btn-block-mobile mt-8"
            >
              About CodeBase Infotech
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          )}
        </div>
        <Reveal>
          <ClassroomScene className="h-auto w-full drop-shadow-[0_6px_0_#142B55]" />
        </Reveal>
      </div>

      <div className="wrap mt-14 grid gap-6 lg:grid-cols-[2.2fr_1fr] lg:items-stretch">
        <div>
          <Sub className="text-2xl font-bold">Who we teach</Sub>
          <ul className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {company.audience.map((group, i) => (
              <Reveal as="li" key={group.title} delay={i * 0.08}>
                <div
                  className={`card lift flex h-full flex-col items-center p-4 text-center ${audienceTints[i]}`}
                >
                  <Avatar {...audienceLooks[i]} className="h-24 w-auto" />
                  <Item className="font-display mt-2 text-lg font-bold">
                    {group.title}
                  </Item>
                  <p className="text-muted mt-1 text-sm">{group.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="h-full">
          <div className="card flex h-full flex-col justify-center p-6 lg:mt-12">
            <span className="bg-yellow border-ink grid size-12 place-items-center rounded-full border-2">
              <Target className="text-orange-deep size-6" aria-hidden="true" />
            </span>
            <Sub className="mt-4 text-2xl font-bold">Our commitment</Sub>
            <p className="mt-3 text-lg">{company.aim}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
