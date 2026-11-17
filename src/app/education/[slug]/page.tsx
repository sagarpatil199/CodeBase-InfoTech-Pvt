import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { CloudSvg } from "@/components/illustrations/Scenery";
import { Student } from "@/components/illustrations/Student";
import { ProgrammeCard } from "@/components/sections/ProgrammeCard";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { company } from "@/data/company";
import { courseHref, courses, formatFee } from "@/data/courses";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return {};
  const description = `${course.name} at ${company.brandName}. Duration: ${course.duration}. Programme fee: ${formatFee(course.fee)}. ${course.paymentSummary}`;
  return {
    title: course.name,
    description,
    alternates: { canonical: courseHref(course) },
    openGraph: { title: course.name, description, url: courseHref(course) },
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.outcome,
    provider: { "@type": "Organization", name: company.brandName },
    offers: {
      "@type": "Offer",
      price: course.fee.amount,
      priceCurrency: course.fee.currency,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      <section className="sky-bg relative -mt-20 overflow-hidden pt-20">
        <CloudSvg className="absolute top-28 right-[6%] hidden w-32 md:block" />
        <div className="wrap grid items-center gap-10 pt-10 pb-16 lg:grid-cols-[1.1fr_1fr] lg:pb-20">
          <div>
            <p className="ribbon">Programme details</p>
            <h1 className="mt-5 text-[2.1rem] font-extrabold sm:text-5xl">
              {course.name}
            </h1>
            <p className="text-muted mt-5 max-w-xl text-lg sm:text-xl">
              {course.outcome} {course.paymentSummary}
            </p>
            <svg
              viewBox="0 0 110 170"
              className="mt-6 hidden h-40 w-auto lg:block"
              aria-hidden="true"
            >
              <Student pose="laptop" shirt="#4CAF50" />
            </svg>
          </div>
          <ProgrammeCard course={course} variant="enquire" headingLevel={2} />
        </div>
      </section>

      <LearningJourney showProgrammeCard={false} id="journey" />
      <CtaBand />
    </>
  );
}
