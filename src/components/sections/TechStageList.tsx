import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StageIcon, stageTints } from "@/components/StageIcon";
import { TechLogo } from "@/components/TechIcon";
import { stageAnchor } from "@/data/navigation";
import { learningStages } from "@/data/technologies";

/** Every technology grouped by learning stage, each stage linkable by anchor. */
export function TechStageList() {
  return (
    <section className="band">
      <div className="wrap">
        <SectionHeading
          eyebrow="Stage by stage"
          title="What you work with at each stage"
          lede="The five stages are taken in order, from the interface people see to the data behind it."
        />
        <ol className="mt-10 grid gap-5">
          {learningStages.map((stage, i) => (
            <Reveal as="li" key={stage.number} delay={i * 0.05}>
              <article
                id={stageAnchor(stage.number)}
                className="card grid scroll-mt-28 gap-5 p-5 sm:p-7 md:grid-cols-[18rem_1fr] md:items-center"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="border-ink grid size-14 shrink-0 place-items-center rounded-2xl border-2"
                    style={{ background: stageTints[stage.number] }}
                  >
                    <StageIcon number={stage.number} className="size-7" />
                  </span>
                  <div>
                    <p className="text-orange-deep text-sm font-bold">
                      Stage {stage.number}
                    </p>
                    <h3 className="text-xl font-bold">{stage.title}</h3>
                    <p className="text-muted mt-1 text-[0.9375rem]">
                      {stage.summary}
                    </p>
                  </div>
                </div>
                <ul
                  className="flex flex-wrap gap-3"
                  aria-label={`${stage.title} technologies`}
                >
                  {stage.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="border-ink/15 flex items-center gap-3 rounded-2xl border-2 bg-white px-4 py-3"
                    >
                      <TechLogo name={tech} className="size-8" />
                      <span className="font-semibold">{tech}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
