import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TechLogo } from "@/components/TechIcon";
import { routes } from "@/data/navigation";
import {
  projectConceptLabel,
  projectConcepts,
  type ProjectConcept,
} from "@/data/projects";

const tints = ["#E6F7FD", "#EEEAFD", "#FFF3D1", "#EAF5E5", "#FDE8EE"];

/** Technology nodes joined by dashed connectors that run on hover. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <ol
      aria-label="How the technologies connect, in order"
      className="flex flex-wrap items-start justify-center gap-y-3"
    >
      {steps.map((step, i) => (
        <li key={step} className="flex items-start">
          {i > 0 && (
            <svg
              viewBox="0 0 44 14"
              className="mx-0.5 mt-5 h-3.5 w-8 shrink-0"
              aria-hidden="true"
            >
              <path
                className="flow-dash"
                d="M2 7h34"
                stroke="#142B55"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <path
                d="M34 2l7 5-7 5"
                fill="none"
                stroke="#142B55"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="flex w-[4.75rem] flex-col items-center text-center">
            <span className="border-ink grid size-14 place-items-center rounded-2xl border-2 bg-white shadow-[0_3px_0_#142B55] transition-transform duration-300 group-hover:-translate-y-1">
              <TechLogo name={step} className="size-7" />
            </span>
            <span className="mt-1.5 text-xs leading-tight font-semibold">
              {step}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function ConceptCard({
  concept,
  index,
  Title,
}: {
  concept: ProjectConcept;
  index: number;
  Title: "h2" | "h3";
}) {
  return (
    <Reveal as="li" delay={(index % 3) * 0.08} className="h-full">
      <article className="group card lift flex h-full flex-col overflow-hidden">
        <div
          className="border-ink border-b-2 px-4 pt-4 pb-6"
          style={{ background: tints[index % tints.length] }}
        >
          <p className="bg-yellow border-ink mx-auto mb-5 flex w-fit items-center gap-1.5 rounded-full border-2 px-3 py-0.5 text-xs font-bold">
            <Lightbulb className="size-3.5" aria-hidden="true" />
            {projectConceptLabel}
          </p>
          <Flow steps={concept.flow} />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-orange-deep text-sm font-bold tracking-wide uppercase">
            {concept.category}
          </p>
          <Title className="mt-1.5 text-xl font-bold">{concept.title}</Title>
          <p className="text-muted mt-2 text-[0.9375rem]">
            {concept.description}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

export function ProjectConceptsSection({
  level = 2,
  limit,
}: {
  level?: 1 | 2;
  limit?: number;
}) {
  const items = limit ? projectConcepts.slice(0, limit) : projectConcepts;
  return (
    <section id="projects" className="band">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            level={level}
            eyebrow="Project concepts"
            title={
              <>
                What these skills can <span className="scribble">build</span>
              </>
            }
            lede="Example project ideas that use the technologies in the programme. They are illustrative concepts, not completed client work or actual student projects."
          />
          {limit && (
            <Link
              href={routes.projects}
              className="btn btn-quiet btn-block-mobile shrink-0 self-start lg:self-end"
            >
              All project concepts
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          )}
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((concept, i) => (
            <ConceptCard
              key={concept.title}
              concept={concept}
              index={i}
              Title={level === 1 ? "h2" : "h3"}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
