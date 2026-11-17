import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { AboutSection } from "@/components/sections/AboutSection";
import { company } from "@/data/company";
import { featuredCourse } from "@/data/courses";
import { routes } from "@/data/navigation";
import { learningStages } from "@/data/technologies";

export const metadata: Metadata = {
  title: "About Us",
  description: `${company.brandName} is an ${company.instituteType} in ${company.location.display}, focused on practical and job-oriented learning.`,
  alternates: { canonical: routes.about },
  openGraph: { title: `About ${company.brandName}`, url: routes.about },
};

const facts = [
  ["Legal name", company.legalName],
  ["Company status", company.status],
  ["CIN", company.cin],
  ["Incorporated", company.incorporationDate],
  ["Registered location", company.location.display],
  [
    "Business classification",
    `${company.classification} (NIC ${company.nicCode})`,
  ],
  ["Primary business", company.primaryBusiness],
  ["Secondary business", company.secondaryBusiness],
];

export default function AboutPage() {
  return (
    <>
      <AboutSection level={1} showMoreLink={false} />

      <section className="band">
        <div className="wrap grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-7">
              <h2 className="text-2xl font-bold">
                Our focus: practical IT education
              </h2>
              <p className="text-muted mt-4">
                College teaches the theory. Jobs ask for the practice. Our work
                is the gap between the two: practical, job-oriented learning
                that connects academic knowledge with industry requirements.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-7">
              <h2 className="text-2xl font-bold">How you learn here</h2>
              <p className="text-muted mt-4">
                Training is hands-on and built around real-time projects. The{" "}
                {featuredCourse.duration.toLowerCase()} programme moves through{" "}
                {learningStages.length} stages in order:{" "}
                {learningStages.map((s) => s.title.toLowerCase()).join(", ")}.
              </p>
              <Link
                href={`${routes.course}#journey`}
                className="btn btn-quiet btn-sm mt-6"
              >
                See the learning journey
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="wrap mt-12">
          <div className="card overflow-hidden">
            <h2 className="bg-yellow border-ink border-b-2 px-6 py-4 text-2xl font-bold sm:px-8">
              Company details
            </h2>
            <dl className="divide-line divide-y px-6 sm:px-8">
              {facts.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 py-4 sm:grid-cols-[15rem_1fr] sm:gap-6"
                >
                  <dt className="text-muted text-[0.9375rem]">{label}</dt>
                  <dd className="font-semibold break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
