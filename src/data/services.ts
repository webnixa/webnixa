export type ServiceId = 'website' | 'app' | 'ai'

export interface ServiceItem {
  id: ServiceId
  title: string
  shortTitle: string
  description: string
  detail: string
  highlights: string[]
}

export const services: ServiceItem[] = [
  {
    id: 'website',
    title: 'Website Development',
    shortTitle: 'Websites',
    description: 'Modern, responsive and high-performance websites.',
    detail:
      'We craft blazing-fast, SEO-ready websites with polished UX, scalable architecture, and conversion-focused layouts tailored to your brand.',
    highlights: [
      'Responsive & accessible UI',
      'Performance-first engineering',
      'CMS & e-commerce ready',
      'Analytics & SEO foundations',
    ],
  },
  {
    id: 'app',
    title: 'App Design & Development',
    shortTitle: 'Apps',
    description: 'Beautiful and intuitive mobile applications.',
    detail:
      'From wireframes to launch, we design and ship native-quality mobile experiences with smooth interactions and thoughtful onboarding.',
    highlights: [
      'UI/UX design systems',
      'iOS & Android cross-platform',
      'Real-time features',
      'App Store launch support',
    ],
  },
  {
    id: 'ai',
    title: 'AI Automation',
    shortTitle: 'AI Automation',
    description: 'Automate tasks and grow smarter with AI.',
    detail:
      'We integrate intelligent workflows, chat assistants, and custom automations that save time and unlock growth for your team.',
    highlights: [
      'Workflow automation',
      'Custom AI assistants',
      'Data pipelines',
      'Human-in-the-loop safety',
    ],
  },
]