"use client";

import {
  BookOpen,
  Code2,
  GraduationCap,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  User,
  type LucideIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  enquiryDelivery,
  enquiryTypes,
  type EnquiryType,
} from "@/data/contact";
import { courses } from "@/data/courses";

/** Builds the mailto: link that opens the visitor's email app, pre-filled. */
const buildMailto = (v: Values) => {
  const typeLabel = enquiryTypes.find((t) => t.value === v.type)?.label ?? "";
  const course = courses.find((c) => c.slug === v.course);
  const subject = `${typeLabel} from ${v.name.trim()}`;
  const body = [
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    `Mobile: ${v.mobile.trim()}`,
    `Enquiry type: ${typeLabel}`,
    ...(course && v.type === "course" ? [`Course: ${course.name}`] : []),
    "",
    v.message.trim(),
  ].join("\n");
  return `mailto:${enquiryDelivery.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

type Values = {
  name: string;
  email: string;
  mobile: string;
  type: EnquiryType | "";
  course: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const validate = (v: Values): Errors => {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    errors.email = "Enter a valid email address, like name@example.com.";
  if (!/^(\+91)?[6-9]\d{9}$/.test(v.mobile.replace(/[\s-]/g, "")))
    errors.mobile = "Enter a 10-digit mobile number.";
  if (!v.type) errors.type = "Choose an enquiry type.";
  if (v.type === "course" && !v.course) errors.course = "Choose a course.";
  if (v.message.trim().length < 10)
    errors.message = "Write a short message, at least 10 characters.";
  return errors;
};

const typeIcons: Record<EnquiryType, LucideIcon> = {
  course: GraduationCap,
  software: Code2,
};

const inputClass =
  "w-full rounded-2xl border-2 border-ink/20 bg-white py-3 pr-4 pl-11 text-base text-ink transition-colors outline-none placeholder:text-muted/70 focus:border-ink aria-[invalid=true]:border-danger";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-danger mt-1.5 text-sm font-medium">
      {message}
    </p>
  );
}

function Field({
  label,
  icon: IconCmp,
  children,
  error,
  errorId,
}: {
  label: string;
  icon: LucideIcon;
  children: ReactNode;
  error?: string;
  errorId: string;
}) {
  return (
    <label className="block text-[0.9375rem] font-semibold">
      {label}
      <span className="relative mt-1.5 block">
        <IconCmp
          className="text-muted pointer-events-none absolute top-3.5 left-4 size-5"
          aria-hidden="true"
        />
        {children}
      </span>
      <FieldError id={errorId} message={error} />
    </label>
  );
}

/**
 * Enquiry form with client-side validation. There is no backend: a valid
 * submission opens the visitor's email app with the enquiry pre-filled and
 * addressed to `enquiryDelivery.to` (src/data/contact.ts). The visitor
 * sends it from their email app. Nothing is sent automatically.
 */
export function EnquiryForm() {
  const params = useSearchParams();
  const requested = params.get("type");
  const initialType = enquiryTypes.some((t) => t.value === requested)
    ? (requested as EnquiryType)
    : "course";

  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    mobile: "",
    type: initialType,
    course: courses[0].slug,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setOpened(false);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setOpened(false);
      document.getElementById(`enquiry-${firstInvalid}`)?.focus();
      return;
    }
    setOpened(true);
    window.location.href = buildMailto(values);
  };

  const aria = (key: keyof Values) => ({
    id: `enquiry-${key}`,
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `enquiry-${key}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <fieldset>
        <legend className="text-[0.9375rem] font-semibold">Enquiry type</legend>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {enquiryTypes.map((type) => {
            const TypeIcon = typeIcons[type.value];
            const checked = values.type === type.value;
            return (
              <label
                key={type.value}
                className={`border-ink flex min-h-12 cursor-pointer items-center gap-2.5 rounded-2xl border-2 px-4 py-2.5 font-semibold transition-all has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#1f6fd1] ${
                  checked
                    ? "bg-[#fdd9c4] shadow-[0_3px_0_#142B55]"
                    : "hover:bg-sky-soft bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="enquiry-type"
                  id={type.value === initialType ? "enquiry-type" : undefined}
                  value={type.value}
                  checked={checked}
                  onChange={() => set("type", type.value)}
                  className="sr-only"
                />
                <TypeIcon className="size-5 shrink-0" aria-hidden="true" />
                {type.label}
              </label>
            );
          })}
        </div>
        <FieldError id="enquiry-type-error" message={errors.type} />
      </fieldset>

      <Field
        label="Full name"
        icon={User}
        error={errors.name}
        errorId="enquiry-name-error"
      >
        <input
          {...aria("name")}
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          icon={Mail}
          error={errors.email}
          errorId="enquiry-email-error"
        >
          <input
            {...aria("email")}
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field
          label="Mobile number"
          icon={Phone}
          error={errors.mobile}
          errorId="enquiry-mobile-error"
        >
          <input
            {...aria("mobile")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile"
            value={values.mobile}
            onChange={(e) => set("mobile", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      {values.type === "course" && (
        <Field
          label="Course"
          icon={BookOpen}
          error={errors.course}
          errorId="enquiry-course-error"
        >
          <select
            {...aria("course")}
            value={values.course}
            onChange={(e) => set("course", e.target.value)}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Choose a course</option>
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.name}
              </option>
            ))}
          </select>
        </Field>
      )}

      <Field
        label="Message"
        icon={MessageSquareText}
        error={errors.message}
        errorId="enquiry-message-error"
      >
        <textarea
          {...aria("message")}
          rows={4}
          placeholder={
            values.type === "software"
              ? "What would you like to build?"
              : "What would you like to know about the programme?"
          }
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <p className="bg-sky-soft rounded-2xl px-4 py-3 text-sm">
        <strong>How this works:</strong> the button opens your email app with
        this enquiry ready to send to{" "}
        <a
          href={`mailto:${enquiryDelivery.to}`}
          className="font-semibold [overflow-wrap:anywhere] underline"
        >
          {enquiryDelivery.to}
        </a>
        . Your enquiry is sent only when you press <strong>Send</strong> in your
        email app.
      </p>

      <button type="submit" className="btn btn-primary w-full">
        <Send className="size-5" aria-hidden="true" />
        Open Email to Send Enquiry
      </button>

      <p role="status" aria-live="polite" className="text-[0.9375rem]">
        {opened && (
          <>
            Your email app should now be open with the enquiry. It has not been
            sent yet: press Send there to deliver it. If nothing opened, email{" "}
            <a
              href={`mailto:${enquiryDelivery.to}`}
              className="font-semibold [overflow-wrap:anywhere] underline"
            >
              {enquiryDelivery.to}
            </a>{" "}
            directly.
          </>
        )}
      </p>
    </form>
  );
}
