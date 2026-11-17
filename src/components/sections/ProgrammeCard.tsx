import { ArrowRight, CalendarCheck, Check, Coins, Send } from "lucide-react";
import Link from "next/link";
import { courseHref, formatFee, type Course } from "@/data/courses";
import { routes } from "@/data/navigation";

/** Notebook-style card with the programme's verified facts. */
export function ProgrammeCard({
  course,
  variant = "explore",
  headingLevel = 3,
}: {
  course: Course;
  /** "explore" links to the course page; "enquire" links to the form. */
  variant?: "explore" | "enquire";
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="relative pt-4">
      {/* Binder rings */}
      <div aria-hidden="true" className="absolute top-0 left-10 flex gap-2">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="border-ink h-8 w-3 rounded-full border-[3px] bg-white"
          />
        ))}
      </div>
      <div aria-hidden="true" className="absolute top-0 right-10 flex gap-2">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="border-ink h-8 w-3 rounded-full border-[3px] bg-white"
          />
        ))}
      </div>

      <div className="card p-6 sm:p-8">
        <p className="text-orange-deep text-sm font-bold tracking-wide uppercase">
          Featured programme
        </p>
        <Heading className="mt-2 text-2xl font-extrabold sm:text-[1.9rem]">
          {course.name}
        </Heading>
        <p className="bg-orange/30 text-ink mt-4 rounded-xl px-4 py-2.5 text-center font-semibold">
          {course.outcome}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="bg-sky-soft rounded-2xl p-4">
            <dt className="text-muted flex items-center gap-1.5 text-sm font-medium">
              <CalendarCheck className="size-4" aria-hidden="true" />
              Duration
            </dt>
            <dd className="font-display mt-1 text-2xl font-bold">
              {course.duration}
            </dd>
          </div>
          <div className="bg-sky-soft rounded-2xl p-4">
            <dt className="text-muted flex items-center gap-1.5 text-sm font-medium">
              <Coins className="size-4" aria-hidden="true" />
              Programme fee
            </dt>
            <dd className="font-display mt-1 text-2xl font-bold">
              {formatFee(course.fee)}
            </dd>
          </div>
        </dl>

        <p className="mt-6 text-base font-bold">Flexible payment options</p>
        <ul className="mt-2 grid gap-1.5 text-[0.9375rem]">
          {course.paymentOptions.map((option) => (
            <li key={option} className="flex items-start gap-2">
              <Check
                className="text-green-deep mt-1 size-4 shrink-0"
                strokeWidth={3}
                aria-hidden="true"
              />
              {option}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {variant === "explore" ? (
            <Link
              href={courseHref(course)}
              className="btn btn-primary btn-block-mobile"
            >
              Explore Programme
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          ) : (
            <Link
              href={routes.enroll}
              className="btn btn-primary btn-block-mobile"
            >
              <Send className="size-4" aria-hidden="true" />
              Course Enquiry
            </Link>
          )}
          {course.syllabusUrl && (
            <a
              href={course.syllabusUrl}
              download
              className="btn btn-quiet btn-block-mobile"
            >
              Download Syllabus
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
