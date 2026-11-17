/**
 * Career-readiness content. There are NO verified placement statistics,
 * hiring partners, salary figures or job guarantees, so none appear here.
 * Career paths are learning directions the programme's skills lead
 * toward, not job offers.
 */
export const careerJourney = [
  {
    icon: "book",
    title: "Learn",
    description: "Work through the five stages of the programme in order.",
  },
  {
    icon: "code",
    title: "Build Projects",
    description: "Apply each technology through hands-on, real-time projects.",
  },
  {
    icon: "gear",
    title: "Develop Industry Readiness",
    description: "Connect academic knowledge with industry requirements.",
  },
  {
    icon: "briefcase",
    title: "Explore Career Opportunities",
    description: "Look for roles that match the skills you have built.",
  },
] as const;

export const careerHighlights = [
  {
    icon: "wrench",
    title: "Practical training",
    description: "Hands-on, job-oriented learning from the first stage.",
  },
  {
    icon: "layers",
    title: "Real-time projects",
    description: "Learn each technology by building with it.",
  },
  {
    icon: "users",
    title: "Experienced mentors",
    description: "Guidance from experienced mentors as you learn.",
  },
  {
    icon: "compass",
    title: "Career-oriented learning",
    description: "Training shaped around the skills the industry asks for.",
  },
] as const;

export const careerPaths = [
  {
    title: "Software Developer",
    description:
      "Frontend and backend development with React.js, .NET and ASP.NET Core.",
    stages: ["01", "02", "03"],
  },
  {
    title: "Data Engineer",
    description:
      "Databases, data engineering concepts and Databricks, built on the full programme.",
    stages: ["03", "05"],
  },
  {
    title: "Cloud Technology Roles",
    description: "Working with applications in the cloud on Azure Cloud.",
    stages: ["04"],
  },
] as const;

export const careerNote =
  "These are learning directions, not job offers. We do not promise placement, specific employers or salary packages.";
