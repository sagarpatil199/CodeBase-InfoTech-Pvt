import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { company } from "@/data/company";
import { routes } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Software Development",
  description: `${company.brandName} offers software development alongside IT training, built on the technologies we teach.`,
  alternates: { canonical: routes.services },
  openGraph: {
    title: `Software Development | ${company.brandName}`,
    url: routes.services,
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesSection level={1} />
      <CtaBand
        heading="Have a software project in mind?"
        text="Tell us what you want to build and who will use it. We will reply by email."
        label="Discuss Your Project"
        href={routes.discussProject}
      />
    </>
  );
}
