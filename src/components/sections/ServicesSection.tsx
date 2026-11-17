import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Plant } from "@/components/illustrations/Scenery";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TechLogo } from "@/components/TechIcon";
import { routes } from "@/data/navigation";
import { publishedServices, servicesIntro } from "@/data/services";
import { allTechnologies } from "@/data/technologies";

const NAVY = "#142B55";

function BuildIllustration() {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" aria-hidden="true">
      <rect
        x="20"
        y="30"
        width="330"
        height="210"
        rx="18"
        fill="#fff"
        stroke={NAVY}
        strokeWidth="3"
      />
      <path d="M20 66h330" stroke={NAVY} strokeWidth="3" />
      {["#F25F5C", "#FFC94D", "#8BCF7A"].map((c, i) => (
        <circle
          key={c}
          cx={44 + i * 20}
          cy="48"
          r="6"
          fill={c}
          stroke={NAVY}
          strokeWidth="2"
        />
      ))}
      <rect
        x="40"
        y="86"
        width="120"
        height="132"
        rx="10"
        fill="#E6F7FD"
        stroke={NAVY}
        strokeWidth="2.4"
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="54"
          y={102 + i * 26}
          width={[80, 60, 90, 50][i]}
          height="10"
          rx="5"
          fill={["#4FB3E8", "#A28BEA", "#F59A65", "#8BCF7A"][i]}
        />
      ))}
      <rect
        x="178"
        y="86"
        width="152"
        height="60"
        rx="10"
        fill="#FFF3D1"
        stroke={NAVY}
        strokeWidth="2.4"
      />
      <path
        d="M196 128l22-20 20 12 24-22 22 14"
        fill="none"
        stroke="#F59A65"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="178"
        y="158"
        width="72"
        height="60"
        rx="10"
        fill="#EEEAFD"
        stroke={NAVY}
        strokeWidth="2.4"
      />
      <rect
        x="258"
        y="158"
        width="72"
        height="60"
        rx="10"
        fill="#EAF5E5"
        stroke={NAVY}
        strokeWidth="2.4"
      />
      <path
        d="M206 178l-10 10 10 10M222 178l10 10-10 10"
        fill="none"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="294"
        cy="180"
        rx="18"
        ry="7"
        fill="#fff"
        stroke={NAVY}
        strokeWidth="2.4"
      />
      <path
        d="M276 180v18c0 4 8 7 18 7s18-3 18-7v-18"
        fill="#fff"
        stroke={NAVY}
        strokeWidth="2.4"
      />
      {/* Gear */}
      <g transform="translate(360 220)">
        <circle
          r="34"
          fill="#FFE69A"
          stroke={NAVY}
          strokeWidth="3"
          strokeDasharray="12 6"
        />
        <circle r="14" fill="#fff" stroke={NAVY} strokeWidth="3" />
      </g>
      <Plant transform="translate(20 292) scale(.8)" />
      <path
        d="M80 280h300"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Software development: the company's secondary business. Only services
 * marked "verified" in src/data/services.ts are listed individually.
 */
export function ServicesSection({ level = 2 }: { level?: 1 | 2 }) {
  const Sub = level === 1 ? "h2" : "h3";
  const uniqueTech = Array.from(new Set(allTechnologies));
  return (
    <section id="services" className="band">
      <div className="wrap">
        <div className="card grid items-center gap-10 bg-[#FFFBEA] p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-14">
          <div>
            <SectionHeading
              level={level}
              eyebrow="Software development"
              title={servicesIntro.heading}
              lede={servicesIntro.body}
            />

            {publishedServices.length > 0 && (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {publishedServices.map((service) => (
                  <li key={service.title} className="card-soft p-5">
                    <Sub className="text-lg font-bold">{service.title}</Sub>
                    <p className="text-muted mt-1 text-[0.9375rem]">
                      {service.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <Sub className="mt-8 text-lg font-bold">
              To start a conversation, tell us:
            </Sub>
            <ul className="mt-3 grid gap-2">
              {servicesIntro.enquiryChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check
                    className="text-green-deep mt-1 size-4 shrink-0"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={routes.discussProject}
              className="btn btn-primary btn-block-mobile mt-8"
            >
              Discuss Your Project
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>

          <Reveal>
            <BuildIllustration />
            <p className="text-muted mt-6 text-center text-sm font-semibold">
              Built on the same stack we teach
            </p>
            <ul
              className="mt-3 flex flex-wrap justify-center gap-2"
              aria-label="Technologies we work with"
            >
              {uniqueTech.map((tech) => (
                <li key={tech} className="chip bg-white">
                  <TechLogo name={tech} className="size-3.5" />
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
