import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionHeading } from '../ui/SectionHeading'
import { LiveDemosShowcase } from './LiveDemosShowcase'

export function LiveDemosSection() {
  return (
    <section id="demos" className="scroll-mt-24 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            title="Experience Our Solutions Live in Action"
            subtitle="Explore interactive experiences that bring our websites, apps and AI-powered solutions to life."
          />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <LiveDemosShowcase />
        </ScrollReveal>
      </div>
    </section>
  )
}