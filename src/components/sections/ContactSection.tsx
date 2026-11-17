import { Code2, Mail, MapPin, Phone } from "lucide-react";
import { Suspense, type ReactNode } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { InstituteBuilding } from "@/components/illustrations/InstituteBuilding";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { company } from "@/data/company";
import { contact } from "@/data/contact";

function InfoItem({
  icon,
  title,
  children,
  tint,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  tint: string;
}) {
  return (
    <li className="flex items-start gap-3 p-5">
      <span
        className={`border-ink grid size-12 shrink-0 place-items-center rounded-2xl border-2 ${tint}`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-display text-lg font-bold">{title}</p>
        <div className="text-muted text-[0.9375rem]">{children}</div>
      </div>
    </li>
  );
}

/**
 * Contact: institute illustration and the enquiry form. The phone number
 * stays hidden while src/data/contact.ts marks it as a demo placeholder.
 */
export function ContactSection({ level = 2 }: { level?: 1 | 2 }) {
  return (
    <section id="contact" className="sky-bg band relative overflow-hidden">
      <div className="wrap">
        <SectionHeading
          level={level}
          eyebrow="Enquire now"
          title={
            <>
              Get in touch for <span className="scribble">course details</span>{" "}
              or software development
            </>
          }
          lede={`Ask about the programme, the fee and how payment works, or tell us about a software project. ${company.brandName}, ${company.location.display}.`}
        />

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="order-last lg:sticky lg:top-28 lg:order-none">
            <InstituteBuilding className="mx-auto h-auto w-full max-w-lg" />
          </Reveal>

          <div id="enquiry" className="card scroll-mt-28 p-5 sm:p-8">
            <h2 className="sr-only">Enquiry form</h2>
            <Suspense fallback={null}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>

        <ul className="card mt-10 grid divide-y-2 divide-[#142B55]/10 md:grid-cols-3 md:divide-x-2 md:divide-y-0">
          <InfoItem
            icon={<Mail className="size-5" aria-hidden="true" />}
            title="Email us"
            tint="bg-sky"
          >
            <a
              href={`mailto:${contact.email.value}`}
              className="text-ink font-semibold [overflow-wrap:anywhere] hover:underline"
            >
              {contact.email.value}
            </a>
          </InfoItem>
          <InfoItem
            icon={<MapPin className="size-5" aria-hidden="true" />}
            title="Location"
            tint="bg-[#fdd9c4]"
          >
            {contact.location}
            {contact.mapUrl && (
              <>
                {" · "}
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink font-semibold underline"
                >
                  Open in Google Maps
                </a>
              </>
            )}
          </InfoItem>
          {contact.phone.isDemo ? (
            <InfoItem
              icon={<Code2 className="size-5" aria-hidden="true" />}
              title="Enquire for"
              tint="bg-lilac"
            >
              IT training · Software development
            </InfoItem>
          ) : (
            <InfoItem
              icon={<Phone className="size-5" aria-hidden="true" />}
              title="Call us"
              tint="bg-lilac"
            >
              <a
                href={`tel:${contact.phone.value.replace(/\s/g, "")}`}
                className="text-ink font-semibold hover:underline"
              >
                {contact.phone.value}
              </a>
            </InfoItem>
          )}
        </ul>
      </div>
    </section>
  );
}
