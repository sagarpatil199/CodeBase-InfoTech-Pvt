import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Student } from "@/components/illustrations/Student";
import { routes } from "@/data/navigation";

/** Closing call to action in a light yellow panel. */
export function CtaBand({
  heading = "Ready to start your IT learning journey?",
  text = "Ask about the programme, the fee and how payment works. Enrolment starts with an enquiry.",
  label = "Course Enquiry",
  href = routes.enroll,
}: {
  heading?: string;
  text?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="wrap pb-24 lg:pb-32">
      <div className="card bg-yellow relative overflow-hidden px-6 py-10 sm:px-12 lg:px-16 lg:py-14">
        <svg
          viewBox="0 0 110 170"
          className="absolute right-6 -bottom-4 hidden h-48 w-auto md:block lg:right-16"
          aria-hidden="true"
        >
          <Student pose="cheer" shirt="#4CAF50" />
        </svg>
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{heading}</h2>
          <p className="text-ink/80 mt-4 text-lg">{text}</p>
          <Link href={href} className="btn btn-navy btn-block-mobile mt-7">
            {label}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
