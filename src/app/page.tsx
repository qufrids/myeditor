import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { StatsCounter } from "@/components/sections/stats-counter";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { NarrativeSection } from "@/components/sections/narrative-section";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { DisciplinesSection } from "@/components/sections/disciplines-section";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <StatsCounter />
      <ServicesGrid />
      <WhyChooseUs />
      <BenefitsSection />
      <NarrativeSection />
      <ProcessTimeline />
      <TestimonialsSection />
      <DisciplinesSection />
      <FinalCTA />
    </>
  );
}
