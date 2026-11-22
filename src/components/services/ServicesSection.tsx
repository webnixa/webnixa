import { useState } from 'react'
import { services } from '../../data/services'
import type { ServiceItem } from '../../data/services'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from './ServiceCard'
import { ServiceModal } from './ServiceModal'

export function ServicesSection() {
  const [selected, setSelected] = useState<ServiceItem | null>(null)

  return (
    <section id="services" className="scroll-mt-24 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionHeading
            title="What We Do Best"
            subtitle="End-to-end digital solutions for your business and ideas."
          />
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.08}>
              <ServiceCard service={service} onSelect={setSelected} />
            </ScrollReveal>
          ))}
        </div>
      </div>
      <ServiceModal service={selected} onClose={() => setSelected(null)} />
    </section>
  )
}