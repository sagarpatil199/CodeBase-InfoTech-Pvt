import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { company } from "@/data/company";
import { routes } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Courses",
  description: `Courses at ${company.brandName}: the one-year Master Software Development & Data Engineering Program, with practical training and real-time projects.`,
  alternates: { canonical: routes.education },
  openGraph: { title: `Courses | ${company.brandName}`, url: routes.education },
};

export default function EducationPage() {
  return (
    <>
      <LearningJourney level={1} />
      <CtaBand />
    </>
  );
}
