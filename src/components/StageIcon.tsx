import {
  Cloud,
  Database,
  MonitorSmartphone,
  Server,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/** One icon per learning stage, matched by stage number. */
const stageIcons: Record<string, LucideIcon> = {
  "01": MonitorSmartphone,
  "02": Server,
  "03": Database,
  "04": Cloud,
  "05": Workflow,
};

export const stageTints: Record<string, string> = {
  "01": "#BDEBFA",
  "02": "#D9D2FB",
  "03": "#B8DDAE",
  "04": "#FFE69A",
  "05": "#F9C6D4",
};

export function StageIcon({
  number,
  className = "size-6",
}: {
  number: string;
  className?: string;
}) {
  const Component = stageIcons[number] ?? Workflow;
  return <Component className={className} aria-hidden="true" />;
}
