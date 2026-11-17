import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  CalendarClock,
  Code2,
  Compass,
  Settings,
  Layers,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const icons = {
  wrench: Wrench,
  layers: Layers,
  users: Users,
  badge: BadgeCheck,
  wallet: Wallet,
  calendar: CalendarClock,
  book: BookOpen,
  code: Code2,
  gear: Settings,
  briefcase: Briefcase,
  compass: Compass,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

/** Maps the icon names used in the data files to Lucide icons. */
export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Component = icons[name];
  return <Component className={className} aria-hidden="true" />;
}
