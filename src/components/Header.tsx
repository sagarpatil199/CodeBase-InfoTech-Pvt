"use client";

import { Menu, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, routes } from "@/data/navigation";
import { HomeLink } from "./HomeLink";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) => {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return href === "/" ? path === "/" : path.startsWith(href);
};

function NavItem({
  label,
  href,
  active,
  className,
  onNavigate,
}: {
  label: string;
  href: string;
  active: boolean;
  className: string;
  onNavigate?: () => void;
}) {
  const props = {
    className,
    "aria-current": active ? ("page" as const) : undefined,
  };
  if (href === routes.home)
    return (
      <HomeLink {...props} onNavigate={onNavigate}>
        {label}
      </HomeLink>
    );
  return (
    <Link href={href} {...props} onClick={onNavigate}>
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`border-ink/10 mx-auto flex h-[4.25rem] max-w-[76rem] items-center justify-between gap-3 rounded-[1.25rem] border bg-white/95 px-3 backdrop-blur transition-shadow duration-300 sm:px-5 ${
          scrolled || open
            ? "shadow-[0_14px_34px_-18px_rgb(20_43_85/0.45)]"
            : "shadow-[0_6px_18px_-14px_rgb(20_43_85/0.35)]"
        }`}
      >
        <Logo onNavigate={close} />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <NavItem
                    label={item.label}
                    href={item.href}
                    active={active}
                    className={`block rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold transition-colors ${
                      active
                        ? "text-ink bg-[#fdd9c4]"
                        : "text-ink/80 hover:bg-sky-soft hover:text-ink"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={routes.enroll}
            className="btn btn-navy btn-sm hidden sm:inline-flex"
          >
            <Send className="size-4" aria-hidden="true" />
            Enquire Now
          </Link>
          <button
            type="button"
            className="border-ink text-ink hover:bg-sky-soft grid size-11 place-items-center rounded-full border-2 transition-colors xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-ink/10 mx-auto mt-2 max-w-[76rem] origin-top rounded-[1.25rem] border bg-white p-3 shadow-[0_20px_40px_-20px_rgb(20_43_85/0.5)] xl:hidden"
          >
            <ul className="grid gap-1 sm:grid-cols-2">
              {mainNav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <NavItem
                      label={item.label}
                      href={item.href}
                      active={active}
                      onNavigate={close}
                      className={`font-display flex min-h-12 items-center rounded-xl px-4 text-lg font-semibold ${
                        active
                          ? "text-ink bg-[#fdd9c4]"
                          : "text-ink hover:bg-sky-soft"
                      }`}
                    />
                  </motion.li>
                );
              })}
            </ul>
            <Link
              href={routes.enroll}
              onClick={close}
              className="btn btn-navy mt-3 w-full sm:hidden"
            >
              <Send className="size-4" aria-hidden="true" />
              Enquire Now
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
