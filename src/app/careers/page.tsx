import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { CareerJourney } from "@/components/sections/CareerJourney";
import { company } from "@/data/company";
import { routes } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Career Opportunities",
  description: `How ${company.brandName} helps learners build practical skills and readiness for careers in software development, data engineering and cloud technology.`,
  alternates: { canonical: routes.careers },
  openGraph: {
    title: `Career Opportunities | ${company.brandName}`,
    url: routes.careers,
  },
};

export default function CareersPage() {
  return (
    <>
      <CareerJourney level={1} />
      <CtaBand />
    </>
  );
}
