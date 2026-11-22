import { ContactSection } from '../components/contact/ContactSection'
import { LiveDemosSection } from '../components/demos/LiveDemosSection'
import { HeroSection } from '../components/hero/HeroSection'
import { ProjectEnquirySection } from '../components/enquiry/ProjectEnquirySection'
import { PortfolioSection } from '../components/portfolio/PortfolioSection'
import { ServicesSection } from '../components/services/ServicesSection'

export function HomePage() {
  return (
  <main className="min-w-0 overflow-x-clip">
      <HeroSection />
      <ServicesSection />
      <ProjectEnquirySection />
      <PortfolioSection />
      <LiveDemosSection />
      <ContactSection />
    </main>
  )
}