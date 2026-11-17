import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ProjectConceptsSection } from "@/components/sections/ProjectConcepts";
import { company } from "@/data/company";
import { routes } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Project Concepts",
  description: `Illustrative example project concepts built on the technology stack taught at ${company.brandName}: React.js, .NET, SQL databases, Azure Cloud and Databricks.`,
  alternates: { canonical: routes.projects },
  openGraph: {
    title: `Project Concepts | ${company.brandName}`,
    url: routes.projects,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectConceptsSection level={1} />
      <CtaBand />
    </>
  );
}
