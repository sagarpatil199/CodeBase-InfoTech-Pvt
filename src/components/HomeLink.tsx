"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { routes } from "@/data/navigation";
import { requestHomeReplay } from "@/lib/homeReplay";

/**
 * A link to the homepage. When the visitor is already on the homepage,
 * clicking it scrolls to the top and replays the train entrance.
 */
export function HomeLink({
  children,
  className,
  onNavigate,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
  "aria-label"?: string;
  "aria-current"?: "page";
}) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname !== routes.home) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)
      return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestHomeReplay();
  };

  return (
    <Link
      href={routes.home}
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
