import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { company } from "@/data/company";
import { contact } from "@/data/contact";
import { footerNav, routes } from "@/data/navigation";
import { HomeLink } from "./HomeLink";
import { Logo } from "./Logo";

const linkClass =
  "text-[0.9375rem] text-[#c9d4ec] transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-navy relative mt-auto text-white">
      {/* Soft hill edge between the page and the footer */}
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="text-navy absolute -top-[47px] left-0 h-12 w-full"
        aria-hidden="true"
      >
        <path
          d="M0 48V30c120-22 260-30 420-14s300 20 460 0 360-30 560 2v30z"
          fill="currentColor"
        />
      </svg>

      <div className="wrap grid gap-12 pt-14 pb-12 lg:grid-cols-[1.25fr_2.6fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-[0.9375rem] text-[#c9d4ec]">
            {company.introduction}
          </p>
          <ul className="mt-6 flex flex-col gap-3 text-[0.9375rem]">
            <li className="flex items-start gap-3">
              <Mail
                className="mt-1 size-4 shrink-0 text-[#ffe69a]"
                aria-hidden="true"
              />
              <a
                href={`mailto:${contact.email.value}`}
                className="[overflow-wrap:anywhere] text-white hover:underline"
              >
                <span className="sr-only">Email: </span>
                {contact.email.value}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin
                className="mt-1 size-4 shrink-0 text-[#ffe69a]"
                aria-hidden="true"
              />
              <span>
                <span className="sr-only">Location: </span>
                {contact.location}
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-sans text-sm font-bold tracking-wide text-[#ffe69a] uppercase">
                {group.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href === routes.home ? (
                      <HomeLink className={linkClass}>{link.label}</HomeLink>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-1.5 py-6 text-sm text-[#c9d4ec] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </p>
          <p>
            CIN: <span className="font-mono">{company.cin}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
