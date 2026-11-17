import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { TechAirplane } from "@/components/sections/TechAirplane";
import { TechStageList } from "@/components/sections/TechStageList";
import { company } from "@/data/company";
import { routes } from "@/data/navigation";
import { allTechnologies } from "@/data/technologies";

export const metadata: Metadata = {
  title: "Technologies",
  description: `Technologies taught at ${company.brandName}: ${allTechnologies.join(", ")}.`,
  alternates: { canonical: routes.technologies },
  openGraph: {
    title: `Technologies | ${company.brandName}`,
    url: routes.technologies,
  },
};

export default function TechnologiesPage() {
  return (
    <>
      <TechAirplane level={1} />
      <TechStageList />
      <CtaBand />
    </>
  );
}
