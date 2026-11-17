import { Workflow } from "lucide-react";
import { techLogos, type TechLogoKey } from "./techLogos";

/** Which logo represents each technology name used in the content data. */
const logoFor: Record<string, TechLogoKey> = {
  "React.js": "react",
  ".NET": "dotnet",
  "ASP.NET Core": "dotnet",
  "ASP.NET Core Web API": "dotnet",
  "ASP.NET Core MVC": "dotnet",
  "Web API": "dotnet",
  MVC: "dotnet",
  "SQL Server": "sqlserver",
  PostgreSQL: "postgresql",
  Oracle: "oracle",
  "Azure Cloud": "azure",
  Databricks: "databricks",
};

/**
 * A technology's brand logo. "Data Engineering" is a discipline, not a
 * product, so it gets a generic workflow icon instead of a logo.
 */
export function TechLogo({
  name,
  className = "size-5",
}: {
  name: string;
  className?: string;
}) {
  const key = logoFor[name];
  if (!key)
    return (
      <Workflow className={`text-[#3b6fd8] ${className}`} aria-hidden="true" />
    );
  const logo = techLogos[key];

  return (
    <svg
      viewBox={logo.viewBox}
      className={className}
      fill={logo.hex}
      aria-hidden="true"
      focusable="false"
    >
      {logo.paths.map((d) => (
        <path
          key={d.slice(0, 24)}
          d={d}
          fillRule={"fillRule" in logo ? logo.fillRule : undefined}
        />
      ))}
    </svg>
  );
}

/** Brand colour for hover accents. */
export const brandColor = (name: string) => {
  const key = logoFor[name];
  return key ? techLogos[key].hex : "#3b6fd8";
};
