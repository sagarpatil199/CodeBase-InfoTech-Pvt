import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { highlights } from "@/data/company";

const tints = ["bg-sky", "bg-yellow", "bg-green"];

/** The three verified institute highlights, just below the hero. */
export function Highlights() {
  return (
    <section aria-labelledby="highlights-title" className="relative z-10 -mt-4">
      <h2 id="highlights-title" className="sr-only">
        Institute highlights
      </h2>
      <ul className="wrap grid gap-4 md:grid-cols-3 md:gap-6">
        {highlights.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 0.1}>
            <div className="card lift flex h-full items-start gap-4 p-5 sm:p-6">
              <span
                className={`${tints[i % tints.length]} border-ink grid size-14 shrink-0 place-items-center rounded-2xl border-2`}
              >
                <Icon name={item.icon} className="text-ink size-7" />
              </span>
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted mt-1 text-[0.9375rem]">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
