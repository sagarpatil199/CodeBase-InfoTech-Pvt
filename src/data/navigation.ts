import { courseHref, featuredCourse } from "./courses";
import { learningStages } from "./technologies";

export const routes = {
  home: "/",
  about: "/about/",
  education: "/education/",
  course: courseHref(featuredCourse),
  technologies: "/technologies/",
  careers: "/careers/",
  services: "/services/",
  projects: "/projects/",
  contact: "/contact/",
  /** Enquiry form with the enquiry type preselected. */
  enroll: "/contact/?type=course#enquiry",
  discussProject: "/contact/?type=software#enquiry",
} as const;

export const stageAnchor = (stageNumber: string) => `stage-${stageNumber}`;

export const mainNav = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Courses", href: routes.education },
  { label: "Technologies", href: routes.technologies },
  { label: "Careers", href: routes.careers },
  { label: "Projects", href: routes.projects },
  { label: "Services", href: routes.services },
  { label: "Contact", href: routes.contact },
];

export const footerNav = [
  {
    title: "Quick links",
    links: [
      { label: "Home", href: routes.home },
      { label: "About", href: routes.about },
      { label: "Careers", href: routes.careers },
      { label: "Project concepts", href: routes.projects },
      { label: "Contact", href: routes.contact },
    ],
  },
  {
    title: "Programme",
    links: [
      { label: "Courses", href: routes.education },
      { label: "Programme details", href: routes.course },
      { label: "Learning journey", href: `${routes.course}#journey` },
      { label: "Course enquiry", href: routes.enroll },
    ],
  },
  {
    title: "Technologies",
    links: learningStages.map((stage) => ({
      label: stage.title,
      href: `${routes.technologies}#${stageAnchor(stage.number)}`,
    })),
  },
  {
    title: "Software development",
    links: [
      { label: "Software development", href: routes.services },
      { label: "Discuss your project", href: routes.discussProject },
    ],
  },
];
