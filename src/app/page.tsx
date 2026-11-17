import { HeroTrain } from "@/components/home/HeroTrain";
import { Highlights } from "@/components/home/Highlights";
import { AboutSection } from "@/components/sections/AboutSection";
import { CareerJourney } from "@/components/sections/CareerJourney";
import { ContactSection } from "@/components/sections/ContactSection";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { ProjectConceptsSection } from "@/components/sections/ProjectConcepts";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechAirplane } from "@/components/sections/TechAirplane";

export default function HomePage() {
  return (
    <>
      <HeroTrain />
      <Highlights />
      <LearningJourney />
      <AboutSection />
      <TechAirplane />
      <CareerJourney />
      <ProjectConceptsSection limit={3} />
      <ServicesSection />
      <ContactSection />
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
