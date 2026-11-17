import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { company } from "@/data/company";
import { routes } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Enquire about courses or software development at ${company.brandName}, ${company.location.display}.`,
  alternates: { canonical: routes.contact },
  openGraph: { title: `Contact | ${company.brandName}`, url: routes.contact },
};

export default function ContactPage() {
  return (
    <>
      <ContactSection level={1} />
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
